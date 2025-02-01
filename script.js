document.getElementById('tipo-ruido').addEventListener('change', function() {
    const tipoRuido = this.value;
    const opcionesAgregado = document.getElementById('opciones-agregado');

    if (tipoRuido === 'agregado') {
        opcionesAgregado.style.display = 'block';
    } else {
        opcionesAgregado.style.display = 'none';
    }
});

document.getElementById('tipo-agregado').addEventListener('change', function() {
    const tipoAgregado = this.value;
    const resultado = document.getElementById('resultado');
    const audioPlayer = document.getElementById('audio-player');

    let audioFile = '';
    let descripcion = '';

    if (tipoAgregado === 'continuo') {
        descripcion = 'Roncus: Fase inspiratoria, al final de la fase.';
        audioFile = 'roncus.mp3';
    } else if (tipoAgregado === 'discontinuo') {
        descripcion = 'Crepito fino: Fase inspiratoria, al final de la fase.';
        audioFile = 'crepito-fino.mp3';
    }

    resultado.textContent = descripcion;
    audioPlayer.src = `audios/${audioFile}`;
    audioPlayer.play();
});
