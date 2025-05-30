document.addEventListener('DOMContentLoaded', () => {
  const productDetails = document.querySelector('.product-details');
  if (productDetails) {
    setTimeout(() => {
      productDetails.classList.add('animate-in');
    }, 100);
  }

  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  if (!product) return;

  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-desc').textContent = product.desc;

  document.getElementById('product-img').src = product.img;
  document.getElementById('product-img-2').src = product.img;
  document.getElementById('product-img-3').src = product.img;

  const cleanedPrice = product.price
    .replace("Bs.-", "")
    .replace(/[^\d.]/g, '')
    .trim();

  unitPrice = parseFloat(cleanedPrice);
  if (isNaN(unitPrice)) {
    unitPrice = 0;
    console.error("Precio inválido:", product.price);
  }

  updatePrice();

  new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});

let qty = 1;
let unitPrice = 0;

function formatPrice(num) {
  return `Bs.- ${num.toFixed(2)}`;
}

function updatePrice() {
  const total = unitPrice * qty;
  document.getElementById("product-price").textContent = formatPrice(total);
  document.getElementById("qty").textContent = qty;
}

function increase() {
  qty++;
  updatePrice();
}

function decrease() {
  if (qty > 1) {
    qty--;
    updatePrice();
  }
}

const heartIcon = document.getElementById("heart");
heartIcon.addEventListener("click", () => {
  heartIcon.classList.toggle("active");
  heartIcon.classList.toggle("fa-solid");
  heartIcon.classList.toggle("fa-regular");
});

const moreBtn = document.getElementById("moreBtn");
const popup = document.getElementById("popup");

moreBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
});

document.addEventListener("click", (e) => {
  if (!popup.contains(e.target) && e.target !== moreBtn) {
    popup.style.display = "none";
  }
});

document.querySelectorAll(".color").forEach(c => {
  c.addEventListener("click", () => {
    document.querySelectorAll(".color").forEach(col => col.classList.remove("selected"));
    c.classList.add("selected");
  });
});

function agregarAlCarrito() {
  const nombre = document.getElementById("product-name")?.textContent || "Producto";
  const desc = document.getElementById("product-desc")?.textContent || "Descripción";

  const precioTexto = document.getElementById("product-price")?.textContent || "0";
  const qty = parseInt(document.getElementById("qty")?.textContent || "1");

  const colorSeleccionado = document.querySelector(".color.selected");
  const color = colorSeleccionado
    ? colorSeleccionado.style.backgroundColor
    : "";

  const img = document.querySelector(".main-image")?.src || "";
  const url = `index5.html?name=${encodeURIComponent(nombre)}&desc=${encodeURIComponent(desc)}&price=${encodeURIComponent(precioTexto)}&qty=${qty}&color=${encodeURIComponent(color)}&img=${encodeURIComponent(img)}`;

  window.location.href = url;
}
