<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core';
import { debounce } from 'lodash';
import { computed, ref } from 'vue';

type Slots = {
  default(): [unknown]
  botao(): [unknown]
};
defineSlots<Slots>();

type Props = {
  texto?: string
  icone?: string
  as?: string
};

withDefaults(defineProps<Props>(), {
  as: 'div',
  icone: 'i',
  texto: undefined,
});

const ALTURA_MINIMA_TOPO_PX = 150;
const ESPACO_ABAIXO_PX = 8;

const elemento = ref<HTMLElement>();
const elementoConteudo = ref<HTMLElement>();
const posicaoTooltip = ref<'left' | 'right' | 'center'>('center');
const posicaoTooltipVertical = ref<'top' | 'bottom'>('top');
const topoConteudo = ref<string>('');
const manterExibido = ref<boolean>(false);

const descricaoConteudo = computed<string>(() => elementoConteudo.value?.textContent || '');
const tamanhoIcone = computed(() => `${(elemento.value?.clientWidth || 0) / 2 + 5}px`);

function alternarAbertura() {
  manterExibido.value = !manterExibido.value;
}

function obterPosicaoAlinhamento() {
  if (!elemento.value) {
    return null;
  }

  let posicaoElemento = 0;

  try {
    posicaoElemento = elemento.value.getBoundingClientRect().left;
  } catch (error) {
    console.warn('Error getting element position:', error);
    return null;
  }

  const widths = {
    left: window.innerWidth * 0.40,
    center: window.innerWidth * 0.66,
  };

  if (posicaoElemento > widths.center) {
    return 'left';
  }

  if (posicaoElemento > widths.left) {
    return 'center';
  }

  return 'right';
}

function obterPosicaoVertical() {
  if (!elemento.value) {
    return null;
  }

  let posicaoElemento = 0;

  try {
    posicaoElemento = elemento.value.getBoundingClientRect().top;
  } catch (error) {
    console.warn('Error getting element position:', error);
    return null;
  }

  return posicaoElemento < ALTURA_MINIMA_TOPO_PX ? 'bottom' : 'top';
}

// Calcula o topo em pixels de forma explícita (em vez de depender da posição
// estática do elemento fixed, que varia conforme o contexto de layout do
// gatilho e pode deixar o painel muito distante do ícone).
function calcularTopoAbaixoDoGatilho() {
  if (!elemento.value) {
    return null;
  }

  try {
    const posicaoElemento = elemento.value.getBoundingClientRect();
    return `${posicaoElemento.bottom + ESPACO_ABAIXO_PX}px`;
  } catch (error) {
    console.warn('Error getting element position:', error);
    return null;
  }
}

function atualizarPosicionamento() {
  const posicaoHorizontal = obterPosicaoAlinhamento();

  if (posicaoHorizontal) {
    posicaoTooltip.value = posicaoHorizontal;
  }

  const posicaoVertical = obterPosicaoVertical();

  if (posicaoVertical) {
    posicaoTooltipVertical.value = posicaoVertical;
  }

  const topo = calcularTopoAbaixoDoGatilho();

  if (topo) {
    topoConteudo.value = topo;
  }
}

useResizeObserver(
  document.documentElement,
  debounce(atualizarPosicionamento, 400),
);
</script>

<template>
  <component
    :is="$props.as"
    ref="elemento"
    :aria-description="descricaoConteudo"
    class="smae-tooltip-component"
    :class="{ 'smae-tooltip-component--fixado': manterExibido }"
    tabindex="0"
    @click="alternarAbertura"
    @mouseenter="atualizarPosicionamento"
    @focus="atualizarPosicionamento"
  >
    <slot name="botao">
      <svg
        width="20"
        height="20"
      ><use :xlink:href="`#i_${$props.icone}`" /></svg>
    </slot>

    <div
      ref="elementoConteudo"
      class="smae-tooltip-component__content"
      :class="[
        `smae-tooltip-component__content--${posicaoTooltip}`,
        { 'smae-tooltip-component__content--bottom': posicaoTooltipVertical === 'bottom' },
      ]"
      role="tooltip"
    >
      <slot>{{ $props.texto }}</slot>
    </div>
  </component>
</template>

<style lang="less" scoped>
.smae-tooltip-component {
  display: inline-block;
  vertical-align: middle;
  color: @marrom;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;

  > svg {
    display: inline-block;
  }

  &::after {
    content: "";
    position: absolute;
    min-width: 40px;
    min-height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.smae-tooltip-component--fixado {
  color: #22222a;
}

.smae-tooltip-component__content {
  display: none;
  width: max-content;
  max-width: 25em;
  padding: 1em;
  color: white;
  background-color: @primary;
  border-radius: .5rem;
  font-size: 0.85rem;
  line-height: 1.4;
  text-align: center;
  text-transform: none;
  white-space: normal;
  pointer-events: none;
  position: fixed;
  z-index: 999;
  animation: fadeIn .5s;
  --smae-tooltip-tx: calc(-50% + 10px);
  --smae-tooltip-ty: calc(-100% - 24px - 0.5rem);
  transform: translate(var(--smae-tooltip-tx), var(--smae-tooltip-ty));

  &::before {
    content: "";
    position: absolute;
    left: calc(50% - 0.5rem);
    transform: rotate(-45deg);
    bottom: 1px;
    margin: 0 0 -0.5rem 0;
    border: .5rem solid transparent;
    border-bottom-color: @primary;
    border-left-color: @primary;
  }

  .smae-tooltip-component--fixado > &,
  :hover > & {
    display: block;
  }
}

.smae-tooltip-component__content--left {
  --smae-tooltip-tx: calc(-100% + 43px);

  &::before {
    left: calc(100% - 40px);
  }
}

.smae-tooltip-component__content--right {
  --smae-tooltip-tx: calc(-10% + 6px);

  &::before {
    left: v-bind(tamanhoIcone);
  }
}

.smae-tooltip-component__content--bottom {
  top: v-bind(topoConteudo);
  --smae-tooltip-ty: 0px;

  &::before {
    top: 1px;
    bottom: auto;
    margin: -0.5rem 0 0 0;
    transform: rotate(45deg);
    border-bottom-color: transparent;
    border-top-color: @primary;
  }
}

</style>
