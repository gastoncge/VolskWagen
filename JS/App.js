/* ========================================================================= */
/*  BARRA DE NAVEGACIÓN DINÁMICA                                             */
/* ========================================================================= */
const barraNavegacion = () => {
  const navb = document.getElementById("barra");
  const nav = document.createElement("nav");

  nav.className =
    "navbar navbar-expand-lg navbar-custom navbar-transparent position-fixed w-100 top-0 z-3";

  nav.innerHTML = `
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand d-flex align-items-center gap-2" href="#">
        <img
          id="logo-vw"
          src="./IMG/LOGO-white.png"        
          alt="Volkswagen logo"
          height="28"
        />
        Volkswagen
      </a>

      <!-- Botón hamburguesa para móviles -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Enlaces -->
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <div class="navbar-nav">
          <a class="nav-link active" href="#">Inicio</a>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#producto-contenedor" role="button">
              Modelos
            </a>
            <ul class="dropdown-menu animate__animated animate__fadeIn">
              <li><a class="dropdown-item" href="#pickup"><i class="bi bi-truck me-2"></i>Pick-up</a></li>
              <li><a class="dropdown-item" href="#suv"><i class="bi bi-suitcase2 me-2"></i>SUV</a></li>
              <li><a class="dropdown-item" href="#sedan"><i class="bi bi-car-front me-2"></i>Sedan</a></li>
              <li><a class="dropdown-item" href="#hatchback"><i class="bi bi-lightning-charge me-2"></i>Hatchback</a></li>
            </ul>
          </li>

          <a class="nav-link" href="#">Mi Volskwagen</a>
          <a class="nav-link" href="#contacto">Contáctanos</a>
        </div>
      </div>

      <!-- Carrito -->
      <a href="#" class="btn position-relative carrito">
        <i class="bi bi-cart" style="font-size:1.6rem;"></i>
      </a>
    </div>
  `;
  navb.appendChild(nav);
};
barraNavegacion();

/* Cambia fondo/logo al hacer scroll --------------------------------------- */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const logo = document.getElementById("logo-vw");

  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
    navbar.classList.remove("navbar-transparent");
    logo.src = "./IMG/LOGO.png"; // Logo oscuro
  } else {
    navbar.classList.add("navbar-transparent");
    navbar.classList.remove("navbar-scrolled");
    logo.src = "./IMG/LOGO-white.png"; // Logo claro
  }
});

/* ========================================================================= */
/*  CARRUSEL: 3 SLIDES CON CTA                                               */
/* ========================================================================= */
const slide = () => {
  document.getElementById("carousel-container").innerHTML = `
    <div id="carouselVW"
         class="carousel slide carousel-fade"
         data-bs-ride="carousel" data-bs-interval="4000">
      
      <!-- Indicadores -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselVW" data-bs-slide-to="0" class="active" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselVW" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselVW" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <!-- Slides -->
      <div class="carousel-inner">
        <div class="carousel-item active position-relative">
          <img src="./IMG/1.jpg" class="d-block w-100" alt="VW attention">
          <div class="overlay"></div>
          <div class="carousel-caption bottom-right text-end">
            <h1 class="text-white">¿Tenés dudas? ¡Estamos para ayudarte!</h1>
            <a href="#contacto" class="btn btn-primary mt-2">Contáctanos ahora</a>
          </div>
        </div>

        <div class="carousel-item position-relative">
          <img src="./IMG/2.jpg" class="d-block w-100" alt="VW promos 2025">
          <div class="overlay"></div>
          <div class="carousel-caption bottom-right text-end">
            <h1 class="text-white">Conocé nuestras promociones exclusivas 2025</h1>
            <a href="#contacto" class="btn btn-outline-light mt-2">Quiero más info</a>
          </div>
        </div>

        <div class="carousel-item position-relative">
          <img src="./IMG/3.jpg" class="d-block w-100" alt="Reserva tu VW">
          <div class="overlay"></div>
          <div class="carousel-caption bottom-right text-end">
            <h1 class="text-white">¡Reservá tu Volkswagen hoy mismo!</h1>
            <a href="#contacto" class="btn btn-warning mt-2 text-dark">Iniciar reserva</a>
          </div>
        </div>
      </div>

      <!-- Flechas -->
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselVW" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselVW" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  `;

  const myCarousel = document.querySelector("#carouselVW");
  if (myCarousel) {
    new bootstrap.Carousel(myCarousel);
  }
};
slide();

