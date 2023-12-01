const productosCarrito = document.getElementById("tarjetita-carrito");
const traerProductos = JSON.parse(localStorage.getItem("carrito")) || [];
if (traerProductos.length === 0) {
    const mensajeCarritoVacio = document.createElement("p");
    mensajeCarritoVacio.className = "carrito-vacio";
    mensajeCarritoVacio.textContent = "El carrito está vacío";
    productosCarrito.appendChild(mensajeCarritoVacio);
} else {
    const tarjetaCompra = (list = []) => {
        let totalProducto = 0;
        list.forEach((unProducto) => {
            const precioDeProductos = unProducto.cantidad * unProducto.precio;

            actualizarTotal = () => {
                totalProducto = 0;
                document.querySelectorAll(".total-producto").forEach((producto) => {
                    totalProducto += parseFloat(producto.textContent.replace("$", ""));
                });
               
            };


            totalProducto += precioDeProductos;

            const div = document.createElement("div");
            div.id = `tarjeta-producto-${unProducto.id}`;
            div.innerHTML = `
        <div id="tarjeta-carrito" class="tarjetita-carrito">
         <img class="imagen-carrito" src="${unProducto.imagen}" alt="${unProducto.nombre}"> 
            <p> ${unProducto.cantidad}</p>
            <p class="prodcuto-precio">$${unProducto.precio}</p>
            <p class="total-producto">$${precioDeProductos}</p>
            <button data-id="${unProducto.id}" class="eliminar"> ❌ </button>
        </div> `;
            productosCarrito.append(div);

            const botonBorrar = div.querySelector(".eliminar");
            botonBorrar.addEventListener("click", (e) => {
                e.stopPropagation();
                const prodcutoId = e.target.getAttribute("data-id");
                const contenedorProducto = document.getElementById(`tarjeta-producto-${unProducto.id}`);
                if (contenedorProducto) {
                    
                    contenedorProducto.remove();
                    actualizarTotal();
                    let carrito = JSON.parse(localStorage.getItem("carrito"))||[];
                    carrito = carrito.filter((unProducto)=> unProducto.id !== prodcutoId);
                    localStorage.setItem("carrito", JSON.stringify(carrito))
                    
                }
            });


        });




        const divTotal = document.createElement("div");
        divTotal.innerHTML = `
    <div class="div-total">
        <p>Total:</p>
        
        <p class="precio-total">$${totalProducto} </p>
        <button id="finalizar" class="finalizar"> Finalizar compra </button>
        <button id="vaciar" class="finalizar"> Vaciar carrito </button>
    </div>
    `
        productosCarrito.append(divTotal);

        
        let botonVaciarCarrito = document.getElementById("vaciar");
        botonVaciarCarrito.addEventListener("click", (e) =>{
            Swal.fire({
                title: "Excelente",
                text: "Carrito vaciado",
                icon: "success"
            });
            productosCarrito.innerHTML = "";
            localStorage.removeItem("carrito")
        })


        let botonFinalizarCompra = document.getElementById("finalizar");
        botonFinalizarCompra.addEventListener("click", (e) => {
            Swal.fire({
                title: "Excelente",
                text: "Compra exitosa",
                icon: "success"
            });
            productosCarrito.innerHTML = "";
            localStorage.removeItem("carrito")
        });

    }


    const finDeCompra = async () => {
        await traerProductos;
        tarjetaCompra(traerProductos);
    }

    finDeCompra();


}
