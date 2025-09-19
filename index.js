document.addEventListener('DOMContentLoaded', () => {
  const cartCountEl = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartBtn');
  const addBtns = document.querySelectorAll('.add-to-cart');
  const filters = document.querySelectorAll('.filter');
  const productGrid = document.getElementById('products');

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  updateCartCount();

  addBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const title = btn.dataset.title;
      const price = Number(btn.dataset.price);
      cart.push({title, price});
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      btn.textContent = 'Додано ✓';
      setTimeout(()=> btn.textContent = 'До кошика', 900);
    });
  });

  cartBtn.addEventListener('click', () => {
    const current = JSON.parse(localStorage.getItem('cart') || '[]');
    if (current.length === 0) {
      alert('Кошик порожній');
      return;
    }

    const summary = current.reduce((acc, it) => acc + it.price, 0);
    alert(`У кошику ${current.length} товар(ів). Загальна сума: ${summary} грн.`);
  });

  function updateCartCount(){
    const c = JSON.parse(localStorage.getItem('cart') || '[]');
    cartCountEl.textContent = c.length;
  }

  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x=>x.classList.remove('active'));
    f.classList.add('active');
    const tag = f.dataset.filter;
    const items = productGrid.querySelectorAll('.product');
    items.forEach(it => {
      if (tag === 'all') {
        it.style.display = '';
      } else {
        const tags = it.dataset.tags || '';
        it.style.display = tags.includes(tag) ? '' : 'none';
      }
    });
  }));


  document.getElementById('searchBtn').addEventListener('click', () => {
    const q = document.getElementById('q').value.trim().toLowerCase();
    const items = productGrid.querySelectorAll('.product');
    if (!q) { items.forEach(i=>i.style.display=''); return; }
    items.forEach(it => {
      const t = it.querySelector('.title').textContent.toLowerCase();
      it.style.display = t.includes(q) ? '' : 'none';
    });
  });
});
