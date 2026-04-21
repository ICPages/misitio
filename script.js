// Animación reveal on scroll
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
});

// CONTADOR ANIMADO
const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const updateCount = () => {
            const increment = target / 100;

            if (count < target) {
                count += increment;
                counter.innerText = "+" + Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = "+" + target;
            }
        };

        updateCount();
    });
};

// Detectar cuando entra en pantalla
let started = false;

window.addEventListener("scroll", () => {
    const section = document.querySelector('.counter');

    if (!started) {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            animateCounters();
            started = true;
        }
    }
});

let precioBase = 0;

// ABRIR MODAL
function openModal(el) {
    const name = el.getAttribute("data-name");
    const specs = el.getAttribute("data-specs").split("|");
    precioBase = parseFloat(el.getAttribute("data-price")) || 0;

    document.getElementById("modalTitle").innerText = name;
    document.getElementById("pcName").value = name;

    // Reset select
    document.getElementById("pago").value = "";

    // Reset precio
    actualizarPrecioModal();

    // Cargar specs con iconos
    const specsContainer = document.getElementById("modalSpecs");
    specsContainer.innerHTML = "";

    specs.forEach(spec => {
        const [icon, text] = spec.split(":");

        const p = document.createElement("p");
        p.innerHTML = `<i class="bi ${icon.trim()}"></i> ${text.trim()}`;

        specsContainer.appendChild(p);
    });

    document.getElementById("pcModal").classList.add("active");
}

// CERRAR MODAL
function closeModal() {
    document.getElementById("pcModal").classList.remove("active");
}

// CALCULAR PRECIO EN MODAL
function actualizarPrecioModal() {
    const metodo = document.getElementById("pago").value;
    const precioEl = document.getElementById("modalPrice");
    const notaEl = document.getElementById("modalNote");

    let precioFinal = precioBase;

    if (metodo === "mp") {
        const tasa = 0.0349 * 1.16;
        precioFinal = (precioBase + 4.64) / (1 - tasa);
        precioFinal = Math.ceil(precioFinal);

        notaEl.textContent = "Incluye comisión por método de pago.";
    } else if (metodo) {
        notaEl.textContent = "";
    } else {
        notaEl.textContent = "";
    }

    precioEl.textContent =
    "$" + precioFinal.toLocaleString() + " MXN";
}

// ENVIAR A WHATSAPP
function sendToWhatsApp(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const pago = document.getElementById("pago").value;
    const pc = document.getElementById("pcName").value;
    const precio = document.getElementById("modalPrice").textContent;

    const mensaje = `¡Hola *IC TecDigital*!, quiero comprar la PC: _${pc}_.%0A
Precio: ${precio}%0A
Nombre: ${nombre}%0A
Correo: ${correo}%0A
Método de pago: ${pago}.`;

    const url = `https://wa.me/522221106016?text=${mensaje}`;

    window.open(url, "_blank");
}