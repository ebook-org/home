// ==============================
// BUSCA E FILTRO DOS EBOOKS
// ==============================
const searchInput = document.getElementById('searchInput');
const ebookCards = document.querySelectorAll('.ebook-item');
const ebookSection = document.querySelector('.ebook-list');
const noResultsMessage = document.createElement('p');

noResultsMessage.textContent = 'Nenhum eBook encontrado.';
noResultsMessage.style.display = 'none';
noResultsMessage.style.color = '#e63946';
noResultsMessage.style.fontSize = '18px';
noResultsMessage.style.marginTop = '20px';
noResultsMessage.setAttribute('role', 'alert');
ebookSection.appendChild(noResultsMessage);

/**
 * Normaliza o texto.
 */
function normalizeText(text) {
  return text.trim().toLowerCase();
}

/**
 * Aplica debounce para evitar execuções excessivas.
 */
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Destaca o texto que corresponde à query.
 */
function highlightText(element, query) {
  if (!query) return element.textContent;
  const regex = new RegExp(`(${query})`, 'gi');
  return element.textContent.replace(regex, '<mark>$1</mark>');
}

/**
 * Filtra os eBooks e destaca títulos conforme a pesquisa.
 */
function filterEbooks(query, ebookCards) {
  let hasResults = false;
  ebookCards.forEach(card => {
    const titleEl = card.querySelector('h3');
    const originalTitle = titleEl.getAttribute('data-original') || titleEl.textContent;
    const title = normalizeText(originalTitle);
    const category = normalizeText(card.dataset.category || '');
    const author = normalizeText(card.dataset.author || '');

    if (title.includes(query) || category.includes(query) || author.includes(query)) {
      card.style.display = 'flex';
      hasResults = true;
      // Atualiza com destaque
      titleEl.innerHTML = highlightText({ textContent: originalTitle }, query);
    } else {
      card.style.display = 'none';
      // Restaura o texto original
      titleEl.textContent = originalTitle;
    }
  });
  return hasResults;
}

// Salva o título original em cada cartão (para restauração após destaque)
ebookCards.forEach(card => {
  const titleEl = card.querySelector('h3');
  titleEl.setAttribute('data-original', titleEl.textContent);
});

if (searchInput) {
  searchInput.addEventListener('input', debounce((event) => {
    const query = normalizeText(event.target.value);
    const hasResults = filterEbooks(query, ebookCards);
    noResultsMessage.style.display = hasResults ? 'none' : 'block';
  }, 300));
}

// ==============================
// MODAIS COM ACESSIBILIDADE
// ==============================
function openModal(modal, triggerButton) {
  modal.classList.add('active');
  modal.setAttribute('aria-modal', 'true');
  // Armazena o ID do elemento que disparou o modal para retornar o foco
  modal.dataset.trigger = triggerButton.id;
  const closeBtn = modal.querySelector('.close-button');
  if (closeBtn) closeBtn.focus();
}

// Modal Termos de Uso
const modal = document.getElementById('modal-termos');
const openModalButton = document.getElementById('open-modal');
const closeModalButton = document.getElementById('close-modal');

// Abrir modal
openModalButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.style.display = 'flex';
});

// Fechar modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar modal clicando fora dele
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Modal Política de Privacidade
const privacyModal = document.getElementById('modal-privacidade');
const openPrivacyModalButton = document.getElementById('open-privacy-modal');
const closePrivacyModalButton = document.getElementById('close-privacy-modal');

// Abrir modal de Política de Privacidade
openPrivacyModalButton.addEventListener('click', (event) => {
    event.preventDefault();
    privacyModal.style.display = 'flex';
});

// Fechar modal de Política de Privacidade
closePrivacyModalButton.addEventListener('click', () => {
    privacyModal.style.display = 'none';
});

// Fechar modal clicando fora
window.addEventListener('click', (event) => {
    if (event.target === privacyModal) {
        privacyModal.style.display = 'none';
    }
});

// Modal Contato
const contactModal = document.getElementById('modal-contato');
const openContactModalButton = document.getElementById('open-contact-modal');
const closeContactModalButton = document.getElementById('close-contact-modal');

// Abrir modal de Contato
openContactModalButton.addEventListener('click', (event) => {
    event.preventDefault();
    contactModal.style.display = 'flex';
});

// Fechar modal de Contato
closeContactModalButton.addEventListener('click', () => {
    contactModal.style.display = 'none';
});

// Fechar modal clicando fora
window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
        contactModal.style.display = 'none';
    }
});
