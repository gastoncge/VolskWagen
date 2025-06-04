//TRABAJO N1

/* function calcultarTotal() {
  alert(
    "Bienvenido a Tienda Apple, tenemos estos productos para ofrecer: Iphone, MacBook, AirPods, SmartWatch."
  );

  let total = 0;
  let seguirComprando;

  do {
    let producto = prompt(
      "Ingresa el nombre del producto que quieras adquirir:"
    ).toLowerCase();
    let cantidad = parseInt(prompt("Ingresa la cantidad que desea llevar:"));

    let precio = 0;

    switch (producto) {
      case "iphone":
        precio = 2000;
        break;
      case "macbook":
        precio = 4000;
        break;
      case "airpods":
        precio = 800;
        break;
      case "apple watch":
        precio = 1000;
        break;

      default:
        alert("Producto no valido. Intente de nuevo.");
        continue;
    }

    total += precio * cantidad;
    seguirComprando = confirm("¿Quieres seguir comprando?");
  } while (seguirComprando);

  return total;
}

function calcularIva(total) {
  return total * 0.21;
}

let totalCompra = calcultarTotal();
let totalIva = calcularIva(totalCompra);
let precioFinal = totalIva + totalCompra;
alert(
  "El total de la compra sin IVA: " +
    totalCompra +
    ", pero con IVA, queda en: " +
    precioFinal
); */

// TRABAJO N2

/* class Producto {
  constructor(modelo, precio) {
    this.modelo = modelo;
    this.precio = precio;
    this.vendido = false;
  }

  sumarIva() {
    this.precio = this.precio * 1.21;
  }

  vender() {
    this.vendido = true;
  }
}

const producto1 = new Producto("iphone", 1200);
const producto2 = new Producto("macbook", 1800);
const producto3 = new Producto("smartwatch", 300);
const producto4 = new Producto("airpods", 200);

producto1.sumarIva();
producto2.sumarIva();
producto3.sumarIva();
producto4.sumarIva();

function calcularTotal() {
  alert(
    "Bienvenido a Tienda Apple, tenemos estos productos para ofrecer: iPhone, MacBook, AirPods, SmartWatch."
  );

  let total = 0;
  let seguirComprando = true;
  let productosComprados = [];

  while (seguirComprando) {
    let productos = prompt(
      "Ingresa el nombre del producto que quieras adquirir:"
    ).toLowerCase();
    let cantidad = parseInt(prompt("Ingresa la cantidad que desea llevar:"));

    let productoSeleccionado;

    switch (productos) {
      case "iphone":
        productoSeleccionado = producto1;
        break;
      case "macbook":
        productoSeleccionado = producto2;
        break;
      case "smartwatch":
        productoSeleccionado = producto3;
        break;
      case "airpods":
        productoSeleccionado = producto4;
        break;
      default:
        alert("Producto no válido. Intente de nuevo.");
        continue;
    }

    let confirmarCompra = confirm(
      `El precio del ${productoSeleccionado.modelo} con IVA es de $${productoSeleccionado.precio}.\nSi deseas realizar la compra, presiona ACEPTAR.`
    );

    if (confirmarCompra) {
      total += productoSeleccionado.precio * cantidad;
      productoSeleccionado.vender();
      productosComprados.push(productoSeleccionado.modelo);
    }

    seguirComprando = confirm("¿Quieres comprar otro producto?");
  }

  console.log("Productos vendidos:", productosComprados);
  alert(`El total de tu compra es: $${total}`);
  return total;
}

let totalCompra = calcularTotal();
 */

//TRABAJO N3

/* const carritoDeCompras = [];

const menorPrecio = () => {
  productos.sort((a, b) => a.precio - b.precio);
  productosOrdenados();
};

const mayorPrecio = () => {
  productos.sort((a, b) => b.precio - a.precio);
  productosOrdenados();
};

const productosOrdenados = () => {
  const listaOrdenada = productos.map(
    (producto) => "-" + producto.nombre + "  $" + producto.precio
  );
  alert("Lista de productos:\n\n" + listaOrdenada.join("\n"));
  procesoDeCompra(listaOrdenada);
};

const procesoDeCompra = (iniciarCompra) => {};

const iniciarCompra = () => {
  alert("Bienvenido a la tienda Apple");
  const productosBaratos = confirm(
    "¿Ordenar productos de menor a mayor precio? Toca en confirmar si así lo deseas."
  );
  if (productosBaratos) {
    menorPrecio();
  } else {
    mayorPrecio();
  }
};

iniciarCompra(); */

//TRABAJO N4
