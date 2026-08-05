<script setup>
import { storeToRefs } from 'pinia';
import { onUnmounted } from 'vue';

import { Dashboard } from '@/components';
import { useTransferenciasVoluntariasStore } from '@/stores/transferenciasVoluntarias.store';

const transferenciasVoluntarias = useTransferenciasVoluntariasStore();

const { emFoco: transferenciaEmFoco } = storeToRefs(transferenciasVoluntarias);

onUnmounted(() => { transferenciasVoluntarias.$reset(); });
</script>
<template>
  <Dashboard>
    <MigalhasDePão class="mb1">
      <template
        v-if="transferenciaEmFoco?.cancelada"
        #item--2__texto="{ tituloTruncado }"
      >
        {{ tituloTruncado }}
        <em class="tvermelho">(cancelada)</em>
      </template>
    </MigalhasDePão>
    <router-view />
  </Dashboard>
</template>
