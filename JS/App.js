/* ========================================================================= */
/*  CONFIGURACIÓN CENTRALIZADA                                              */
/* ========================================================================= */
const CONFIG = {
  selectors: {
    navbar: ".navbar",
    navbarCollapse: "#navbarNav",
    logo: "#logo-vw",
    hamburgerIcon: ".hamburger-icon",
    carousel: "#carouselVW",
    contactForm: "#form-contacto",
  },
  images: {
    logoDark: "./IMG/LOGO.png",
    logoLight: "./IMG/LOGO-white.png",
  },
  navigation: {
    scrollOffset: 120,
    scrollThreshold: 50,
  },
  carousel: {
    interval: 4000,
    fade: true,
  },
  animations: {
    duration: 1000,
    delayIncrement: 200,
  },
};

/* ========================================================================= */
/*  UTILIDADES REUTILIZABLES                                                */
/* ========================================================================= */
const utils = {
  $(selector, context = document) {
    return context.querySelector(selector);
  },

  $$(selector, context = document) {
    return context.querySelectorAll(selector);
  },

  createElement(tag, attributes = {}, content = "") {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key === "innerHTML") {
        element.innerHTML = value;
      } else if (key.startsWith("data-")) {
        element.setAttribute(key, value);
      } else {
        element[key] = value;
      }
    });
    if (content) element.textContent = content;
    return element;
  },

  addEventListeners(element, events) {
    Object.entries(events).forEach(([event, handler]) => {
      element.addEventListener(event, handler);
    });
  },

  smoothScrollTo(target, offset = CONFIG.navigation.scrollOffset) {
    const element = typeof target === "string" ? utils.$(target) : target;
    if (!element) {
      console.warn(`Elemento no encontrado: ${target}`);
      return;
    }

    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top + window.pageYOffset;
    const finalPosition = elementTop - offset;

    console.log("Navegando a:", {
      target: typeof target === "string" ? target : element.tagName,
      elementTop,
      offset,
      finalPosition,
    });

    window.scrollTo({
      top: Math.max(0, finalPosition),
      behavior: "smooth",
    });
  },

  formatPrice(price) {
    return `$${price.toLocaleString()}`;
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};

