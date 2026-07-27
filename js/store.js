// ===== STORE DATA =====
const products = [
  // GAMES
  { id: 1, name: "Cyberpunk 2077", category: "games", price: 29.99, oldPrice: 59.99, discount: 50, platform: ["PC", "Steam"], rating: 4.5, ratingCount: 12580, type: "global", isNew: false, icon: "🌆" },
  { id: 2, name: "The Witcher 3: Wild Hunt", category: "games", price: 9.99, oldPrice: 39.99, discount: 75, platform: ["PC", "Steam", "GOG"], rating: 4.8, ratingCount: 28400, type: "global", isNew: false, icon: "⚔️" },
  { id: 3, name: "Elden Ring", category: "games", price: 39.99, oldPrice: 59.99, discount: 33, platform: ["PC", "Steam"], rating: 4.7, ratingCount: 19200, type: "global", isNew: false, icon: "Ring" },
  { id: 4, name: "Baldur's Gate 3", category: "games", price: 44.99, oldPrice: 59.99, discount: 25, platform: ["PC", "Steam"], rating: 4.9, ratingCount: 15600, type: "global", isNew: true, icon: "🐉" },
  { id: 5, name: "Red Dead Redemption 2", category: "games", price: 19.99, oldPrice: 59.99, discount: 67, platform: ["PC", "Rockstar"], rating: 4.6, ratingCount: 22100, type: "global", isNew: false, icon: "🤠" },
  { id: 6, name: "GTA V Premium Edition", category: "games", price: 14.99, oldPrice: 29.99, discount: 50, platform: ["PC", "Rockstar"], rating: 4.4, ratingCount: 45200, type: "global", isNew: false, icon: "🚗" },
  { id: 7, name: "FIFA 25 Ultimate", category: "games", price: 34.99, oldPrice: 69.99, discount: 50, platform: ["PC", "EA Play"], rating: 4.2, ratingCount: 8900, type: "global", isNew: true, icon: "⚽" },
  { id: 8, name: "Hogwarts Legacy", category: "games", price: 24.99, oldPrice: 49.99, discount: 50, platform: ["PC", "Steam"], rating: 4.5, ratingCount: 11200, type: "global", isNew: false, icon: "🧙" },
  { id: 9, name: "Starfield", category: "games", price: 39.99, oldPrice: 69.99, discount: 43, platform: ["PC", "Xbox"], rating: 4.0, ratingCount: 7800, type: "global", isNew: false, icon: "🚀" },
  { id: 10, name: "Call of Duty: MW III", category: "games", price: 29.99, oldPrice: 69.99, discount: 57, platform: ["PC", "Battle.net"], rating: 4.1, ratingCount: 16300, type: "global", isNew: false, icon: "🎯" },

  // SOFTWARE
  { id: 11, name: "Windows 11 Pro", category: "software", price: 24.99, oldPrice: 199.99, discount: 87, platform: ["PC"], rating: 4.6, ratingCount: 32100, type: "global", isNew: false, icon: "🪟" },
  { id: 12, name: "Microsoft Office 2024", category: "software", price: 49.99, oldPrice: 149.99, discount: 67, platform: ["PC", "Mac"], rating: 4.7, ratingCount: 18700, type: "global", isNew: true, icon: "📊" },
  { id: 13, name: "Adobe Photoshop CC", category: "software", price: 19.99, oldPrice: 22.99, discount: 13, platform: ["PC", "Mac"], rating: 4.5, ratingCount: 9400, type: "global", isNew: false, icon: "🎨" },
  { id: 14, name: "Norton Antivirus Plus", category: "software", price: 14.99, oldPrice: 49.99, discount: 70, platform: ["PC", "Mac"], rating: 4.3, ratingCount: 6200, type: "global", isNew: false, icon: "🛡️" },
  { id: 15, name: "Ableton Live 12 Suite", category: "software", price: 39.99, oldPrice: 74.99, discount: 47, platform: ["PC", "Mac"], rating: 4.8, ratingCount: 4100, type: "global", isNew: true, icon: "🎵" },
  { id: 16, name: "FL Studio Producer", category: "software", price: 34.99, oldPrice: 99.99, discount: 65, platform: ["PC", "Mac"], rating: 4.6, ratingCount: 7800, type: "global", isNew: false, icon: "🎹" },

  // GIFT CARDS
  { id: 17, name: "Steam Gift Card $50", category: "giftcards", price: 46.99, oldPrice: 50.00, discount: 6, platform: ["Steam"], rating: 4.9, ratingCount: 52300, type: "global", isNew: false, icon: "🎮" },
  { id: 18, name: "PlayStation Store $50", category: "giftcards", price: 47.49, oldPrice: 50.00, discount: 5, platform: ["PlayStation"], rating: 4.8, ratingCount: 38100, type: "region", isNew: false, icon: "🎯" },
  { id: 19, name: "Xbox Game Pass Ultimate 3M", category: "giftcards", price: 29.99, oldPrice: 44.99, discount: 33, platform: ["Xbox"], rating: 4.7, ratingCount: 21400, type: "global", isNew: false, icon: "🟢" },
  { id: 20, name: "Nintendo eShop $25", category: "giftcards", price: 23.49, oldPrice: 25.00, discount: 6, platform: ["Nintendo"], rating: 4.8, ratingCount: 15600, type: "region", isNew: false, icon: "🍄" },
  { id: 21, name: "Amazon Gift Card $100", category: "giftcards", price: 94.99, oldPrice: 100.00, discount: 5, platform: ["Amazon"], rating: 4.9, ratingCount: 41200, type: "global", isNew: false, icon: "📦" },
  { id: 22, name: "Google Play $50", category: "giftcards", price: 46.99, oldPrice: 50.00, discount: 6, platform: ["Android"], rating: 4.7, ratingCount: 28900, type: "global", isNew: false, icon: "📱" },

  // SUBSCRIPTIONS
  { id: 23, name: "Netflix Premium 3M", category: "subscriptions", price: 24.99, oldPrice: 47.97, discount: 48, platform: ["Multi"], rating: 4.5, ratingCount: 19800, type: "global", isNew: false, icon: "🎬" },
  { id: 24, name: "Spotify Premium 12M", category: "subscriptions", price: 39.99, oldPrice: 119.88, discount: 67, platform: ["Multi"], rating: 4.7, ratingCount: 31200, type: "global", isNew: false, icon: "🎧" },
  { id: 25, name: "YouTube Premium 12M", category: "subscriptions", price: 34.99, oldPrice: 131.88, discount: 73, platform: ["Multi"], rating: 4.6, ratingCount: 14500, type: "global", isNew: false, icon: "▶️" },
  { id: 26, name: "Adobe Creative Cloud 1Y", category: "subscriptions", price: 89.99, oldPrice: 599.88, discount: 85, platform: ["PC", "Mac"], rating: 4.4, ratingCount: 8200, type: "global", isNew: false, icon: "🎯" },
  { id: 27, name: "VPN Premium 2 Years", category: "subscriptions", price: 29.99, oldPrice: 191.76, discount: 84, platform: ["Multi"], rating: 4.5, ratingCount: 11300, type: "global", isNew: true, icon: "🔒" },

  // COURSES
  { id: 28, name: "Complete Web Developer", category: "courses", price: 14.99, oldPrice: 199.99, discount: 93, platform: ["Udemy"], rating: 4.7, ratingCount: 42800, type: "global", isNew: false, icon: "💻" },
  { id: 29, name: "Python Mastery Course", category: "courses", price: 12.99, oldPrice: 149.99, discount: 91, platform: ["Udemy"], rating: 4.8, ratingCount: 35600, type: "global", isNew: false, icon: "🐍" },
  { id: 30, name: "AI & Machine Learning", category: "courses", price: 16.99, oldPrice: 199.99, discount: 92, platform: ["Udemy"], rating: 4.6, ratingCount: 18900, type: "global", isNew: true, icon: "🤖" },
  { id: 31, name: "Digital Marketing Pro", category: "courses", price: 11.99, oldPrice: 129.99, discount: 91, platform: ["Udemy"], rating: 4.5, ratingCount: 24100, type: "global", isNew: false, icon: "📈" },
  { id: 32, name: "UI/UX Design Bootcamp", category: "courses", price: 13.99, oldPrice: 179.99, discount: 92, platform: ["Udemy"], rating: 4.7, ratingCount: 16700, type: "global", isNew: false, icon: "🎨" },
];

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('storeCart')) || [];
let currentCategory = 'all';
let currentType = 'all';
let maxPrice = 500;
let minRating = 0;
let sortBy = 'featured';
let viewMode = 'grid';
let searchQuery = '';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateCategoryCounts();
  renderProducts();
  initFilters();
  initCart();
  initSearch();
  initViewToggle();
  document.getElementById('totalProducts').textContent = products.length;
});

