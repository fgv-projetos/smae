import { DistribuicaoStatusTipo } from '@prisma/client';
import {
    distribuicaoStatusPrejudicado,
    resolveTipoStatusDistribuicao,
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
    it('lista exatamente os 4 status prejudicados', () => {
        expect([...STATUS_DISTRIBUICAO_PREJUDICADOS].sort()).toEqual(
            [
                DistribuicaoStatusTipo.Cancelada,
                DistribuicaoStatusTipo.Declinada,
                DistribuicaoStatusTipo.ImpedidaTecnicamente,
                DistribuicaoStatusTipo.Redirecionada,
            ].sort()
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
});
