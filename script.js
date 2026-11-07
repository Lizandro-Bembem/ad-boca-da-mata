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

// ===== Celular: navegação inferior estilo aplicativo =====
(() => {
  const nav = document.getElementById('bottomNav');
  if (!nav) return;

  // Marca a página atual na barra inferior e no painel "Mais"
  const atual = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.bottom-nav-item[data-pagina], .folha-item[data-pagina]').forEach((el) => {
    if (el.dataset.pagina === atual) {
      el.classList.add('ativo');
      el.setAttribute('aria-current', 'page');
    }
  });
  const btnMais = document.getElementById('btnTabMais');
  if (document.querySelector('.folha-item.ativo')) btnMais.classList.add('ativo');

  // Painel "Mais" (sobe de baixo)
  const folha = document.getElementById('folhaMais');
  const fundo = document.getElementById('folhaFundo');
  const fechar = document.getElementById('btnFecharFolha');
  const abrirFolha = () => {
    folha.classList.add('aberta');
    fundo.classList.add('aberta');
    folha.setAttribute('aria-hidden', 'false');
    btnMais.setAttribute('aria-expanded', 'true');
    fechar.focus();
  };
  const fecharFolha = () => {
    if (!folha.classList.contains('aberta')) return;
    folha.classList.remove('aberta');
    fundo.classList.remove('aberta');
    folha.setAttribute('aria-hidden', 'true');
    btnMais.setAttribute('aria-expanded', 'false');
    btnMais.focus();
  };
  btnMais.addEventListener('click', () => (folha.classList.contains('aberta') ? fecharFolha() : abrirFolha()));
  fechar.addEventListener('click', fecharFolha);
  fundo.addEventListener('click', fecharFolha);
  document.addEventListener('keydown', (e) => e.key === 'Escape' && fecharFolha());

  // Aviso rápido
  const toast = document.getElementById('toast');
  let tToast;
  const avisar = (texto) => {
    toast.textContent = texto;
    toast.classList.add('mostrar');
    clearTimeout(tToast);
    tToast = setTimeout(() => toast.classList.remove('mostrar'), 5000);
  };

  // Instalar no celular
  const btnInstalar = document.getElementById('btnInstalarApp');
  const jaInstalado = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  const ehIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  let eventoInstalar = null;
  if (!jaInstalado && ehIos) btnInstalar.hidden = false;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    eventoInstalar = e;
    if (!jaInstalado) btnInstalar.hidden = false;
  });
  window.addEventListener('appinstalled', () => { btnInstalar.hidden = true; eventoInstalar = null; });
  btnInstalar.addEventListener('click', async () => {
    if (eventoInstalar) {
      eventoInstalar.prompt();
      await eventoInstalar.userChoice;
      eventoInstalar = null;
      btnInstalar.hidden = true;
      fecharFolha();
    } else {
      fecharFolha();
      avisar('Toque no botão Compartilhar do navegador e escolha “Adicionar à Tela de Início”.');
    }
  });
})();