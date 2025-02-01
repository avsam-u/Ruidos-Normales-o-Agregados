document.getElementById('tipo-ruido').addEventListener('change', function() {
    const tipoRuido = this.value;
    const opcionesAgregado = document.getElementById('opciones-agregado');

    if (tipoRuido === 'agregado') {
        opcionesAgregado.style.display = 'block';
    } else {
        opcionesAgregado.style.display = 'none';
        document.getElementById('resultado').textContent = '';
        document.getElementById('audio-player').src = '';
    }
});

document.getElementById('tipo-agregado').addEventListener('change', function() {
    const tipoAgregado = this.value;
    const opcionesContinuo = document.getElementById('opciones-continuo');
    const opcionesDiscontinuo = document.getElementById('opciones-discontinuo');

    if (tipoAgregado === 'continuo') {
        opcionesContinuo.style.display = 'block';
        opcionesDiscontinuo.style.display = 'none';
    } else if (tipoAgregado === 'discontinuo') {
        opcionesContinuo.style.display = 'none';
        opcionesDiscontinuo.style.display = 'block';
    }
});

document.getElementById('continuo').addEventListener('change', function() {
    const ruido = this.value;
    const resultado = document.getElementById('resultado');
    const audioPlayer = document.getElementById('audio-player');

    let descripcion = '';
    let audioFile = '';

    switch (ruido) {
        case 'roncus':
            descripcion = 'Roncus: Fase inspiratoria, al final de la fase.';
            audioFile = 'roncus.mp3';
            break;
        case 'estridor':
            descripcion = 'Estridor: Se escucha sin fonendo, fase espiratoria.';
            audioFile = 'estridor.mp3';
            break;
        case 'sibilancia':
            descripcion = 'Sibilancia: Fase espiratoria, vía central, con la tos aumenta.';
            audioFile = 'sibilancia.mp3';
            break;
    }

    resultado.textContent = descripcion;
    audioPlayer.src = `audios/${audioFile}`;
    audioPlayer.play();
});

document.getElementById('discontinuo').addEventListener('change', function() {
    const ruido = this.value;
    const resultado = document.getElementById('resultado');
    const audioPlayer = document.getElementById('audio-player');

    let descripcion = '';
    let audioFile = '';

    switch (ruido) {
        case 'crepito_fino':
            descripcion = 'Crepito fino: Fase inspiratoria, al final de la fase.';
            audioFile = 'crepito_fino.mp3';
            break;
        case 'crepito_grueso':
            descripcion = 'Crepito grueso: Fase espiratoria, vía central, con la tos se pierde.';
            audioFile = 'crepito_grueso.mp3';
            break;
        case 'frote_pleural':
            descripcion = 'Frote pleural: Presente en ambas fases, vía periférica, no desaparece con la tos.';
            audioFile = 'frote_pleural.mp3';
            break;
    }

    resultado.textContent = descripcion;
    audioPlayer.src = `audios/${audioFile}`;
    audioPlayer.play();
});