// ===== RENDER PRODUCTS =====
function renderProducts() {
  let filtered = products.filter(p => {
    if (currentCategory !== 'all' && p.category !== currentCategory) return false;
    if (currentType !== 'all' && p.type !== currentType) return false;
    if (p.price > maxPrice) return false;
    if (p.rating < minRating) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Sort
  switch (sortBy) {
    case 'newest':
      filtered.sort((a, b) => b.isNew - a.isNew);
      break;
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      filtered.sort((a, b) => b.discount - a.discount);
      break;
    default:
      filtered.sort((a, b) => b.ratingCount - a.ratingCount);
  }

  const grid = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');

  if (filtered.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
  } else {
    grid.style.display = '';
    empty.style.display = 'none';
  }

  grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
  document.getElementById('resultCount').textContent = filtered.length + ' منتج';
}

function createProductCard(p) {
  const stars = getStars(p.rating);
  const inCart = cart.some(c => c.id === p.id);

  return `
    <div class="product-card" data-id="${p.id}">
      <div class="card-image">
        <div class="placeholder-icon">${p.icon}</div>
        ${p.discount > 0 ? `<span class="discount-badge">-${p.discount}%</span>` : ''}
        ${p.isNew ? '<span class="new-badge">جديد</span>' : ''}
      </div>
      <div class="card-body">
        <div class="card-category">${getCategoryName(p.category)}</div>
        <div class="card-title">${p.name}</div>
        <div class="card-platform">
          ${p.platform.map(t => `<span class="platform-tag">${t}</span>`).join('')}
        </div>
        <div class="card-rating">
          <span class="stars">${stars}</span>
          <span class="rating-num">${p.rating}</span>
          <span class="rating-count">(${formatNum(p.ratingCount)})</span>
        </div>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-current">$${p.price.toFixed(2)}</span>
            ${p.oldPrice > p.price ? `<span class="price-old">$${p.oldPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})" title="أضف للسلة">
            ${inCart ? '&#10003;' : '&#43;'}
          </button>
        </div>
      </div>
    </div>`;
}

// ===== HELPERS =====
function getStars(r) {
  const full = Math.floor(r);
  const half = r % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '&#9733;'.repeat(full) + (half ? '&#9734;' : '') + '&#9734;'.repeat(empty);
}

function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n;
}

function getCategoryName(cat) {
  const names = { games: 'ألعاب', software: 'برامج', giftcards: 'قسائم هدايا', subscriptions: 'اشتراكات', courses: 'دورات تعليمية' };
  return names[cat] || cat;
}

function updateCategoryCounts() {
  document.getElementById('countAll').textContent = products.length;
  document.getElementById('countGames').textContent = products.filter(p => p.category === 'games').length;
  document.getElementById('countSoftware').textContent = products.filter(p => p.category === 'software').length;
  document.getElementById('countGiftcards').textContent = products.filter(p => p.category === 'giftcards').length;
  document.getElementById('countSubscriptions').textContent = products.filter(p => p.category === 'subscriptions').length;
  document.getElementById('countCourses').textContent = products.filter(p => p.category === 'courses').length;
}

// ===== FILTERS =====
function initFilters() {
  // Category Tabs (top bar)
  document.querySelectorAll('#categoryTabs .cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#categoryTabs .cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;

      // Sync sidebar
      document.querySelectorAll('#categoryList li').forEach(l => l.classList.remove('active'));
      const sidebarItem = document.querySelector(`#categoryList li[data-category="${currentCategory}"]`);
      if (sidebarItem) sidebarItem.classList.add('active');

      document.getElementById('sectionTitle').textContent =
        currentCategory === 'all' ? 'جميع المنتجات' : getCategoryName(currentCategory);
      renderProducts();
    });
  });

  // Categories (sidebar)
  document.querySelectorAll('#categoryList li').forEach(li => {
    li.addEventListener('click', () => {
      document.querySelectorAll('#categoryList li').forEach(l => l.classList.remove('active'));
      li.classList.add('active');
      currentCategory = li.dataset.category;

      // Sync top tabs
      document.querySelectorAll('#categoryTabs .cat-tab').forEach(t => t.classList.remove('active'));
      const tabItem = document.querySelector(`#categoryTabs .cat-tab[data-category="${currentCategory}"]`);
      if (tabItem) tabItem.classList.add('active');

      document.getElementById('sectionTitle').textContent =
        currentCategory === 'all' ? 'جميع المنتجات' : getCategoryName(currentCategory);
      renderProducts();
    });
  });

  // Price
  document.getElementById('priceRange').addEventListener('input', e => {
    maxPrice = parseInt(e.target.value);
    document.getElementById('priceMax').textContent = '$' + maxPrice;
    renderProducts();
  });

  // Type
  document.querySelectorAll('.type-list li').forEach(li => {
    li.addEventListener('click', () => {
      document.querySelectorAll('.type-list li').forEach(l => l.classList.remove('active'));
      li.classList.add('active');
      currentType = li.dataset.type;
      renderProducts();
    });
  });

  // Rating
  document.querySelectorAll('input[name="rating"]').forEach(input => {
    input.addEventListener('change', () => {
      minRating = parseFloat(input.value);
      renderProducts();
    });
  });

  // Sort
  document.getElementById('sortSelect').addEventListener('change', e => {
    sortBy = e.target.value;
    renderProducts();
  });

  // Filter toggle (mobile)
  document.getElementById('filterToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('show');
  });

  document.getElementById('closeSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('show');
  });
}

