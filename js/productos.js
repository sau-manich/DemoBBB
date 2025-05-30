const products = {
  "Tecnología": [
    {
      name: "Alexa",
      desc: "Asistente inteligente de voz que controla tu casa, responde preguntas y reproduce música.",
      price: 350,
      img: "../img/alexa.gif"
    },
    {
      name: "Cargador Portátil",
      desc: "Batería externa de alta capacidad para mantener tus dispositivos cargados todo el día.",
      price: 80,
      img: "../img/battery.gif"
    },
    {
      name: "Mouse",
      desc: "Mouse inalámbrico ergonómico, ideal para trabajo o gaming.",
      price: 60,
      img: "../img/mouse.gif"
    }
  ],
  "Electrodomésticos": [
    {
      name: "Televisión Plana",
      desc: "Pantalla LED de alta definición, ideal para disfrutar tus películas y series favoritas.",
      price: 1200,
      img: "../img/tv.gif"
    },
    {
      name: "Horno Eléctrico",
      desc: "Ideal para hornear, asar y recalentar con precisión y eficiencia.",
      price: 600,
      img: "../img/camera.gif"
    }
  ],
  "Juegos": [
    {
      name: "PlayStation 0",
      desc: "La consola retro definitiva, revive la nostalgia con tecnología del futuro.",
      price: 500,
      img: "../img/play.gif"
    },
    {
      name: "Controles Inalámbricos",
      desc: "Perfectos para sesiones de juego largas, sin cables que te limiten.",
      price: 150,
      img: "../img/monopatin.gif"
    }
  ],
  "Música": [
    {
      name: "Tambor",
      desc: "Para acompañar tus ritmos favoritos, ideal para músicos y aficionados.",
      price: 200,
      img: "../img/tambor.gif"
    },
    {
      name: "Microfono",
      desc: "Micrófono de alta calidad, perfecto para grabaciones y presentaciones en vivo.",
      price: 150,
      img: "../img/microfono.gif"
    },
    {
      name: "Trompeta",
      desc: "Instrumento de viento de latón, ideal para bandas y orquestas.",
      price: 950,
      img: "../img/trompeta.gif"
    }
  ]
};

const filterButtons = document.querySelectorAll('.filter-btn');
const productList = document.querySelector('.product-list');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.textContent.trim();
    const items = products[category];

    productList.innerHTML = '';

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <div class="product-info">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <span class="toggle-text-btn" style="display:none;">Ver más</span>
          <div class="price">Bs.- ${item.price.toFixed(2)}</div>
        </div>
        <button class="buy-btn">Comprar</button>
      `;
      productList.appendChild(card);
    });

    activarVerMas();
  });
});

function activarVerMas() {
  document.querySelectorAll('.product-info').forEach(info => {
    const p = info.querySelector('p');
    const btn = info.querySelector('.toggle-text-btn');

    if (p.scrollHeight > p.clientHeight + 5) {
      btn.style.display = 'inline-block';
    }

    btn.addEventListener('click', () => {
      const card = info.closest('.product-card');
      info.classList.toggle('expanded');
      card.classList.toggle('expanded');
      btn.textContent = info.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
    });
  });
}

activarVerMas();

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('buy-btn')) {
    const card = e.target.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const desc = card.querySelector('p').textContent;
    const price = card.querySelector('.price').textContent;
    const img = card.querySelector('img').getAttribute('src');

    const selectedProduct = { name, desc, price, img };
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    window.location.href = 'index4.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  filterButtons.forEach(btn => btn.classList.remove('active'));

  const techBtn = Array.from(filterButtons).find(btn => btn.textContent.trim() === 'Tecnología');
  if (techBtn) techBtn.classList.add('active');

  const items = products["Tecnología"];
  productList.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="product-info">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <span class="toggle-text-btn" style="display:none;">Ver más</span>
        <div class="price">Bs.- ${item.price.toFixed(2)}</div>
      </div>
      <button class="buy-btn">Comprar</button>
    `;
    productList.appendChild(card);
  });

  activarVerMas();
});