/* ========================================================================= */
/*  GESTIÓN DE NAVEGACIÓN                                                   */
/* ========================================================================= */
const NavigationManager = {
  init() {
    this.createNavbar();
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupDropdowns();
  },

  createNavbar() {
    const navContainer = utils.$("#barra");
    if (!navContainer) return;

    const nav = utils.createElement("nav", {
      className:
        "navbar navbar-expand-lg navbar-custom navbar-transparent position-fixed w-100 top-0 z-3",
      innerHTML: this.getNavbarHTML(),
    });

    navContainer.appendChild(nav);
  },

  getNavbarHTML() {
    return `
      <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center gap-2" href="#">
          <img
            id="logo-vw"
            src="${CONFIG.images.logoLight}"        
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
          <span class="hamburger-icon"></span>
        </button>

        <!-- Enlaces -->
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" href="#">Inicio</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#producto-contenedor" 
                 id="modelosDropdown" role="button" data-bs-toggle="dropdown" 
                 aria-expanded="false">
                Modelos
              </a>
              <ul class="dropdown-menu" aria-labelledby="modelosDropdown">
                <li><a class="dropdown-item" href="#pickup">
                  <i class="bi bi-truck me-2"></i>Pick-up
                </a></li>
                <li><a class="dropdown-item" href="#suv">
                  <i class="bi bi-suitcase2 me-2"></i>SUV
                </a></li>
                <li><a class="dropdown-item" href="#sedan">
                  <i class="bi bi-car-front me-2"></i>Sedan
                </a></li>
                <li><a class="dropdown-item" href="#hatchback">
                  <i class="bi bi-lightning-charge me-2"></i>Hatchback
                </a></li>
              </ul>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">Mi Volkswagen</a>
            </li>
            
            <li class="nav-item">
              <a class="nav-link" href="#contacto">Contáctanos</a>
            </li>
          </ul>
        </div>

        <!-- Carrito -->
        <a href="#" class="btn position-relative carrito">
          <i class="bi bi-cart" style="font-size:1.6rem;"></i>
        </a>
      </div>
    `;
  },

  setupScrollEffect() {
    const debouncedScroll = utils.debounce(() => {
      const navbar = utils.$(CONFIG.selectors.navbar);
      const logo = utils.$(CONFIG.selectors.logo);
      const hamburgerIcon = utils.$(CONFIG.selectors.hamburgerIcon);

      if (!navbar || !logo) return;

      const isScrolled = window.scrollY > CONFIG.navigation.scrollThreshold;

      navbar.classList.toggle("navbar-scrolled", isScrolled);
      navbar.classList.toggle("navbar-transparent", !isScrolled);

      logo.src = isScrolled ? CONFIG.images.logoDark : CONFIG.images.logoLight;

      if (hamburgerIcon) {
        hamburgerIcon.classList.toggle("hamburger-scrolled", isScrolled);
      }
    }, 10);

    window.addEventListener("scroll", debouncedScroll);
  },

  setupMobileMenu() {
    // Cerrar menú al hacer clic en enlaces
    utils.$$(".nav-link:not(.dropdown-toggle)").forEach((link) => {
      link.addEventListener("click", this.closeMobileMenu);
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
      const navbar = utils.$(CONFIG.selectors.navbar);
      const navbarCollapse = utils.$(CONFIG.selectors.navbarCollapse);

      if (
        !navbar?.contains(e.target) &&
        navbarCollapse?.classList.contains("show")
      ) {
        this.closeMobileMenu();
      }
    });
  },

  closeMobileMenu() {
    const navbarCollapse = utils.$(CONFIG.selectors.navbarCollapse);
    if (navbarCollapse?.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  },

  setupDropdowns() {
    // Inicializar dropdowns de Bootstrap
    const dropdownElementList = [].slice.call(
      document.querySelectorAll(".dropdown-toggle")
    );
    dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });

    // Para escritorio: hover effect
    if (window.innerWidth >= 992) {
      const dropdowns = utils.$$(".dropdown");
      dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("mouseenter", function () {
          const dropdownToggle = this.querySelector(".dropdown-toggle");
          const dropdownMenu = this.querySelector(".dropdown-menu");
          if (dropdownToggle && dropdownMenu) {
            dropdownMenu.classList.add("show");
          }
        });

        dropdown.addEventListener("mouseleave", function () {
          const dropdownMenu = this.querySelector(".dropdown-menu");
          if (dropdownMenu) {
            dropdownMenu.classList.remove("show");
          }
        });
      });
    }
  },

  setupSmoothScroll() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute("href");
      console.log("Click en enlace:", href);

      if (href && href.length > 1) {
        e.preventDefault();
        e.stopPropagation();

        // Cerrar dropdown si está abierto
        const dropdown = link.closest(".dropdown");
        if (dropdown) {
          const dropdownToggle = dropdown.querySelector(
            '[data-bs-toggle="dropdown"]'
          );
          if (dropdownToggle) {
            const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
            if (bsDropdown) {
              bsDropdown.hide();
            }
          }
        }

        // Cerrar menú móvil si está abierto
        this.closeMobileMenu();

        // Scroll suave con delay para permitir que se cierren los menús
        setTimeout(() => {
          const target = utils.$(href);
          if (target) {
            utils.smoothScrollTo(target);
          } else {
            console.warn(`Elemento no encontrado para: ${href}`);
          }
        }, 100);
      }
    });
  },
};