function resetFilters() {
  currentCategory = 'all';
  currentType = 'all';
  maxPrice = 500;
  minRating = 0;
  sortBy = 'featured';
  searchQuery = '';

  // Reset top tabs
  document.querySelectorAll('#categoryTabs .cat-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('#categoryTabs .cat-tab[data-category="all"]').classList.add('active');

  // Reset sidebar
  document.querySelectorAll('#categoryList li').forEach(l => l.classList.remove('active'));
  document.querySelector('#categoryList li[data-category="all"]').classList.add('active');
  document.querySelectorAll('.type-list li').forEach(l => l.classList.remove('active'));
  document.querySelector('.type-list li[data-type="all"]').classList.add('active');
  document.getElementById('priceRange').value = 500;
  document.getElementById('priceMax').textContent = '$500';
  document.querySelector('input[name="rating"][value="0"]').checked = true;
  document.getElementById('sortSelect').value = 'featured';
  document.getElementById('globalSearch').value = '';
  document.getElementById('sectionTitle').textContent = 'جميع المنتجات';
  renderProducts();
}

function filterByCategory(cat) {
  currentCategory = cat;

  // Sync top tabs
  document.querySelectorAll('#categoryTabs .cat-tab').forEach(t => t.classList.remove('active'));
  const tabItem = document.querySelector(`#categoryTabs .cat-tab[data-category="${cat}"]`);
  if (tabItem) tabItem.classList.add('active');

  // Sync sidebar
  document.querySelectorAll('#categoryList li').forEach(l => l.classList.remove('active'));
  const sidebarItem = document.querySelector(`#categoryList li[data-category="${cat}"]`);
  if (sidebarItem) sidebarItem.classList.add('active');

  document.getElementById('sectionTitle').textContent = getCategoryName(cat);
  renderProducts();
  window.scrollTo({ top: document.querySelector('.store-content').offsetTop - 80, behavior: 'smooth' });
}

// ===== SEARCH =====
function initSearch() {
  document.getElementById('globalSearch').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderProducts();
  });
}

