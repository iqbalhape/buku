// Load books from JSON file
async function loadBooks() {
    try {
        const response = await fetch('books.json');
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

// Display books in grid
function displayBooks(books) {
    const booksGrid = document.getElementById('books-grid');
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.onclick = () => showModal(book);
        
        const stars = '⭐'.repeat(book.rating);
        
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h2>${book.title}</h2>
                <p class="book-author">by ${book.author}</p>
                <div class="book-rating">${stars}</div>
                <p class="book-description">${book.shortDescription}</p>
                <a href="${book.affiliateLink}" class="buy-button" target="_blank" onclick="event.stopPropagation()">
                    Buy Now →
                </a>
            </div>
        `;
        
        booksGrid.appendChild(bookCard);
    });
}

// Show modal with full review
function showModal(book) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    const stars = '⭐'.repeat(book.rating);
    
    modalBody.innerHTML = `
        <div class="modal-book-header">
            <img src="${book.cover}" alt="${book.title}" class="modal-book-cover">
            <div class="modal-book-info">
                <h2>${book.title}</h2>
                <p class="book-author">by ${book.author}</p>
                <div class="book-rating">${stars}</div>
            </div>
        </div>
        <div class="modal-review">
            <h3>My Review</h3>
            <p>${book.fullReview}</p>
        </div>
        <a href="${book.affiliateLink}" class="buy-button" target="_blank">
            Buy on Shopee →
        </a>
    `;
    
    modal.style.display = 'block';
}

// Close modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // Load books on page load
    loadBooks();
});