/* ========================================================================= */
/*  CATÁLOGO DE VEHÍCULOS (cards)                                            */
/* ========================================================================= */
const pintarProductos = () => {
  const cont = document.getElementById("producto-contenedor");
  cont.className = "container mt-5";
  cont.dataset.aos = "fade-zoom-in";
  cont.dataset.aosDuration = "1000";

  cont.insertAdjacentHTML(
    "beforeend",
    `
      <div class="text-center mt-5 palabras">
        <h1>¡Bienvenido a Volkswagen!</h1>
        <p>Descubrí nuestros últimos modelos.</p>
      </div>
    `
  );

  const tipos = ["Pick-Up", "SUV", "Sedan", "Hatchback"];

  tipos.forEach((tipo) => {
    const titulo = document.createElement("h2");
    titulo.className = "mt-5";
    titulo.textContent = tipo;
    titulo.dataset.aos = "fade-up";
    titulo.dataset.aosDuration = "1500";
    titulo.id = tipo.toLowerCase().replace(/[\s\-]/g, "");

    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-3 g-4";
    row.dataset.aos = "fade-up";
    row.dataset.aosDuration = "1500";

    vehiculos
      .filter((v) => v.Tipo === tipo)
      .forEach((v) => {
        row.insertAdjacentHTML(
          "beforeend",
          `
          <div class="col">
            <div class="card h-100 shadow-sm">
              <img src="${v.Img}" class="card-img-top" alt="${
            v.Modelo
          }" style="height: 200px; object-fit: cover;">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${v.Modelo} ${v.Version}</h5>
                <p class="card-text fw-semibold text-primary fs-5">$${v.Precio.toLocaleString()}</p>
                <p class="card-text small text-body-secondary">
                  Año ${v.Año} | Color ${v.Color}
                </p>
                <button class="btn btn-outline-primary mt-auto btn-reservar" data-id="${
                  v.ID
                }">
                  <i class="bi bi-calendar-plus me-2"></i>Reservar
                </button>
              </div>
            </div>
          </div>
        `
        );
      });

    cont.append(titulo, row);
  });
};
pintarProductos();

/* ========================================================================= */
/*  FORMULARIO DE CONTACTO + FOOTER                                          */
/* ========================================================================= */
const renderFormularioYFooter = () => {
  document.getElementById("contacto").innerHTML = `
    <section id="formulario-contacto" class="bg-light py-5 mt-5">
      <div class="container">
        <h2 class="c1 text-center mb-4">Contacto</h2>
        <form id="form-contacto">
          <div class="c2 row">
            <div class="col-md-6 mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="nombre" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="apellido" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="apellido" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="telefono" class="form-label">Teléfono</label>
              <input type="tel" class="form-control" id="telefono" required>
            </div>
            <div class="col-12 mb-3">
              <label for="consulta" class="form-label">Motivo de la consulta</label>
              <textarea class="form-control" id="consulta" rows="4" placeholder="Escribí tu consulta aquí..." required></textarea>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="c3 btn btn-outline-primary">Enviar</button>
          </div>
        </form>
      </div>
    </section>

    <footer class="bg-dark text-white py-4">
      <div class="container text-center">
        <p class="mb-2">© 2025 Volkswagen. Todos los derechos reservados.</p>
        <p class="mb-0">
          <a href="https://www.facebook.com/volkswagenARG/" class="text-white me-3"><i class="bi bi-facebook"></i></a>
          <a href="https://www.facebook.com/volkswagenARG/" class="text-white me-3"><i class="bi bi-instagram"></i></a>
          <a href="https://www.tiktok.com/@vwargentina?lang=es" class="text-white" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M12.73 2v2.2c0 1.11.9 2.01 2.01 2.01h.42a4.62 4.62 0 0 0 2.44.71v2.35a6.92 6.92 0 0 1-2.44-.46v6.3c0 3.29-2.67 5.96-5.96 5.96S3.24 18.4 3.24 15.1s2.67-5.96 5.96-5.96c.31 0 .61.03.9.08v2.41a3.59 3.59 0 1 0 2.59 3.45V2h.04Z"/>
            </svg>
          </a>
        </p>
      </div>
    </footer>
  `;
};
renderFormularioYFooter();

// Scroll suave corregido
setTimeout(() => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top =
            target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });
}, 100);

// Formulario validación
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputNombre = document.getElementById("nombre");
      const inputApellido = document.getElementById("apellido");
      const inputEmail = document.getElementById("email");
      const inputTelefono = document.getElementById("telefono");
      const inputConsulta = document.getElementById("consulta");

      const nom = inputNombre.value.trim();
      const ape = inputApellido.value.trim();
      const ema = inputEmail.value.trim();
      const tel = inputTelefono.value.trim();
      const con = inputConsulta.value.trim();

      console.log({ nom, ape, ema, tel, con });

      // Aquí puedes agregar la lógica para enviar el formulario
      alert("¡Gracias por tu consulta! Te contactaremos pronto.");
      form.reset();
    });
  }
});
