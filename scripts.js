
document.getElementById('searchInput').addEventListener('input', debounce(function (event) {
    const query = event.target.value.toLowerCase();
    const ebookCards = document.querySelectorAll('.ebook-item');

    ebookCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.dataset.category ? card.dataset.category.toLowerCase() : '';
        const author = card.dataset.author ? card.dataset.author.toLowerCase() : '';

        if (title.includes(query) || category.includes(query) || author.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}, 300));

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
