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
        class="navbar-toggler hamburger-custom"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon hamburger-icon"></span>
      </button>

      <!-- Enlaces -->
      <div class="collapse navbar-collapse justify-content-center navbar-collapse-custom" id="navbarNav">
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
  const hamburgerIcon = document.querySelector(".hamburger-icon");

  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
    navbar.classList.remove("navbar-transparent");
    logo.src = "./IMG/LOGO.png"; // Logo oscuro

    // Cambiar hamburguesa a color gris (original)
    if (hamburgerIcon) {
      hamburgerIcon.classList.add("hamburger-scrolled");
    }
  } else {
    navbar.classList.add("navbar-transparent");
    navbar.classList.remove("navbar-scrolled");
    logo.src = "./IMG/LOGO-white.png"; // Logo claro

    // Cambiar hamburguesa a color blanco
    if (hamburgerIcon) {
      hamburgerIcon.classList.remove("hamburger-scrolled");
    }
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

/* ========================================================================= */
/*  ESTILOS PERSONALIZADOS PARA NAVBAR Y HAMBURGUESA                        */
/* ========================================================================= */
const estilosNavbar = document.createElement("style");
estilosNavbar.textContent = `
  /* Estilos para el botón hamburguesa personalizado */
  .hamburger-custom {
    border: none !important;
    background: none !important;
    padding: 4px 8px;
    margin: 0;
  }
  
  .hamburger-custom:focus {
    box-shadow: none !important;
  }
  
  /* Ícono hamburguesa personalizado */
  .hamburger-icon {
    background-image: none !important;
    width: 24px;
    height: 18px;
    position: relative;
    transform: none !important;
  }
  
  .hamburger-icon::before,
  .hamburger-icon::after,
  .hamburger-icon {
    display: block;
    background-color: white;
    height: 2px;
    width: 24px;
    transition: all 0.3s ease;
  }
  
  .hamburger-icon::before,
  .hamburger-icon::after {
    content: '';
    position: absolute;
    left: 0;
  }
  
  .hamburger-icon::before {
    top: -6px;
  }
  
  .hamburger-icon::after {
    bottom: -6px;
  }
  
  /* Estado cuando se hace scroll - hamburguesa gris */
  .hamburger-scrolled,
  .hamburger-scrolled::before,
  .hamburger-scrolled::after {
    background-color: rgba(0, 0, 0, 0.55) !important;
  }
  
  /* Menú desplegable móvil del lado derecho */
  .navbar-collapse-custom {
    position: absolute;
    top: 100%;
    right: 0;
    left: auto !important;
    width: 280px;
    background: white;
    border-radius: 0 0 1rem 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-top: none;
    z-index: 1000;
    padding: 1rem;
    margin-top: 1px;
  }
  
  /* Flecha del menú desplegable */
  .navbar-collapse-custom::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
    z-index: 1001;
  }
  
  /* Estilos para los enlaces del menú móvil */
  @media (max-width: 991.98px) {
    .navbar-nav {
      padding: 0;
    }
    
    .navbar-nav .nav-link {
      color: #333 !important;
      padding: 0.75rem 0;
      border-bottom: 1px solid #eee;
      text-align: left;
      font-weight: 500;
    }
    
    .navbar-nav .nav-link:hover {
      color: #0d6efd !important;
      background-color: #f8f9fa;
      border-radius: 0.5rem;
      margin: 0 -0.5rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    
    .navbar-nav .nav-link.active {
      color: #0d6efd !important;
      font-weight: 600;
    }
    
    /* Dropdown en móvil */
    .dropdown-menu {
      position: static !important;
      float: none !important;
      width: 100% !important;
      margin-top: 0;
      background-color: #f8f9fa;
      border: none;
      border-radius: 0.5rem;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .dropdown-item {
      color: #666 !important;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }
    
    .dropdown-item:hover {
      background-color: #e9ecef;
      color: #0d6efd !important;
    }
  }
  
  /* Animación para el menú desplegable */
  .navbar-collapse {
    transition: all 0.3s ease;
  }
  
  .navbar-collapse.show {
    animation: slideDownFade 0.3s ease-out;
  }
  
  @keyframes slideDownFade {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Responsivo para pantallas muy pequeñas */
  @media (max-width: 480px) {
    .navbar-collapse-custom {
      width: calc(100vw - 40px);
      right: 20px;
    }
    
    .navbar-collapse-custom::before {
      right: 40px;
    }
  }
  
  /* Asegurar que el navbar tenga position relative para el dropdown */
  .navbar {
    position: relative;
  }
  
  /* Cerrar automáticamente el menú al hacer clic en un enlace */
  @media (max-width: 991.98px) {
    .nav-link:not(.dropdown-toggle) {
      cursor: pointer;
    }
  }
`;

document.head.appendChild(estilosNavbar);

/* ========================================================================= */
/*  FUNCIONALIDAD ADICIONAL PARA CERRAR MENÚ EN MÓVIL                       */
/* ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Cerrar menú móvil al hacer clic en un enlace (excepto dropdown)
  document
    .querySelectorAll(".nav-link:not(.dropdown-toggle)")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const navbarCollapse = document.getElementById("navbarNav");
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
      });
    });

  // Cerrar menú móvil al hacer clic fuera de él
  document.addEventListener("click", (e) => {
    const navbar = document.querySelector(".navbar");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.getElementById("navbarNav");

    if (
      !navbar.contains(e.target) &&
      navbarCollapse.classList.contains("show")
    ) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  });
});
