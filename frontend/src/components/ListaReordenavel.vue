<script setup>
import { ref, watch } from 'vue';
import draggable from 'vuedraggable';

const props = defineProps({
  // O `fields` de um `<FieldArray>` do vee-validate (cada item já tem `.key`). Só é lido aqui
  // pelo tamanho e pra repassar `items[index]` ao slot — nunca é mutado diretamente.
  items: {
    type: Array,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['move']);

// `vuedraggable` precisa de um array próprio pra gerenciar durante o arraste. O `fields` de um
// `<FieldArray>` não deve ser mutado diretamente — a forma suportada de reordenar é sempre via
// `move()` — então esse array local só guarda a identidade de cada item (o `.key` que o próprio
// `<FieldArray>` atribui, estável através de reordenações), resincronizado sempre que a ordem das
// chaves muda. Usar a chave real (não a posição) é o que faz o Vue mover o nó DOM de cada linha
// pra nova posição em vez de só repintar o conteúdo no lugar — sem isso, um botão focado continua
// representando a posição antiga em vez de acompanhar o item movido, quebrando reordenação via
// teclado. A ordem de verdade sai do `move(oldIndex, newIndex)` emitido ao soltar/clicar, aplicado
// pelo `move` do `<FieldArray>` de quem usa este componente.
const itensParaArrastar = ref(props.items.map((item) => ({ id: item.key })));

watch(() => props.items.map((item) => item.key), (chaves) => {
  itensParaArrastar.value = chaves.map((id) => ({ id }));
});

function aoTerminarArraste({ oldIndex, newIndex }) {
  if (oldIndex === newIndex) return;
  emit('move', oldIndex, newIndex);
}
</script>

<template>
  <draggable
    v-model="itensParaArrastar"
    item-key="id"
    handle=".alça-de-arraste"
    tag="div"
    :disabled="disabled || items.length < 2"
    @end="aoTerminarArraste"
  >
    <template #item="{ index }">
      <div class="flex g1 mb1 start">
        <button
          class="like-a__text tc300 mt2 alça-de-arraste"
          type="button"
          aria-label="Arrastar para reordenar ou foco e setas para cima/baixo"
          title="Arrastar para reordenar ou foco e setas para cima/baixo"
          :disabled="items.length < 2"
          @keydown.up.prevent="index > 0 && emit('move', index, index - 1)"
          @keydown.down.prevent="index < items.length - 1 && emit('move', index, index + 1)"
        >
          <svg
            width="20"
            height="20"
          >
            <use xlink:href="#i_grip" />
          </svg>
        </button>

        <button
          class="like-a__text addlink tc300 mt2"
          type="button"
          aria-label="Mover para cima"
          title="Mover para cima"
          :disabled="index === 0"
          @click="emit('move', index, index - 1)"
        >
          <svg
            width="20"
            height="20"
          >
            <use
              xlink:href="#i_down"
              style="
                transform: rotate(180deg);
                transform-origin: center;
              "
            />
          </svg>
        </button>

        <button
          class="like-a__text addlink tc300 mt2"
          type="button"
          aria-label="Mover para baixo"
          title="Mover para baixo"
          :disabled="index === items.length - 1"
          @click="emit('move', index, index + 1)"
        >
          <svg
            width="20"
            height="20"
          >
            <use xlink:href="#i_down" />
          </svg>
        </button>

        <div class="f1">
          <slot
            :item="items[index]"
            :index="index"
          />
        </div>

        <slot
          name="extra"
          :item="items[index]"
          :index="index"
        />
      </div>
    </template>
  </draggable>
</template>
