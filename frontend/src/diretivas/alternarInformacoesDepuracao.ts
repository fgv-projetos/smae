import type { Directive, DirectiveBinding } from 'vue';

const alternarExibicao = (el: HTMLElement, binding: DirectiveBinding) => {
  const primaria = 'Control';
  const secundaria = 'CapsLock';

  el.classList.add('debug');
  el.setAttribute('hidden', '');
  let secundariaPressionada = false;

  if (binding.value) {
    el.setAttribute('data-debug', binding.value);
  }
  window.addEventListener('keydown', (event) => {
    if (event.getModifierState && event.getModifierState(primaria)) {
      if (event.key === secundaria) {
        if (secundariaPressionada) {
          if (el.hasAttribute('hidden')) {
            el.removeAttribute('hidden');
          } else {
            el.setAttribute('hidden', '');
          }
          secundariaPressionada = false;
        } else {
          secundariaPressionada = true;
          setTimeout(() => {
            secundariaPressionada = false;
          }, 300);
        }
      } else if (secundariaPressionada) {
        secundariaPressionada = false;
      }
    }
  });
};

const diretiva: Directive = {
  beforeMount: alternarExibicao,
};

export default diretiva;
