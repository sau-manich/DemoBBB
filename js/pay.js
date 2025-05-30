window.onload = function () {
  const params = new URLSearchParams(window.location.search);

  const name = params.get("name");
  const desc = params.get("desc");
  const priceRaw = params.get("price") || "0";
  const qty = parseInt(params.get("qty")) || 1;
  const color = params.get("color");
  const img = params.get("img") || "https://cdn.pixabay.com/photo/2017/06/10/07/20/noodle-2389221_1280.png";

  const cleanedPrice = priceRaw.replace("Bs.-", "").replace(/[,]/g, '').trim();
  const price = parseFloat(cleanedPrice);

  if (name && desc && !isNaN(price)) {
    const list = document.querySelector(".product-list");
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${img}" alt="${name}" />
      <div class="cart-details">
        <h4>${name}</h4>
        <p>${desc} ${color ? '| Color: ' + color : ''}</p>
        <div class="price-qty">
          <span>Bs.- ${(price).toFixed(2)}</span>
          <div class="qty-control">
            <button>-</button>
            <span>${qty}</span>
            <button>+</button>
          </div>
        </div>
      </div>
    `;
    list.appendChild(div);
    actualizarResumen();
  }
}

function actualizarResumen() {
  let total = 0;
  document.querySelectorAll(".cart-item").forEach(item => {
    const precioTexto = item.querySelector(".price-qty span").textContent.trim();
    const precioLimpio = precioTexto.replace("Bs.-", "").replace(/,/g, '').trim();
    const precio = parseFloat(precioLimpio);
    total += isNaN(precio) ? 0 : precio;
  });

  document.querySelector(".summary-row span:last-child").textContent = `Bs.- ${total.toFixed(2)}`;

  const descuento = 0.10;
  const totalFinal = total * (1 - descuento);
  document.querySelector(".summary-total span:last-child").textContent = `Bs.- ${totalFinal.toFixed(2)}`;
}
