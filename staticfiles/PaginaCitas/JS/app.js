console.log("App.js Ok");

// Step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

console.log("Elementos de navegación:", { nextDom, prevDom });

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

console.log("Elementos del carrusel:", { carouselDom, SliderDom, thumbnailBorderDom, thumbnailItemsDom, timeDom });

if (thumbnailBorderDom) {
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
}

let timeRunning = 3000;
let timeAutoNext = 7000;

// Agrega eventos de click y verifica su funcionamiento
if (nextDom) {
    nextDom.onclick = function () {
        console.log("Botón 'next' fue clickeado");
        showSlider('next');
    };
}

if (prevDom) {
    prevDom.onclick = function () {
        console.log("Botón 'prev' fue clickeado");
        showSlider('prev');
    };
}

let runTimeOut;
let runNextAuto;

// Reestablece el temporizador para el auto-next
function resetAutoNext() {
    console.log("Reestableciendo auto-next");
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        console.log("Auto-next activado");
        if (nextDom) {
            nextDom.click();
        }
    }, timeAutoNext);
}

// Función para mostrar el carrusel según el tipo
function showSlider(type) {
    console.log("Mostrando slider:", type);

    let SliderItemsDom = SliderDom.querySelectorAll('.item');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

    if (type === 'next') {
        console.log("Añadiendo al final del slider");
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        console.log("Añadiendo al inicio del slider");
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    // Limpiar temporizador para remoción de clase de transición
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        console.log("Removiendo clases de transición");
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    // Reestablecer el temporizador de auto-next
    resetAutoNext();
}

// Evento para cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente cargado");

    // Obtener todos los enlaces de navegación y agregar eventos
    const links = document.querySelectorAll(".nav-link");

    console.log("Enlaces de navegación encontrados:", links);

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            console.log("Enlace clickeado:", this);

            // Remover 'active' de otros enlaces
            links.forEach(function (otherLink) {
                otherLink.classList.remove("active");
            });

            // Agregar 'active' al enlace actual
            this.classList.add("active");
        });
    });

    // Iniciar el temporizador para auto-next
    resetAutoNext();
});
