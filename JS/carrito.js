// =========================================================================
// CARRITO DE COMPRAS - FUNCIONALIDAD COMPLETA
// =========================================================================

const carrito = [];

// Función para agregar producto al carrito
const agregarAlCarrito = (vehiculoId) => {
  const vehiculo = vehiculos.find((v) => v.ID == vehiculoId);

  if (vehiculo) {
    // Verificar si el vehículo ya está en el carrito
    const existeEnCarrito = carrito.find((item) => item.ID === vehiculo.ID);

    if (!existeEnCarrito) {
      carrito.push({ ...vehiculo, cantidad: 1 });
      actualizarIndicadorCarrito();
      mostrarNotificacion(
        `${vehiculo.Modelo} ${vehiculo.Version} agregado al carrito`
      );
    } else {
      mostrarNotificacion(
        `${vehiculo.Modelo} ${vehiculo.Version} ya está en el carrito`
      );
    }
  }
};

// Función para eliminar producto del carrito
const eliminarDelCarrito = (vehiculoId) => {
  const index = carrito.findIndex((item) => item.ID === vehiculoId);
  if (index !== -1) {
    const vehiculoEliminado = carrito[index];
    carrito.splice(index, 1);
    actualizarIndicadorCarrito();
    actualizarContenidoCarrito();
    mostrarNotificacion(
      `${vehiculoEliminado.Modelo} ${vehiculoEliminado.Version} eliminado del carrito`
    );
  }
};

