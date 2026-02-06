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
        
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h2>${book.title}</h2>
                <p class="book-author">by ${book.author}</p>
                <p class="book-description">${book.shortDescription}</p>
            </div>
        `;
        
        booksGrid.appendChild(bookCard);
    });
}

// Show modal with full review
function showModal(book) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    // Create purchase links
    let purchaseLinks = '';
    
    if (book.shopeeLink && book.amazonLink) {
        // Both links available
        purchaseLinks = `
            <div class="purchase-links">
                <a href="${book.shopeeLink}" target="_blank" rel="noopener noreferrer">Beli di Shopee</a>
                <span> atau </span>
                <a href="${book.amazonLink}" target="_blank" rel="noopener noreferrer">Beli di Amazon/Kindle</a>
            </div>
        `;
    } else if (book.shopeeLink) {
        // Only Shopee link
        purchaseLinks = `
            <div class="purchase-links">
                <a href="${book.shopeeLink}" target="_blank" rel="noopener noreferrer">Beli di Shopee</a>
            </div>
        `;
    } else if (book.amazonLink) {
        // Only Amazon link
        purchaseLinks = `
            <div class="purchase-links">
                <a href="${book.amazonLink}" target="_blank" rel="noopener noreferrer">Beli di Amazon/Kindle</a>
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        <div class="modal-book-header">
            <img src="${book.cover}" alt="${book.title}" class="modal-book-cover">
            <div class="modal-book-info">
                <h2>${book.title}</h2>
                <p class="book-author">by ${book.author}</p>
            </div>
        </div>
        <div class="modal-review">
            <h3>My Review</h3>
            <p>${book.fullReview}</p>
        </div>
        ${purchaseLinks}
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
