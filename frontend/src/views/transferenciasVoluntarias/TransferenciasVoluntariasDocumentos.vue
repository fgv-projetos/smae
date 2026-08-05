<script setup>
import DocumentosDaTransferencia from '@/components/transferencia/DocumentosDaTransferencia.vue';

const props = defineProps({
  transferenciaId: {
    type: [Number, String],
    default: 0,
  },
});

</script>
<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false,
};
</script>
<template>
  <CabecalhoDePagina>
    <template #acoes>
      <SmaeLink
        :to="{
          name: 'TransferenciasVoluntariasEnviarArquivo',
          params: {
            transferenciaId,
          },
        }"
        class="btn ml2"
      >
        Novo arquivo
      </SmaeLink>
    </template>
  </CabecalhoDePagina>

  <DocumentosDaTransferencia />
</template>
