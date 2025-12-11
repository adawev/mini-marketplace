export class ProductList {
  constructor(containerId, onAddToCart) {
    this.container = document.getElementById(containerId);
    this.onAddToCart = onAddToCart;
    this.products = [];
  }

  async loadProducts() {
    try {
      this.showLoading();

      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Mahsulotlarni yuklab bo\'lmadi');
      }

      this.products = await response.json();
      this.renderProducts();
    } catch (error) {
      this.showError(error.message);
    }
  }

  showLoading() {
    this.container.innerHTML = '<div class="loading">Mahsulotlar yuklanmoqda...</div>';
  }

  showError(message) {
    this.container.innerHTML = `<div class="error">Xatolik: ${message}</div>`;
  }

  renderProducts() {
    this.container.innerHTML = '';

    this.products.forEach(product => {
      const card = this.createProductCard(product);
      this.container.appendChild(card);
    });
  }

  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'product-image-container';

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;

    const category = document.createElement('div');
    category.className = 'product-category';
    category.textContent = product.category;

    imgContainer.appendChild(img);
    imgContainer.appendChild(category);

    const title = document.createElement('h3');
    title.textContent = product.title;
    title.title = product.title;

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = `$${product.price.toFixed(2)}`;

    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = 'Add to cart';
    button.addEventListener('click', () => {
      this.onAddToCart(product);
    });

    card.appendChild(imgContainer);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
  }

  init() {
    this.loadProducts();
  }
}
