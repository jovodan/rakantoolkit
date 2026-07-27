// ===== ADMIN DASHBOARD =====
const ADMIN_STORAGE_KEY = 'rakan_products';
let adminProducts = [];
let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
  loadAdminProducts();
  initAdminTabs();
  initProductForm();
  updateDashboardStats();
  renderProductsTable();
});

// ===== PRODUCTS STORAGE =====
function loadAdminProducts() {
  const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (saved) {
    adminProducts = JSON.parse(saved);
  } else {
    // Fallback: load from main store.js data
    adminProducts = typeof products !== 'undefined' ? [...products] : [];
  }
}

function saveAdminProducts() {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminProducts));
}

// ===== TABS =====
function initAdminTabs() {
  document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');

      if (btn.dataset.tab === 'add-product') {
        if (!editingId) resetForm();
        document.getElementById('formTitle').textContent = editingId ? 'تعديل المنتج' : 'إضافة منتج جديد';
        document.getElementById('submitBtn').textContent = editingId ? 'حفظ التعديلات' : 'إضافة المنتج';
        document.getElementById('cancelEdit').style.display = editingId ? 'block' : 'none';
      }

      if (btn.dataset.tab === 'products') {
        renderProductsTable();
      }

      if (btn.dataset.tab === 'dashboard') {
        updateDashboardStats();
      }
    });
  });

  document.getElementById('cancelEdit').addEventListener('click', () => {
    editingId = null;
    resetForm();
    document.querySelector('.admin-nav-btn[data-tab="products"]').click();
  });
}

// ===== DASHBOARD STATS =====
function updateDashboardStats() {
  document.getElementById('statProducts').textContent = adminProducts.length;
  document.getElementById('statGames').textContent = adminProducts.filter(p => p.category === 'games').length;
  document.getElementById('statSoftware').textContent = adminProducts.filter(p => p.category === 'software').length;
  document.getElementById('statGiftcards').textContent = adminProducts.filter(p => p.category === 'giftcards').length;
  document.getElementById('statSubscriptions').textContent = adminProducts.filter(p => p.category === 'subscriptions').length;
  document.getElementById('statCourses').textContent = adminProducts.filter(p => p.category === 'courses').length;
}

// ===== PRODUCTS TABLE =====
function renderProductsTable(filter = '') {
  const tbody = document.getElementById('productsTableBody');
  let filtered = adminProducts;

  if (filter) {
    const q = filter.toLowerCase();
    filtered = adminProducts.filter(p =>
      (p.nameAr && p.nameAr.toLowerCase().includes(q)) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(q))
    );
  }

  const categoryNames = { games: 'ألعاب', software: 'برامج', giftcards: 'قسائم هدايا', subscriptions: 'اشتراكات', courses: 'دورات' };
  const categoryBadge = { games: 'badge-games', software: 'badge-software', giftcards: 'badge-giftcards', subscriptions: 'badge-subscriptions', courses: 'badge-courses' };
  const categoryIcons = { games: '🎮', software: '💻', giftcards: '🎁', subscriptions: '🔔', courses: '📚' };

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:3rem; color:var(--cosmic-text-dim);">لا توجد منتجات</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const name = typeof lang !== 'undefined' && lang === 'en' ? p.nameEn : p.nameAr;
    const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
    return `
      <tr>
        <td>
          <div class="product-cell">
            <div class="product-thumb">${categoryIcons[p.category] || '📦'}</div>
            <div class="product-cell-info">
              <strong>${name}</strong>
              <small>ID: ${p.id}</small>
            </div>
          </div>
        </td>
        <td><span class="badge ${categoryBadge[p.category]}">${categoryNames[p.category]}</span></td>
        <td>${p.type || 'منتج رقمي'}</td>
        <td class="price-cell">$${p.price}</td>
        <td class="rating-stars">${stars} ${p.rating}</td>
        <td>
          <div class="action-btns">
            <button class="btn-edit" onclick="editProduct(${p.id})">&#9998; تعديل</button>
            <button class="btn-delete" onclick="deleteProduct(${p.id})">&#10005; حذف</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ===== PRODUCT FORM =====
function initProductForm() {
  document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveProduct();
  });

  document.getElementById('adminSearch').addEventListener('input', (e) => {
    renderProductsTable(e.target.value);
  });
}

function saveProduct() {
  const product = {
    id: editingId || Date.now(),
    nameAr: document.getElementById('pNameAr').value.trim(),
    nameEn: document.getElementById('pNameEn').value.trim(),
    descAr: document.getElementById('pDescAr').value.trim(),
    descEn: document.getElementById('pDescEn').value.trim(),
    image: document.getElementById('pImage').value.trim() || null,
    price: parseFloat(document.getElementById('pPrice').value),
    category: document.getElementById('pCategory').value,
    type: document.getElementById('pType').value,
    brand: document.getElementById('pBrand').value.trim() || 'Unknown',
    rating: parseFloat(document.getElementById('pRating').value) || 4.5,
    sales: parseInt(document.getElementById('pSales').value) || 0,
    featured: document.getElementById('pFeatured').checked,
    original: document.getElementById('pOriginal').checked
  };

  if (editingId) {
    const idx = adminProducts.findIndex(p => p.id === editingId);
    if (idx !== -1) adminProducts[idx] = product;
    showToast('تم تعديل المنتج بنجاح');
  } else {
    adminProducts.push(product);
    showToast('تم إضافة المنتج بنجاح');
  }

  saveAdminProducts();
  updateDashboardStats();
  renderProductsTable();
  resetForm();

  // Switch to products tab
  document.querySelector('.admin-nav-btn[data-tab="products"]').click();
}

function editProduct(id) {
  const p = adminProducts.find(item => item.id === id);
  if (!p) return;

  editingId = id;

  document.getElementById('pNameAr').value = p.nameAr || '';
  document.getElementById('pNameEn').value = p.nameEn || '';
  document.getElementById('pDescAr').value = p.descAr || '';
  document.getElementById('pDescEn').value = p.descEn || '';
  document.getElementById('pImage').value = p.image || '';
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pCategory').value = p.category;
  document.getElementById('pType').value = p.type || 'product';
  document.getElementById('pBrand').value = p.brand || '';
  document.getElementById('pRating').value = p.rating || 4.5;
  document.getElementById('pSales').value = p.sales || 0;
  document.getElementById('pFeatured').checked = p.featured || false;
  document.getElementById('pOriginal').checked = p.original !== false;

  document.getElementById('formTitle').textContent = 'تعديل المنتج';
  document.getElementById('submitBtn').textContent = 'حفظ التعديلات';
  document.getElementById('cancelEdit').style.display = 'block';

  document.querySelector('.admin-nav-btn[data-tab="add-product"]').click();
}

function deleteProduct(id) {
  if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
  adminProducts = adminProducts.filter(p => p.id !== id);
  saveAdminProducts();
  updateDashboardStats();
  renderProductsTable();
  showToast('تم حذف المنتج');
}

function resetForm() {
  editingId = null;
  document.getElementById('productForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('formTitle').textContent = 'إضافة منتج جديد';
  document.getElementById('submitBtn').textContent = 'إضافة المنتج';
  document.getElementById('cancelEdit').style.display = 'none';
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}
