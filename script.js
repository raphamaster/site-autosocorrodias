(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('menu-open');
    }
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
      document.body.classList.toggle('menu-open', !open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu(); });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  const form = document.querySelector('#guincho-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const tipo = form.elements.veiculo.value.trim();
      const origem = form.elements.origem.value.trim();
      const destino = form.elements.destino.value.trim();
      const whatsapp = form.elements.whatsapp.value;
      if (!['5516981417510', '5517996295941'].includes(whatsapp)) return;
      const msg = [
        'Olá, Auto Socorro Dias! Gostaria de solicitar um atendimento.',
        '',
        `*Serviço:* ${tipo}`,
        `*Local do veículo:* ${origem}`,
        destino ? `*Destino:* ${destino}` : '',
        '',
        'Podem verificar a disponibilidade e me orientar?'
      ].filter(Boolean).join('\n');
      const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }
})();
