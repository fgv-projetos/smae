import canceladaTransferencia from '@/consts/canceladaTransferencia';
import esferasDeTransferencia from '@/consts/esferasDeTransferencia';
import {
  array,
  date,
  mixed,
  object,
  ref,
} from './initSchema';
import relatorioValidacaoBase from './relatorioValidacaoBase';

export default relatorioValidacaoBase.concat(object({
  parametros: object({
    cancelada: mixed()
      .label('Considera canceladas')
      .oneOf(Object.keys(canceladaTransferencia))
      .default('NaoIncluir'),
    data_inicio: date()
      .label('Data de início')
      .nullable()
      .transform((v) => (v === '' ? null : v)),
    data_termino: date()
      .label('Data de término previsto')
      .min(ref('data_inicio'), 'Data de término deve ser posterior à data de início')
      .nullable()
      .transform((v) => (v === '' ? null : v)),
    esfera: mixed()
      .label('Esfera')
      .oneOf(Object.keys(esferasDeTransferencia)),
    orgao_id: array()
      .label('Órgãos')
      .nullable(),
    tipo_id: array()
      .label('Tipos')
      .nullable(),
  }),
}));
