import { DistribuicaoStatusTipo } from '@prisma/client';

/**
 * Status "prejudicados" de uma distribuição: linhas fora do fluxo ativo, que não devem receber
 * tarefas de acompanhamento no cronograma (mesmo conceito de "linha prejudicada" já usado nos
 * relatórios/painéis para ocultar distribuições — ver view_transferencia_analise).
 *
 * O enum `DistribuicaoStatusTipo` tem duas gerações de valores: a antiga, com nomes literais
 * (`Cancelada`/`Declinada`/`ImpedidaTecnicamente`/`Redirecionada`), e a nova/genérica usada pelos
 * status base atuais, em que esses quatro status terminais foram unificados sob `Terminal`.
 * Precisamos cobrir AMBAS as gerações — caso contrário uma distribuição cancelada gravada como
 * `Terminal` não é reconhecida como prejudicada e o reinício de workflow volta a estourar
 * "Tarefa não encontrada" (ver distribuicao-status.helpers.spec.ts).
 *
 * `Finalizada`/`ConcluidoComSucesso` (conclusão com sucesso) NÃO entra nesta lista: uma distribuição
 * finalizada permanece válida e mantém suas tarefas ao reiniciar o workflow.
 */
export const STATUS_DISTRIBUICAO_PREJUDICADOS: DistribuicaoStatusTipo[] = [
    // enum antigo (nomes literais)
    DistribuicaoStatusTipo.Cancelada,
    DistribuicaoStatusTipo.Declinada,
    DistribuicaoStatusTipo.ImpedidaTecnicamente,
    DistribuicaoStatusTipo.Redirecionada,
    // enum novo (genérico) usado pelos status base atuais: agrupa os quatro terminais acima
    DistribuicaoStatusTipo.Terminal,
];

/**
 * Mesma lista de {@link STATUS_DISTRIBUICAO_PREJUDICADOS} formatada para uso direto em cláusula
 * SQL `IN (...)` (ex.: relatório de transferências, que monta o WHERE por string). Fonte única:
 * evita que uma geração do enum seja esquecida em um dos lugares. Os valores vêm de um enum
 * controlado do Prisma — não há entrada de usuário —, então a interpolação é segura.
 */
export const STATUS_DISTRIBUICAO_PREJUDICADOS_SQL_IN = STATUS_DISTRIBUICAO_PREJUDICADOS.map(
    (tipo) => `'${tipo}'`
).join(', ');

/**
 * Defaults do editor de status customizado (`distribuicao-status.service`): quando o usuário não
 * informa os flags no DTO, eles são derivados do `tipo`. As listas cobrem as DUAS gerações do enum
 * — os literais antigos (`Cancelada`/`ImpedidaTecnicamente`/`Finalizada`) e os genéricos atuais
 * (`Terminal`/`ConcluidoComSucesso`/`EncerradoSemSucesso`) —, senão um status terminal criado com o
 * tipo novo assumia silenciosamente os defaults de um status ativo.
 *
 * São apenas defaults (sobrescritíveis) e não espelham os flags dos status base legados, que estão
 * inconsistentes no seed (ver comentário em view_transferencia_analise).
 */

/** Tipos cujo valor, por padrão, NÃO é contabilizado (terminais/cancelados sem sucesso). */
export const STATUS_DISTRIBUICAO_DEFAULT_NAO_CONTABILIZA: DistribuicaoStatusTipo[] = [
    // enum antigo
    DistribuicaoStatusTipo.Cancelada,
    DistribuicaoStatusTipo.ImpedidaTecnicamente,
    // enum novo (genérico)
    DistribuicaoStatusTipo.Terminal,
    DistribuicaoStatusTipo.EncerradoSemSucesso,
];

/** Tipos que, por padrão, NÃO permitem novos registros (qualquer situação terminal, com ou sem sucesso). */
export const STATUS_DISTRIBUICAO_DEFAULT_SEM_NOVOS_REGISTROS: DistribuicaoStatusTipo[] = [
    // enum antigo
    DistribuicaoStatusTipo.Cancelada,
    DistribuicaoStatusTipo.ImpedidaTecnicamente,
    DistribuicaoStatusTipo.Finalizada,
    // enum novo (genérico)
    DistribuicaoStatusTipo.Terminal,
    DistribuicaoStatusTipo.ConcluidoComSucesso,
    DistribuicaoStatusTipo.EncerradoSemSucesso,
];

/** Shape mínimo do "último status" de uma distribuição, como lido de `distribuicao_recurso_status`. */
export type UltimoStatusDistribuicao = {
    status_base: { tipo: DistribuicaoStatusTipo } | null;
    status: { tipo: DistribuicaoStatusTipo; removido_em: Date | null } | null;
} | null;

/**
 * Resolve o tipo efetivo do status, espelhando o `COALESCE(dsb.tipo, ds.tipo)` do relatório:
 * o status_base tem prioridade; o status customizado só conta se não estiver removido.
 */
export function resolveTipoStatusDistribuicao(
    ultimoStatus: UltimoStatusDistribuicao
): DistribuicaoStatusTipo | undefined {
    if (!ultimoStatus) return undefined;
    return (
        ultimoStatus.status_base?.tipo ??
        (ultimoStatus.status && ultimoStatus.status.removido_em === null ? ultimoStatus.status.tipo : undefined)
    );
}

/** `true` quando o último status da distribuição é um status prejudicado. */
export function distribuicaoStatusPrejudicado(ultimoStatus: UltimoStatusDistribuicao): boolean {
    const tipo = resolveTipoStatusDistribuicao(ultimoStatus);
    return tipo != null && STATUS_DISTRIBUICAO_PREJUDICADOS.includes(tipo);
}
