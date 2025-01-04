// Obtém os elementos principais
const searchInput = document.getElementById('searchInput');
const ebookCards = document.querySelectorAll('.ebook-item');
const ebookSection = document.querySelector('.ebook-list');
const noResultsMessage = document.createElement('p');

// Configura a mensagem de "Nenhum resultado encontrado"
noResultsMessage.textContent = 'Nenhum eBook encontrado.';
noResultsMessage.style.display = 'none';
noResultsMessage.style.color = '#e63946';
noResultsMessage.style.fontSize = '18px';
noResultsMessage.style.marginTop = '20px';
noResultsMessage.setAttribute('role', 'alert');
ebookSection.appendChild(noResultsMessage);

/**
 * Função para normalizar o texto (remover espaços extras e converter para minúsculas).
 * @param {string} text - O texto a ser normalizado.
 * @returns {string} O texto normalizado.
 */
function normalizeText(text) {
    return text.trim().toLowerCase();
}

/**
 * Função para aplicar debounce a uma função, retardando sua execução até que o tempo de espera termine.
 * @param {Function} func - A função a ser executada com debounce.
 * @param {number} wait - Tempo de espera em milissegundos.
 * @returns {Function} Uma função com debounce.
 */
function debounceInputHandler(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Filtra os eBooks com base na consulta fornecida.
 * @param {string} query - O texto de busca fornecido pelo usuário.
 * @param {NodeList} ebookCards - Os cartões de eBooks disponíveis.
 * @returns {boolean} Retorna true se houver resultados; caso contrário, false.
 */
function filterEbooks(query, ebookCards) {
    let hasResults = false;

    ebookCards.forEach(card => {
        const title = normalizeText(card.querySelector('h3').textContent);
        const category = normalizeText(card.dataset.category || '');
        const author = normalizeText(card.dataset.author || '');

        if (title.includes(query) || category.includes(query) || author.includes(query)) {
            card.style.display = 'flex';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    return hasResults;
}

// Adiciona o evento de entrada ao campo de busca
searchInput.addEventListener('input', debounceInputHandler(function (event) {
    const query = normalizeText(event.target.value);
    const hasResults = filterEbooks(query, ebookCards);

    noResultsMessage.style.display = hasResults ? 'none' : 'block';
}, 300));

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
