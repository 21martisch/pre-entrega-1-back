const socket = io();

socket.on("productos", (data) => {
    renderProductos(data);
})

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");

    productos.forEach(item => {
        const card = document.createElement("div");

        card.innerHTML =
            `
            <p> ${item.id} </p>
            <p> ${item.title} </p>
            <p> ${item.price} </p>
            <button> Eliminar </button>
        `

        contenedorProductos.appendChild(card);

    })
}