import { DistribuicaoStatusTipo } from '@prisma/client';
import {
    distribuicaoStatusPrejudicado,
    resolveTipoStatusDistribuicao,
    STATUS_DISTRIBUICAO_DEFAULT_NAO_CONTABILIZA,
    STATUS_DISTRIBUICAO_DEFAULT_SEM_NOVOS_REGISTROS,
    STATUS_DISTRIBUICAO_PREJUDICADOS,
} from './distribuicao-status.helpers';

/**
 * Regressão do reinício de workflow: uma distribuição com status prejudicado
 * (Cancelada/Declinada/ImpedidaTecnicamente/Redirecionada) não pode gerar tarefas de
 * acompanhamento no cronograma. Antes desta correção o `posStartWorkflow` reprocessava a
 * distribuição cancelada e o reinício estourava "Tarefa não encontrada", deixando o workflow
 * recriado porém sem atribuição de órgãos (e o mesmo buraco no cronograma).
 */
describe('distribuicao-status.helpers', () => {
    it('lista os status prejudicados das duas gerações do enum (literais + Terminal)', () => {
        expect([...STATUS_DISTRIBUICAO_PREJUDICADOS].sort()).toEqual(
            [
                DistribuicaoStatusTipo.Cancelada,
                DistribuicaoStatusTipo.Declinada,
                DistribuicaoStatusTipo.ImpedidaTecnicamente,
                DistribuicaoStatusTipo.Redirecionada,
                // enum novo/genérico: os status base atuais gravam os terminais como `Terminal`
                DistribuicaoStatusTipo.Terminal,
            ].sort()
        );
    });

    it('reconhece a distribuição cancelada gravada com o tipo genérico Terminal (regressão do reinício)', () => {
        // Os status base atuais (ex.: "Cancelada", "Declinada") têm tipo = Terminal. Sem cobrir esse
        // valor, _createTarefasOutroOrgao reprocessa a distribuição cancelada e o reinício estoura
        // "Tarefa não encontrada".
        expect(distribuicaoStatusPrejudicado({ status_base: { tipo: DistribuicaoStatusTipo.Terminal }, status: null })).toBe(
            true
        );
    });

    describe('distribuicaoStatusPrejudicado', () => {
        it.each(STATUS_DISTRIBUICAO_PREJUDICADOS)('é prejudicada quando status_base.tipo = %s', (tipo) => {
            expect(distribuicaoStatusPrejudicado({ status_base: { tipo }, status: null })).toBe(true);
        });

        it('é prejudicada quando o status customizado (não removido) é prejudicado', () => {
            expect(
                distribuicaoStatusPrejudicado({
                    status_base: null,
                    status: { tipo: DistribuicaoStatusTipo.Cancelada, removido_em: null },
                })
            ).toBe(true);
        });

        it('NÃO é prejudicada para status ativo (Registrada/EmAndamento/Finalizada)', () => {
            for (const tipo of [
                DistribuicaoStatusTipo.Registrada,
                DistribuicaoStatusTipo.EmAndamento,
                DistribuicaoStatusTipo.Finalizada,
            ]) {
                expect(distribuicaoStatusPrejudicado({ status_base: { tipo }, status: null })).toBe(false);
            }
        });

        it('NÃO é prejudicada quando não há status', () => {
            expect(distribuicaoStatusPrejudicado(null)).toBe(false);
        });

        it('ignora status customizado removido (cai para não prejudicada)', () => {
            expect(
                distribuicaoStatusPrejudicado({
                    status_base: null,
                    status: { tipo: DistribuicaoStatusTipo.Cancelada, removido_em: new Date() },
                })
            ).toBe(false);
        });

        it('status_base tem prioridade sobre status customizado (espelha COALESCE do relatório)', () => {
            expect(
                distribuicaoStatusPrejudicado({
                    status_base: { tipo: DistribuicaoStatusTipo.EmAndamento },
                    status: { tipo: DistribuicaoStatusTipo.Cancelada, removido_em: null },
                })
            ).toBe(false);
        });
    });

    describe('resolveTipoStatusDistribuicao', () => {
        it('retorna undefined quando não há status', () => {
            expect(resolveTipoStatusDistribuicao(null)).toBeUndefined();
        });

        it('prioriza status_base sobre status customizado', () => {
            expect(
                resolveTipoStatusDistribuicao({
                    status_base: { tipo: DistribuicaoStatusTipo.Registrada },
                    status: { tipo: DistribuicaoStatusTipo.Cancelada, removido_em: null },
                })
            ).toBe(DistribuicaoStatusTipo.Registrada);
        });
    });

    describe('defaults de status customizado (derivados do tipo)', () => {
        // Espelha a derivação em distribuicao-status.service ao criar um status customizado.
        const contabiliza = (tipo: DistribuicaoStatusTipo) => !STATUS_DISTRIBUICAO_DEFAULT_NAO_CONTABILIZA.includes(tipo);
        const permiteNovos = (tipo: DistribuicaoStatusTipo) =>
            !STATUS_DISTRIBUICAO_DEFAULT_SEM_NOVOS_REGISTROS.includes(tipo);

        it('preserva o comportamento dos literais antigos', () => {
            // contabiliza=false apenas para Cancelada/ImpedidaTecnicamente (comportamento original).
            expect(contabiliza(DistribuicaoStatusTipo.Cancelada)).toBe(false);
            expect(contabiliza(DistribuicaoStatusTipo.ImpedidaTecnicamente)).toBe(false);
            expect(contabiliza(DistribuicaoStatusTipo.Declinada)).toBe(true);
            expect(contabiliza(DistribuicaoStatusTipo.Redirecionada)).toBe(true);
            expect(contabiliza(DistribuicaoStatusTipo.Finalizada)).toBe(true);

            // permite_novos=false para Cancelada/ImpedidaTecnicamente/Finalizada (comportamento original).
            expect(permiteNovos(DistribuicaoStatusTipo.Cancelada)).toBe(false);
            expect(permiteNovos(DistribuicaoStatusTipo.ImpedidaTecnicamente)).toBe(false);
            expect(permiteNovos(DistribuicaoStatusTipo.Finalizada)).toBe(false);
            expect(permiteNovos(DistribuicaoStatusTipo.Declinada)).toBe(true);
            expect(permiteNovos(DistribuicaoStatusTipo.Redirecionada)).toBe(true);
        });

        it('estende para os tipos genéricos atuais', () => {
            // Terminal (cancelado/impedido/declinado/redirecionado): não contabiliza e não permite novos.
            expect(contabiliza(DistribuicaoStatusTipo.Terminal)).toBe(false);
            expect(permiteNovos(DistribuicaoStatusTipo.Terminal)).toBe(false);

            // ConcluidoComSucesso (espelha Finalizada): contabiliza, mas não permite novos.
            expect(contabiliza(DistribuicaoStatusTipo.ConcluidoComSucesso)).toBe(true);
            expect(permiteNovos(DistribuicaoStatusTipo.ConcluidoComSucesso)).toBe(false);

            // EncerradoSemSucesso (terminal sem sucesso): não contabiliza e não permite novos.
            expect(contabiliza(DistribuicaoStatusTipo.EncerradoSemSucesso)).toBe(false);
            expect(permiteNovos(DistribuicaoStatusTipo.EncerradoSemSucesso)).toBe(false);
        });

        it('mantém status ativos como contabilizáveis e abertos a novos registros', () => {
            for (const tipo of [
                DistribuicaoStatusTipo.Registrada,
                DistribuicaoStatusTipo.NaoIniciado,
                DistribuicaoStatusTipo.EmAndamento,
            ]) {
                expect(contabiliza(tipo)).toBe(true);
                expect(permiteNovos(tipo)).toBe(true);
            }
        });
    });
});
