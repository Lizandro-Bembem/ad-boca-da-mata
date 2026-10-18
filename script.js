// Menu no celular
const topo = document.getElementById('topo');
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  btn.setAttribute('aria-expanded', aberto);
});

// Topo encolhe ao rolar a página
const aoRolar = () => topo.classList.toggle('pequeno', window.scrollY > 40);
window.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

// Elementos aparecem suavemente ao rolar
const obs = new IntersectionObserver((itens) => {
  itens.forEach((i) => {
    if (i.isIntersecting) {
      i.target.classList.add('visivel');
      obs.unobserve(i.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.rev').forEach((el, n) => {
  el.style.transitionDelay = (n % 4) * 90 + 'ms';
  obs.observe(el);
});

// Galeria: foto ampliada
const lb = document.getElementById('lb');
if (lb) {
  const img = lb.querySelector('img');
  document.querySelectorAll('[data-lb]').forEach((a) =>
      a.addEventListener('click', (e) => {
        e.preventDefault();
        img.src = a.getAttribute('href');
        lb.hidden = false;
      })
  );
  lb.addEventListener('click', () => (lb.hidden = true));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && (lb.hidden = true));
}

// Ano do rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Cultos: abre e fecha a caixinha com animação
document.querySelectorAll('.culto-btn').forEach((botao) => {
  botao.addEventListener('click', () => {
    const painel = document.getElementById(botao.getAttribute('aria-controls'));
    const abrir = botao.getAttribute('aria-expanded') !== 'true';
    botao.setAttribute('aria-expanded', abrir);
    painel.classList.toggle('aberto', abrir);
  });
});