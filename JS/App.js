/* ========================================================================= */
/*  BARRA DE NAVEGACIÓN DINÁMICA                                             */
/* ========================================================================= */
const barraNavegacion = () => {
  const navb = document.getElementById("barra"); // <div id="barra">
  const nav = document.createElement("nav");

  /*  Clases Bootstrap:
      - navbar          : barra base
      - navbar-expand-lg: se expande a partir de “lg”
      - navbar-custom   : nuestras transiciones (CSS)
      - navbar-transparent: arranca transparente
      - position-fixed w-100 top-0 z-3: se fija arriba                  */
  nav.className =
    "navbar navbar-expand-lg navbar-custom navbar-transparent position-fixed w-100 top-0 z-3";

  /*  Contenido: logo, enlaces y carrito.
      El botón “navbar-toggler” se agrega para móviles.                 */
  nav.innerHTML = `
    <div class="container-fluid">
      <!-- Logo -------------------------------------------------------- -->
      <a class="navbar-brand d-flex align-items-center gap-2" href="#">
        <img
          id="logo-vw"
          src="./IMG/LOGO-white.png"        
          alt="Volkswagen logo"
          height="28"
        />
        Volkswagen
      </a>

      <!-- Botón hamburguesa (solo visible < lg) ----------------------- -->
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

      <!-- Enlaces céntricos ------------------------------------------- -->
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <div class="navbar-nav">
          <a class="nav-link active" href="#">Inicio</a>
          <a class="nav-link" href="#producto-contenedor">Modelos</a>
          <a class="nav-link" href="#">Empleos</a>
          <a class="nav-link" href="#contacto">Contáctanos</a>
        </div>
      </div>

      <!-- Ícono del carrito ------------------------------------------- -->
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
      
      <!-- Indicadores -------------------------------------------------- -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselVW" data-bs-slide-to="0"
                class="active" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselVW" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselVW" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
      </div>

      <!-- Slides ------------------------------------------------------- -->
      <div class="carousel-inner">
        <!-- ••• SLIDE 1 ••• -->
        <div class="carousel-item active position-relative">
          <img src="./IMG/1.jpg" class="d-block w-100" alt="VW attention">
          <div class="overlay"></div>
          <div class="carousel-caption bottom-right text-end">
            <h1 class="text-white">¿Tenés dudas? ¡Estamos para ayudarte!</h1>
            <a href="#contacto" class="btn btn-primary mt-2">Contáctanos ahora</a>
          </div>
        </div>

        <!-- ••• SLIDE 2 ••• (sin “active”) -->
        <div class="carousel-item position-relative">
          <img src="./IMG/2.jpg" class="d-block w-100" alt="VW promos 2025">
          <div class="overlay"></div>
          <div class="carousel-caption bottom-right text-end">
            <h1 class="text-white">Conocé nuestras promociones exclusivas 2025</h1>
            <a href="#contacto" class="btn btn-outline-light mt-2">Quiero más info</a>
          </div>
        </div>

        <!-- ••• SLIDE 3 ••• -->
        <div class="carousel-item position-relative">
          <img src="./IMG/3.jpg" class="d-block w-100" alt="Reserva tu VW">
          <div class="overlay"></div>
          <div class="carousel-caption bottom-right text-end">
            <h1 class="text-white">¡Reservá tu Volkswagen hoy mismo!</h1>
            <a href="#contacto" class="btn btn-warning mt-2 text-dark">Iniciar reserva</a>
          </div>
        </div>
      </div>

      <!-- Flechas ------------------------------------------------------- -->
      <button class="carousel-control-prev" type="button"
              data-bs-target="#carouselVW" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button"
              data-bs-target="#carouselVW" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  `;
};
slide();

/* ========================================================================= */
/*  CATÁLOGO DE VEHÍCULOS (cards)                                            */
/* ========================================================================= */
const pintarProductos = () => {
  /* Contenedor principal (Bootstrap) ---------------------------------- */
  const cont = document.getElementById("producto-contenedor");
  cont.className = "container mt-5";
  cont.dataset.aos = "fade-zoom-in";
  cont.dataset.aosDuration = "1000";

  /* Mensaje de bienvenida (solo una vez) ------------------------------ */
  cont.insertAdjacentHTML(
    "beforeend",
    `
      <div class="text-center mt-5 palabras">
        <h1>¡Bienvenido a Volkswagen!</h1>
        <p>Descubrí nuestros últimos modelos.</p>
      </div>
    `
  );

  /* Tipos de carrocería a mostrar ------------------------------------- */
  const tipos = ["Pick-Up", "SUV", "Sedan", "Hatchback"];

  tipos.forEach((tipo) => {
    /* Título de la sección */
    const titulo = document.createElement("h2");
    titulo.className = "mt-5";
    titulo.textContent = tipo;
    titulo.dataset.aos = "fade-up";
    titulo.dataset.aosDuration = "1500";

    /* Fila Bootstrap (cada card ocupa 4 col-12 en md) */
    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-3 g-4";
    row.dataset.aos = "fade-up";
    row.dataset.aosDuration = "1500";

    /* Filtramos el array "vehiculos" (viene de stock.js) -------------- */
    vehiculos
      .filter((v) => v.Tipo === tipo) // Solo los del tipo actual
      .forEach((v) => {
        /* Card individual ------------------------------------------- */
        row.insertAdjacentHTML(
          "beforeend",
          `
          <div class="col">
            <div class="card h-100">
              <img src="${v.Img}" class="card-img-top" alt="${v.Modelo}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${v.Modelo} ${v.Version}</h5>
                <p class="card-text fw-semibold">$ ${v.Precio}</p>
                <p class="card-text small text-body-secondary">
                  Año ${v.Año} | Color ${v.Color}
                </p>
                <a href="#" class="btn btn-outline-primary mt-auto">Reservar</a>
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
    <!-- =================== FORMULARIO =================== -->
    <section id="formulario-contacto" class="bg-light py-5">
      <div class="container">
        <h2 class="c1 text-center mb-4">Contacto</h2>
        <form>
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
          </div>
          <div class="text-center">
            <button type="submit" class="c3 btn btn-outline-primary">Enviar</button>
          </div>
        </form>
      </div>
    </section>

    <!-- ====================== FOOTER ===================== -->
    <footer class="bg-dark text-white py-4">
      <div class="container text-center">
        <p class="mb-2">© 2025 Volkswagen. Todos los derechos reservados.</p>
        <p class="mb-0">
          <a href="https://www.facebook.com/volkswagenARG/" class="text-white me-3"><i class="bi bi-facebook"></i></a>
          <a href="https://www.facebook.com/volkswagenARG/" class="text-white me-3"><i class="bi bi-instagram"></i></a>
          <a href="https://www.tiktok.com/@vwargentina?lang=es" class="text-white"><i class="bi bi-twitter-x"></i></a>
        </p>
      </div>
    </footer>
  `;
};
renderFormularioYFooter();
