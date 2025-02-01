// Datos de los ruidos
const ruidos = [
    {
        nombre: "Roncus",
        tipo: "agregado",
        agregado: "continuo",
        fase: "inspiratoria",
        ubicacion: "central",
        archivo: "roncus.mp3"
    },
    {
        nombre: "Estridor",
        tipo: "agregado",
        agregado: "continuo",
        fase: "espiratoria",
        ubicacion: "central",
        archivo: "estridor.mp3"
    },
    {
        nombre: "Sibilancia",
        tipo: "agregado",
        agregado: "continuo",
        fase: "espiratoria",
        ubicacion: "central",
        archivo: "sibilancia.mp3"
    },
    {
        nombre: "Crepito fino",
        tipo: "agregado",
        agregado: "discontinuo",
        fase: "inspiratoria",
        ubicacion: "periferica",
        archivo: "crepito_fino.mp3"
    },
    {
        nombre: "Crepito grueso",
        tipo: "agregado",
        agregado: "discontinuo",
        fase: "espiratoria",
        ubicacion: "central",
        archivo: "crepito_grueso.mp3"
    },
    {
        nombre: "Frote pleural",
        tipo: "agregado",
        agregado: "discontinuo",
        fase: "ambas",
        ubicacion: "periferica",
        archivo: "frote_pleural.mp3"
    }
];

let indiceActual = 0;
let ruidoActual = ruidos[indiceActual];

// Elementos del DOM
const audioPlayer = document.getElementById('audio-player');
const tipoRuido = document.getElementById('tipo-ruido');
const tipoAgregado = document.getElementById('tipo-agregado');
const fase = document.getElementById('fase');
const ubicacion = document.getElementById('ubicacion');
const resultado = document.getElementById('resultado');
const btnRevisar = document.getElementById('revisar');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
const btnAleatorio = document.getElementById('aleatorio');

// Cargar el ruido actual
function cargarRuido() {
    audioPlayer.src = `./audios/${ruidoActual.archivo}`;
    audioPlayer.play();
    tipoRuido.value = "";
    tipoAgregado.value = "";
    fase.value = "";
    ubicacion.value = "";
    resultado.textContent = "";
}

// Verificar la respuesta
function verificarRespuesta() {
    const respuestas = {
        tipo: tipoRuido.value,
        agregado: tipoAgregado.value,
        fase: fase.value,
        ubicacion: ubicacion.value
    };

    const correcto = (
        respuestas.tipo === ruidoActual.tipo &&
        respuestas.agregado === ruidoActual.agregado &&
        respuestas.fase === ruidoActual.fase &&
        respuestas.ubicacion === ruidoActual.ubicacion
    );

    if (correcto) {
        resultado.textContent = "¡Correcto!";
        resultado.style.color = "#27ae60";
    } else {
        resultado.textContent = `Incorrecto. El ruido es: ${ruidoActual.nombre}.`;
        resultado.style.color = "#e74c3c";
    }
}

// Navegación
function avanzar() {
    indiceActual = (indiceActual + 1) % ruidos.length;
    ruidoActual = ruidos[indiceActual];
    cargarRuido();
}

function retroceder() {
    indiceActual = (indiceActual - 1 + ruidos.length) % ruidos.length;
    ruidoActual = ruidos[indiceActual];
    cargarRuido();
}

function aleatorio() {
    indiceActual = Math.floor(Math.random() * ruidos.length);
    ruidoActual = ruidos[indiceActual];
    cargarRuido();
}

// Eventos
btnRevisar.addEventListener('click', verificarRespuesta);
btnSiguiente.addEventListener('click', avanzar);
btnAnterior.addEventListener('click', retroceder);
btnAleatorio.addEventListener('click', aleatorio);

// Cargar el primer ruido al iniciar
cargarRuido();
