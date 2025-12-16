let cart = [];
const cartPopup = document.getElementById("cart-popup");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const successPopup = document.getElementById("success-popup");

function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);
  if (existing) existing.qty++;
  else cart.push({ name, price, image, qty: 1 });
  updateCart();
  showSuccessPopup();
}

function toggleCart() {
  cartPopup.classList.toggle("show");
}

function updateCart() {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>
        <div class="cart-controls">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>`;
  });

  cartTotal.textContent = `Total: ₹${total}`;
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order!");
  cart = [];
  updateCart();
  cartPopup.classList.remove("show");
}

function showSuccessPopup() {
  successPopup.classList.add("show");
  setTimeout(() => successPopup.classList.remove("show"), 2000);
}

function filterItems() {
  const search = document.getElementById("search").value.toLowerCase();
  const items = document.querySelectorAll(".menu-item");
  items.forEach(item => {
    const name = item.dataset.name.toLowerCase();
    item.style.display = name.includes(search) ? "block" : "none";
  });
}
