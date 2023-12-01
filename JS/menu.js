const tarjetitas = document.querySelector("#tarjetas");
let productos = [];
let productosEnCarrito = [];

const recolectarProductos = async () => {
    const respuesta = await fetch("/JSON/productos.json");
    const data = await respuesta.json();
    productos = data;
};

const crearTarjetita = (list = []) => {
    list.forEach((unProducto) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="tarjetita">
            <h3 >${unProducto.nombre}</h3>
            <img class="imagen-tienda" src="${unProducto.imagen}" alt="${unProducto.nombre}"> 
            <p class="prodcuto-precio">$${unProducto.precio}</p>
            <button class="btn boton-tienda" id="${unProducto.id}"> Añadir al carrito </button>
        </div> `
        tarjetitas.append(div);
    });

};
let productoEnCarrito = [];
const elegirProductos = () => {
    let anadirAlCarrito = tarjetitas.querySelectorAll(".boton-tienda");

    anadirAlCarrito.forEach((botones) => {
        botones.addEventListener("click", (e) => {
            Toastify({
                text: "Producto agregado al carrito",
                className: "info",
                style: {
                    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,88,9,1) 35%, rgba(255,175,0,0.8155637254901961) 96%)",
                }
            }).showToast();
            const productoId = botones.id;
            const elegirProducto = productos.find(producto => producto.id === productoId);

            let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
            const productoEnCarrito = carritoActual.find(prod => prod.id === productoId);


            if (productoEnCarrito) {
                productoEnCarrito.cantidad += 1;
                
            } else {
                carritoActual.push({ ...elegirProducto, cantidad: 1 });
            }

            
         
            localStorage.setItem("carrito", JSON.stringify(carritoActual))
        });

    });

}


const iniciarPagina = async () => {
    await recolectarProductos();
    crearTarjetita(productos)
    elegirProductos();


}

iniciarPagina();