// ===== VIEW TOGGLE =====
function initViewToggle() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      viewMode = btn.dataset.view;
      const grid = document.getElementById('productsGrid');
      grid.classList.toggle('list-view', viewMode === 'list');
    });
  });
}

// ===== CART =====
function initCart() {
  document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.add('show');
    document.getElementById('cartOverlay').classList.add('show');
  });

  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  updateCartUI();
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('show');
  document.getElementById('cartOverlay').classList.remove('show');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    cart = cart.filter(c => c.id !== id);
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, icon: product.icon });
  }

  localStorage.setItem('storeCart', JSON.stringify(cart));
  updateCartUI();
  renderProducts();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  localStorage.setItem('storeCart', JSON.stringify(cart));
  updateCartUI();
  renderProducts();
}

function updateCartUI() {
  const count = cart.length;
  document.getElementById('cartCount').textContent = count;

  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (count === 0) {
    itemsEl.innerHTML = '<div class="cart-empty"><div class="empty-icon">&#128722;</div><p>سلتك فارغة</p></div>';
    footerEl.style.display = 'none';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.icon}</div>
      <div class="cart-item-info">
        <div class="name">${item.name}</div>
        <div class="price">$${item.price.toFixed(2)}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&#10005;</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('totalPrice').textContent = '$' + total.toFixed(2);
  footerEl.style.display = 'block';
}
