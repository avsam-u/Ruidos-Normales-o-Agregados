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

let indiceActual = Math.floor(Math.random() * ruidos.length); // Ruido aleatorio al inicio
let ruidoActual = ruidos[indiceActual];
let faseActual = 1;

// Elementos del DOM
const audioPlayer = document.getElementById('audio-player');
const tipoRuido = document.getElementById('tipo-ruido');
const tipoAgregado = document.getElementById('tipo-agregado');
const desapareceTos = document.getElementById('desaparece-tos');
const ubicacion = document.getElementById('ubicacion');
const ruidoCorrecto = document.getElementById('ruido-correcto');
const resultadoFinal = document.getElementById('resultado-final');
const btnRevisar = document.getElementById('revisar');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
const btnAleatorio = document.getElementById('aleatorio');
const fases = document.querySelectorAll('.fase');
const resultadosFase = document.querySelectorAll('.resultado-fase');

// Cargar el ruido actual
function cargarRuido() {
    audioPlayer.src = `./audios/${ruidoActual.archivo}`;
    audioPlayer.play();
    tipoRuido.value = "";
    tipoAgregado.value = "";
    desapareceTos.value = "";
    ubicacion.value = "";
    ruidoCorrecto.innerHTML = '<option value="">-- Selecciona --</option>';
    resultadosFase.forEach(resultado => resultado.textContent = "");
    resultadoFinal.textContent = "";
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

// Verificar la respuesta en la fase actual
function verificarFase() {
    let correcto = false;
    let mensaje = "";

    switch (faseActual) {
        case 1:
            correcto = tipoRuido.value === ruidoActual.tipo;
            mensaje = correcto ? "" : `Incorrecto. El ruido es ${ruidoActual.tipo}.`;
            break;
        case 2:
            correcto = tipoAgregado.value === ruidoActual.agregado;
            mensaje = correcto ? "" : `Incorrecto. El ruido es ${ruidoActual.agregado}.`;
            break;
        case 3:
            correcto = desapareceTos.value === ruidoActual.desapareceTos;
            if (correcto) {
                mensaje = ruidoActual.desapareceTos === "si" ? "Desapareció." : "No se modificó.";
            } else {
                mensaje = ruidoActual.desapareceTos === "si" ? "Desapareció." : "No se modificó.";
            }
            break;
        case 4:
            correcto = ubicacion.value === ruidoActual.ubicacion;
            mensaje = correcto ? "" : `Incorrecto. El ruido es en la vía ${ruidoActual.ubicacion}.`;
            break;
        case 5:
            correcto = ruidoCorrecto.value === ruidoActual.nombre;
            if (correcto) {
                mensaje = "¡Correcto!";
                mostrarResumen(); // Mostrar el resumen
            } else {
                mensaje = `Incorrecto. El ruido es ${ruidoActual.nombre}.`;
            }
            break;
    }

    resultadosFase[faseActual - 1].textContent = mensaje;
    resultadosFase[faseActual - 1].style.color = correcto ? "#27ae60" : "#e74c3c";

    return correcto;
}

// Avanzar a la siguiente fase
function avanzarFase() {
    if (verificarFase()) {
        if (faseActual < 5) {
            faseActual++;
            mostrarFase(faseActual);
        } else {
            resultadoFinal.textContent = "¡Felicidades! Has completado todas las fases correctamente.";
            resultadoFinal.style.color = "#27ae60";
        }
    }
}

// Retroceder a la fase anterior
function retrocederFase() {
    if (faseActual > 1) {
        faseActual--;
        mostrarFase(faseActual);
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
        option.value = ruido.nombre;
        option.textContent = ruido.nombre;
        ruidoCorrecto.appendChild(option);
    });
}

// Eventos
btnRevisar.addEventListener('click', avanzarFase);
btnSiguiente.addEventListener('click', avanzarFase);
btnAnterior.addEventListener('click', retrocederFase);
btnAleatorio.addEventListener('click', aleatorio);

// Cargar el primer ruido al iniciar
cargarRuido();
llenarOpcionesRuidos();
