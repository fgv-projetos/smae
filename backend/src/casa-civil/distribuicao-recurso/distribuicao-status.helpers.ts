import { DistribuicaoStatusTipo } from '@prisma/client';

/**
 * Status "prejudicados" de uma distribuição: linhas fora do fluxo ativo, que não devem receber
 * tarefas de acompanhamento no cronograma (mesmo conceito de "linha prejudicada" já usado nos
 * relatórios/painéis para ocultar distribuições).
 */
export const STATUS_DISTRIBUICAO_PREJUDICADOS: DistribuicaoStatusTipo[] = [
    DistribuicaoStatusTipo.Cancelada,
    DistribuicaoStatusTipo.Declinada,
    DistribuicaoStatusTipo.ImpedidaTecnicamente,
    DistribuicaoStatusTipo.Redirecionada,
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