// Función para actualizar el indicador visual del carrito
const actualizarIndicadorCarrito = () => {
  const carritoBtn = document.querySelector(".carrito");
  let badge = carritoBtn.querySelector(".badge");

  if (carrito.length > 0) {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "position-absolute badge rounded-pill bg-danger";
      badge.style.cssText = `
        font-size: 0.7rem;
        top: -8px;
        right: -8px;
        min-width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      carritoBtn.appendChild(badge);
    }
    badge.textContent = carrito.length;
  } else {
    if (badge) {
      badge.remove();
    }
  }
};

// Función para mostrar notificaciones
const mostrarNotificacion = (mensaje) => {
  // Crear notificación
  const notificacion = document.createElement("div");
  notificacion.className =
    "alert alert-success alert-dismissible fade show position-fixed";
  notificacion.style.cssText = `
    top: 100px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    animation: slideInRight 0.3s ease-out;
  `;

  notificacion.innerHTML = `
    <i class="bi bi-check-circle me-2"></i>
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.appendChild(notificacion);

  // Auto-eliminar después de 3 segundos
  setTimeout(() => {
    if (notificacion.parentNode) {
      notificacion.remove();
    }
  }, 3000);
};

// Función para crear el menú desplegable del carrito
const crearMenuCarrito = () => {
  const menuCarrito = document.createElement("div");
  menuCarrito.id = "menu-carrito";
  menuCarrito.className = "position-absolute";
  menuCarrito.style.cssText = `
    min-width: 380px;
    max-height: 450px;
    overflow-y: auto;
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: none;
    top: 100%;
    right: 0;
    z-index: 1050;
    margin-top: 10px;
  `;

  return menuCarrito;
};

// Función para actualizar el contenido del carrito
const actualizarContenidoCarrito = () => {
  let menuCarrito = document.getElementById("menu-carrito");

  if (carrito.length === 0) {
    menuCarrito.innerHTML = `
      <div class="p-4 text-center text-muted">
        <i class="bi bi-cart-x fs-1 d-block mb-2"></i>
        <p class="mb-0">Tu carrito está vacío</p>
      </div>
    `;
    return;
  }

  const total = carrito.reduce((sum, item) => sum + item.Precio, 0);

  menuCarrito.innerHTML = `
    <div class="p-3 border-bottom bg-primary text-white" style="border-radius: 1rem 1rem 0 0;">
      <h6 class="mb-0 fw-bold">
        <i class="bi bi-cart-fill me-2"></i>
        Mi Carrito (${carrito.length} ${
    carrito.length === 1 ? "vehículo" : "vehículos"
  })
      </h6>
    </div>
    
    <div class="carrito-items" style="max-height: 280px; overflow-y: auto;">
      ${carrito
        .map(
          (item) => `
        <div class="carrito-item p-3 border-bottom">
          <div class="row g-2 align-items-center">
            <div class="col-3">
              <img src="${item.Img}" alt="${
            item.Modelo
          }" class="img-fluid rounded" style="height: 60px; width: 100%; object-fit: cover;">
            </div>
            <div class="col-6">
              <h6 class="mb-1 fw-bold" style="font-size: 0.9rem;">${
                item.Modelo
              } ${item.Version}</h6>
              <p class="mb-0 text-muted small">${item.Año} | ${item.Color}</p>
              <p class="mb-0 fw-bold text-primary">$${item.Precio.toLocaleString()}</p>
            </div>
            <div class="col-3 text-end">
              <button class="btn btn-outline-danger btn-sm" onclick="eliminarDelCarrito(${
                item.ID
              })" title="Eliminar">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
    
    <div class="p-3 bg-light" style="border-radius: 0 0 1rem 1rem;">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="fw-bold fs-6">Total:</span>
        <span class="fw-bold fs-5 text-primary">$${total.toLocaleString()}</span>
      </div>
      <div class="d-grid gap-2">
        <button class="btn btn-primary" onclick="procederReserva()">
          <i class="bi bi-calendar-check me-2"></i>
          Proceder con la Reserva
        </button>
        <button class="btn btn-outline-secondary" onclick="vaciarCarrito()">
          <i class="bi bi-trash me-2"></i>
          Vaciar Carrito
        </button>
      </div>
    </div>
  `;
};

// Función para vaciar el carrito
const vaciarCarrito = () => {
  if (carrito.length > 0) {
    carrito.length = 0; // Vacía el array
    actualizarIndicadorCarrito();
    actualizarContenidoCarrito();
    mostrarNotificacion("Carrito vaciado");
  }
};

// Función para proceder con la reserva
const procederReserva = () => {
  if (carrito.length > 0) {
    // Cerrar el menú del carrito
    document.getElementById("menu-carrito").style.display = "none";

    // Hacer scroll al formulario de contacto
    const contactoSection = document.getElementById("contacto");
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: "smooth" });
    }

    // Llenar automáticamente el campo de consulta
    setTimeout(() => {
      const consultaField = document.getElementById("consulta");
      if (consultaField) {
        const vehiculosReservados = carrito
          .map((item) => `${item.Modelo} ${item.Version}`)
          .join(", ");
        consultaField.value = `Hola, me interesa reservar los siguientes vehículos: ${vehiculosReservados}. Por favor, contáctenme para coordinar.`;
      }
    }, 500);

    mostrarNotificacion("Redirigiendo al formulario de contacto...");
  }
};

// Función para mostrar/ocultar el menú del carrito
const toggleMenuCarrito = (event) => {
  event.preventDefault();
  event.stopPropagation();

  let menuCarrito = document.getElementById("menu-carrito");
  const carritoBtn = document.querySelector(".carrito");

  if (!menuCarrito) {
    menuCarrito = crearMenuCarrito();
    // Asegurar que el contenedor del carrito tenga position relative
    carritoBtn.style.position = "relative";
    carritoBtn.appendChild(menuCarrito);
  }

  actualizarContenidoCarrito();

  // Toggle del menú
  if (menuCarrito.style.display === "block") {
    menuCarrito.style.display = "none";
  } else {
    menuCarrito.style.display = "block";
  }
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Event listener para los botones "Reservar"
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-reservar")) {
      e.preventDefault();
      const vehiculoId = parseInt(e.target.dataset.id);
      agregarAlCarrito(vehiculoId);
    }
  });

  // Event listener para el botón del carrito
  document.addEventListener("click", (e) => {
    if (e.target.closest(".carrito")) {
      toggleMenuCarrito(e);
    }
  });

  // Cerrar menú del carrito al hacer clic fuera
  document.addEventListener("click", (e) => {
    const menuCarrito = document.getElementById("menu-carrito");
    const carritoBtn = document.querySelector(".carrito");

    if (
      menuCarrito &&
      menuCarrito.style.display === "block" &&
      !carritoBtn.contains(e.target) &&
      !menuCarrito.contains(e.target)
    ) {
      menuCarrito.style.display = "none";
    }
  });

  // Cerrar menú del carrito al hacer scroll
  window.addEventListener("scroll", () => {
    const menuCarrito = document.getElementById("menu-carrito");
    if (menuCarrito && menuCarrito.style.display === "block") {
      menuCarrito.style.display = "none";
    }
  });
});

// CSS adicional para las animaciones y estilos mejorados
const estilosCarrito = document.createElement("style");
estilosCarrito.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .carrito-item:hover {
    background-color: #f8f9fa;
    transition: background-color 0.2s ease;
  }
  
  .carrito {
    position: relative !important;
  }
  
  .badge {
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  #menu-carrito {
    animation: fadeInDown 0.3s ease-out;
  }
  
  @keyframes fadeInDown {
    from { 
      opacity: 0; 
      transform: translateY(-15px);
    }
    to { 
      opacity: 1; 
      transform: translateY(0);
    }
  }
  
  /* Flecha indicadora del menú */
  #menu-carrito::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #0d6efd;
    z-index: 1051;
  }
  
  /* Media queries para responsive */
  @media (max-width: 768px) {
    #menu-carrito {
      min-width: 320px;
      right: -10px;
    }
    
    #menu-carrito::before {
      right: 30px;
    }
  }
  
  @media (max-width: 480px) {
    #menu-carrito {
      min-width: 280px;
      right: -20px;
    }
  }
  
  /* Scrollbar personalizada para el contenido del carrito */
  .carrito-items::-webkit-scrollbar {
    width: 6px;
  }
  
  .carrito-items::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  .carrito-items::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  .carrito-items::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

document.head.appendChild(estilosCarrito);