/* ========================================================================= */
/*  GESTIÓN DE CARRUSEL                                                     */
/* ========================================================================= */
const CarouselManager = {
  slides: [
    {
      image: "./IMG/1.jpg",
      alt: "VW attention",
      title: "¿Tenés dudas? ¡Estamos para ayudarte!",
      buttonText: "Contáctanos ahora",
      buttonClass: "btn-primary",
      buttonHref: "#contacto",
    },
    {
      image: "./IMG/2.jpg",
      alt: "VW promos 2025",
      title: "Conocé nuestras promociones exclusivas 2025",
      buttonText: "Quiero más info",
      buttonClass: "btn-outline-light",
      buttonHref: "#contacto",
    },
    {
      image: "./IMG/3.jpg",
      alt: "Reserva tu VW",
      title: "¡Reservá tu Volkswagen hoy mismo!",
      buttonText: "Iniciar reserva",
      buttonClass: "btn-warning text-dark",
      buttonHref: "#contacto",
    },
  ],

  init() {
    this.createCarousel();
    this.setupCarouselButtons();
    this.initializeBootstrapCarousel();
  },

  createCarousel() {
    const container = utils.$("#carousel-container");
    if (!container) return;

    container.innerHTML = `
      <div id="carouselVW"
           class="carousel slide carousel-fade"
           data-bs-ride="carousel" data-bs-interval="${
             CONFIG.carousel.interval
           }">
        
        ${this.createIndicators()}
        ${this.createSlides()}
        ${this.createControls()}
      </div>
    `;
  },

  createIndicators() {
    const indicators = this.slides
      .map(
        (_, index) =>
          `<button type="button" data-bs-target="#carouselVW" data-bs-slide-to="${index}" 
               ${index === 0 ? 'class="active"' : ""} aria-label="Slide ${
            index + 1
          }"></button>`
      )
      .join("");

    return `<div class="carousel-indicators">${indicators}</div>`;
  },

  createSlides() {
    const slides = this.slides
      .map(
        (slide, index) => `
      <div class="carousel-item ${
        index === 0 ? "active" : ""
      } position-relative">
        <img src="${slide.image}" class="d-block w-100" alt="${slide.alt}">
        <div class="overlay"></div>
        <div class="carousel-caption bottom-right text-end">
          <h1 class="text-white">${slide.title}</h1>
          <a href="${slide.buttonHref}" class="btn ${
          slide.buttonClass
        } mt-2 carousel-btn">${slide.buttonText}</a>
        </div>
      </div>
    `
      )
      .join("");

    return `<div class="carousel-inner">${slides}</div>`;
  },

  createControls() {
    return `
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselVW" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselVW" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    `;
  },

  initializeBootstrapCarousel() {
    const carousel = utils.$(CONFIG.selectors.carousel);
    if (carousel && typeof bootstrap !== "undefined") {
      new bootstrap.Carousel(carousel);
    }
  },

  setupCarouselButtons() {
    document.addEventListener("click", (e) => {
      const button = e.target.closest(".carousel-btn");
      if (!button) return;

      const href = button.getAttribute("href");
      console.log("Click en botón del carrusel:", href);

      if (href && href.startsWith("#")) {
        e.preventDefault();
        e.stopPropagation();

        const target = utils.$(href);
        if (target) {
          console.log(`Navegando desde carrusel a: ${href}`);
          utils.smoothScrollTo(target);
        } else {
          console.warn(`Elemento no encontrado desde carrusel: ${href}`);
        }
      }
    });
  },
};

