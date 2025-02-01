// Datos de los ruidos
const ruidos = [
    {
        nombre: "Roncus",
        tipo: "agregado",
        agregado: "continuo",
        desapareceTos: "si",
        ubicacion: "central",
        archivo: "roncus.mp3"
    },
    {
        nombre: "Estridor",
        tipo: "agregado",
        agregado: "continuo",
        desapareceTos: "no",
        ubicacion: "central",
        archivo: "estridor.mp3"
    },
    {
        nombre: "Sibilancia",
        tipo: "agregado",
        agregado: "continuo",
        desapareceTos: "no",
        ubicacion: "central",
        archivo: "sibilancia.mp3"
    },
    {
        nombre: "Crepito fino",
        tipo: "agregado",
        agregado: "discontinuo",
        desapareceTos: "no",
        ubicacion: "periferica",
        archivo: "crepito_fino.mp3"
    },
    {
        nombre: "Crepito grueso",
        tipo: "agregado",
        agregado: "discontinuo",
        desapareceTos: "si",
        ubicacion: "central",
        archivo: "crepito_grueso.mp3"
    },
    {
        nombre: "Frote pleural",
        tipo: "agregado",
        agregado: "discontinuo",
        desapareceTos: "no",
        ubicacion: "periferica",
        archivo: "frote_pleural.mp3"
    }
];

let indiceActual = 0;
let ruidoActual = ruidos[indiceActual];
let faseActual = 1;

// Elementos del DOM
const audioPlayer = document.getElementById('audio-player');
const tipoRuido = document.getElementById('tipo-ruido');
const tipoAgregado = document.getElementById('tipo-agregado');
const desapareceTos = document.getElementById('desaparece-tos');
const ubicacion = document.getElementById('ubicacion');
const ruidoCorrecto = document.getElementById('ruido-correcto');
const resultado = document.getElementById('resultado');
const btnRevisar = document.getElementById('revisar');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
const btnAleatorio = document.getElementById('aleatorio');
const fases = document.querySelectorAll('.fase');

// Cargar el ruido actual
function cargarRuido() {
    audioPlayer.src = `./audios/${ruidoActual.archivo}`;
    audioPlayer.play();
    tipoRuido.value = "";
    tipoAgregado.value = "";
    desapareceTos.value = "";
    ubicacion.value = "";
    ruidoCorrecto.innerHTML = '<option value="">-- Selecciona --</option>';
    resultado.textContent = "";
    faseActual = 1;
    mostrarFase(faseActual);
}

// Mostrar la fase actual
function mostrarFase(fase) {
    fases.forEach((f, index) => {
        f.style.display = index + 1 === fase ? 'block' : 'none';
    });
    btnRevisar.style.display = fase === 5 ? 'block' : 'none';
}

// Avanzar a la siguiente fase
function avanzarFase() {
    if (faseActual < 5) {
        faseActual++;
        mostrarFase(faseActual);
    }
}

// Retroceder a la fase anterior
function retrocederFase() {
    if (faseActual > 1) {
        faseActual--;
        mostrarFase(faseActual);
    }
}

// Verificar la respuesta
function verificarRespuesta() {
    const respuestas = {
        tipo: tipoRuido.value,
        agregado: tipoAgregado.value,
        desapareceTos: desapareceTos.value,
        ubicacion: ubicacion.value,
        ruidoCorrecto: ruidoCorrecto.value
    };

    console.log("Respuestas del usuario:", respuestas);
    console.log("Ruido actual:", ruidoActual);

    const correcto = (
        respuestas.tipo === ruidoActual.tipo &&
        respuestas.agregado === ruidoActual.agregado &&
        respuestas.desapareceTos === ruidoActual.desapareceTos &&
        respuestas.ubicacion === ruidoActual.ubicacion &&
        respuestas.ruidoCorrecto === ruidoActual.nombre
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

// Llenar opciones de ruidos en la fase 5
function llenarOpcionesRuidos() {
    ruidoCorrecto.innerHTML = '<option value="">-- Selecciona --</option>';
    ruidos.forEach(ruido => {
        const option = document.createElement('option');
        option.value = ruido.nombre; // Asegúrate de que el valor sea el nombre del ruido
        option.textContent = ruido.nombre;
        ruidoCorrecto.appendChild(option);
    });
}

// Eventos
btnRevisar.addEventListener('click', verificarRespuesta);
btnSiguiente.addEventListener('click', avanzarFase);
btnAnterior.addEventListener('click', retrocederFase);
btnAleatorio.addEventListener('click', aleatorio);

// Cargar el primer ruido al iniciar
cargarRuido();
llenarOpcionesRuidos();