/* ========================================================================= */
/*  GESTIÓN DE CATÁLOGO DE PRODUCTOS                                        */
/* ========================================================================= */
const ProductCatalogManager = {
  vehicleTypes: ["Pick-Up", "SUV", "Sedan", "Hatchback"],

  init() {
    this.renderCatalog();
    this.setupReservationButtons();
  },

  renderCatalog() {
    const container = utils.$("#producto-contenedor");
    if (!container) return;

    container.className = "container mt-5";
    container.setAttribute("data-aos", "fade-zoom-in");
    container.setAttribute(
      "data-aos-duration",
      String(CONFIG.animations.duration)
    );

    // Header
    container.insertAdjacentHTML("beforeend", this.createHeader());

    // Vehicle sections
    this.vehicleTypes.forEach((type, index) => {
      container.appendChild(this.createVehicleSection(type, index));
    });
  },

  createHeader() {
    return `
      <div class="text-center mt-5 palabras">
        <h1>¡Bienvenido a Volkswagen!</h1>
        <p>Descubrí nuestros últimos modelos.</p>
      </div>
    `;
  },

  createVehicleSection(type, index) {
    const sectionId = type.toLowerCase().replace(/[\s\-]/g, "");
    const delay = index * CONFIG.animations.delayIncrement;

    const title = utils.createElement(
      "h2",
      {
        className: "mt-5 section-title",
        id: sectionId,
        "data-aos": "fade-up",
        "data-aos-duration": "1500",
        "data-aos-delay": String(delay),
      },
      type
    );

    const row = utils.createElement("div", {
      className: "row row-cols-1 row-cols-md-3 g-4",
      "data-aos": "fade-up",
      "data-aos-duration": "1500",
      "data-aos-delay": String(delay + 100),
    });

    // Filter and render vehicles (assuming vehiculos array exists)
    if (typeof vehiculos !== "undefined") {
      const filteredVehicles = vehiculos.filter((v) => v.Tipo === type);
      row.innerHTML = filteredVehicles
        .map((vehicle) => this.createVehicleCard(vehicle))
        .join("");
    }

    const fragment = document.createDocumentFragment();
    fragment.appendChild(title);
    fragment.appendChild(row);
    return fragment;
  },

  createVehicleCard(vehicle) {
    return `
      <div class="col">
        <div class="card h-100 shadow-sm">
          <img src="${vehicle.Img}" class="card-img-top" alt="${
      vehicle.Modelo
    }" 
               style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${vehicle.Modelo} ${vehicle.Version}</h5>
            <p class="card-text fw-semibold text-primary fs-5">${utils.formatPrice(
              vehicle.Precio
            )}</p>
            <p class="card-text small text-body-secondary">
              Año ${vehicle.Año} | Color ${vehicle.Color}
            </p>
            <button class="btn btn-outline-primary mt-auto btn-reservar" data-id="${
              vehicle.ID
            }">
              <i class="bi bi-calendar-plus me-2"></i>Reservar
            </button>
          </div>
        </div>
      </div>
    `;
  },

  setupReservationButtons() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-reservar")) {
        e.preventDefault();
        const vehicleId = e.target.getAttribute("data-id");
        this.handleReservation(vehicleId);
      }
    });
  },

  handleReservation(vehicleId) {
    const vehicleData = this.getVehicleById(vehicleId);
    if (vehicleData) {
      this.showReservationModal(vehicleData);
    } else {
      alert(`Iniciando proceso de reserva para el vehículo ID: ${vehicleId}`);
    }
  },

  getVehicleById(id) {
    if (typeof vehiculos !== "undefined") {
      return vehiculos.find((v) => v.ID == id);
    }
    return null;
  },

  showReservationModal(vehicle) {
    const modalHTML = `
      <div class="modal fade" id="reservationModal" tabindex="-1" aria-labelledby="reservationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="reservationModalLabel">Reservar ${
                vehicle.Modelo
              } ${vehicle.Version}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <img src="${vehicle.Img}" class="img-fluid rounded" alt="${
      vehicle.Modelo
    }">
                </div>
                <div class="col-md-6">
                  <h6>Detalles del Vehículo:</h6>
                  <p><strong>Modelo:</strong> ${vehicle.Modelo} ${
      vehicle.Version
    }</p>
                  <p><strong>Precio:</strong> ${utils.formatPrice(
                    vehicle.Precio
                  )}</p>
                  <p><strong>Año:</strong> ${vehicle.Año}</p>
                  <p><strong>Color:</strong> ${vehicle.Color}</p>
                  <hr>
                  <p class="text-muted">Para completar tu reserva, nos pondremos en contacto contigo.</p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" onclick="ContactManager.focusContactForm('${
                vehicle.Modelo
              } ${vehicle.Version}')">Contactar para Reservar</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Remover modal existente si existe
    const existingModal = utils.$("#reservationModal");
    if (existingModal) {
      existingModal.remove();
    }

    // Agregar modal al body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Mostrar modal
    const modal = new bootstrap.Modal(utils.$("#reservationModal"));
    modal.show();
  },
};

/* ========================================================================= */
/*  GESTIÓN DE FORMULARIO Y FOOTER                                          */
/* ========================================================================= */
const ContactManager = {
  init() {
    this.renderContactAndFooter();
    this.setupFormValidation();
  },

  renderContactAndFooter() {
    const container = utils.$("#contacto");
    if (!container) return;

    container.innerHTML = `
      ${this.createContactForm()}
      ${this.createFooter()}
    `;
  },

  createContactForm() {
    return `
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
                <textarea class="form-control" id="consulta" rows="4" 
                         placeholder="Escribí tu consulta aquí..." required></textarea>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="c3 btn btn-outline-primary">Enviar</button>
            </div>
          </form>
        </div>
      </section>
    `;
  },

  createFooter() {
    return `
      <footer class="bg-dark text-white py-4">
        <div class="container text-center">
          <p class="mb-2">© 2025 Volkswagen. Todos los derechos reservados.</p>
          <p class="mb-0">
            <a href="https://www.facebook.com/volkswagenARG/" class="text-white me-3">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="https://www.facebook.com/volkswagenARG/" class="text-white me-3">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@vwargentina?lang=es" class="text-white" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12.73 2v2.2c0 1.11.9 2.01 2.01 2.01h.42a4.62 4.62 0 0 0 2.44.71v2.35a6.92 6.92 0 0 1-2.44-.46v6.3c0 3.29-2.67 5.96-5.96 5.96S3.24 18.4 3.24 15.1s2.67-5.96 5.96-5.96c.31 0 .61.03.9.08v2.41a3.59 3.59 0 1 0 2.59 3.45V2h.04Z"/>
              </svg>
            </a>
          </p>
        </div>
      </footer>
    `;
  },

  setupFormValidation() {
    document.addEventListener("submit", (e) => {
      if (e.target && e.target.id === "form-contacto") {
        e.preventDefault();
        this.handleFormSubmission(e.target);
      }
    });
  },

  handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (this.validateFormData(data)) {
      console.log("Datos del formulario:", data);
      alert("¡Gracias por tu consulta! Te contactaremos pronto.");
      form.reset();
    }
  },

  focusContactForm(vehicleInfo = "") {
    const consultaField = utils.$("#consulta");
    if (consultaField && vehicleInfo) {
      consultaField.value = `Consulta sobre reserva de: ${vehicleInfo}`;
      consultaField.focus();
    }

    // Cerrar modal si existe
    const modal = utils.$("#reservationModal");
    if (modal) {
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    }

    // Scroll suave al formulario
    utils.smoothScrollTo("#contacto");
  },

  validateFormData(data) {
    return Object.values(data).every((value) => value.trim() !== "");
  },
};

/* ========================================================================= */
/*  INICIALIZACIÓN DE LA APLICACIÓN                                         */
/* ========================================================================= */
const App = {
  modules: [
    NavigationManager,
    CarouselManager,
    ProductCatalogManager,
    ContactManager,
  ],

  init() {
    if (!this.checkDependencies()) {
      console.warn("Algunas dependencias no están disponibles");
    }

    this.modules.forEach((module) => {
      try {
        module.init();
      } catch (error) {
        console.error(`Error inicializando módulo:`, error);
      }
    });

    this.setupGlobalEvents();
  },

  checkDependencies() {
    const dependencies = ["bootstrap"];
    return dependencies.every((dep) => typeof window[dep] !== "undefined");
  },

  setupGlobalEvents() {
    document.addEventListener(
      "error",
      (e) => {
        if (e.target.tagName === "IMG") {
          console.warn("Error cargando imagen:", e.target.src);
        }
      },
      true
    );

    window.addEventListener("load", () => {
      console.log("Aplicación cargada completamente");
    });
  },
};

/* ========================================================================= */
/*  INICIALIZACIÓN                                                          */
/* ========================================================================= */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => App.init());
} else {
  App.init();
}
