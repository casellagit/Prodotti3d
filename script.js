// Seleziona l'elemento model-viewer con l'id "animated"
const modelViewerAnimated = document.querySelector("model-viewer#animated");

// Inizializza la variabile per la texture video o immagine
let videoTexture = null;

// Controlla se il browser è Safari su iPhone/iPad
const isIOS = /iPhone|iPad/i.test(navigator.userAgent);

// Attende che il custom element 'model-viewer' sia definito
customElements.whenDefined('model-viewer').then(() => {
    if (isIOS) {
        // Usa una texture immagine APNG per Safari su iPhone/iPad
        videoTexture = modelViewerAnimated.createTexture("./fiamma.apng");
    } else {
        // Usa la texture video WebM per tutti gli altri browser
        videoTexture = modelViewerAnimated.createVideoTexture("./fiamma_trasparente.webm");
    }
});

// Aggiunge un listener per l'evento 'load' del model-viewer
modelViewerAnimated.addEventListener("load", async () => {
    // Trova il materiale chiamato "Fiamma" nel modello
    const material = modelViewerAnimated.model.materials.find(mat => mat.name === "Fiamma");
    if (!material) {
        console.error("Material 'Fiamma' not found!");
        return;
    }
    
    // Ottiene la texture di base del materiale
    const { baseColorTexture } = material.pbrMetallicRoughness;
    // Imposta la texture video o immagine come texture di base del materiale
    baseColorTexture.setTexture(videoTexture);
    
    // Imposta il modo alpha del materiale per supportare la trasparenza
    material.alphaMode = 'BLEND'; // Permette la gestione della trasparenza
    material.alphaCutoff = 0.5; // Imposta il cutoff alpha per gestire la trasparenza
});

// Aggiunge un listener per il pulsante "Rosso"
document.getElementById("red").addEventListener("click", () => changeColor("#800020"));
// Aggiunge un listener per il pulsante "Bianco"
document.getElementById("white").addEventListener("click", () => changeColor("#f3f1e9"));
// Aggiunge un listener per il pulsante "Nero"
document.getElementById("black").addEventListener("click", () => changeColor("#293133"));

// Funzione per cambiare il colore del materiale "Antracite #1"
function changeColor(color) {
    // Trova il materiale chiamato "Antracite #1" nel modello
    const material = modelViewerAnimated.model.materials.find(mat => mat.name === "Antracite #1");
    if (!material) {
        console.error("Material 'Antracite' not found!");
        return;
    }
    
    // Imposta il colore di base del materiale
    material.pbrMetallicRoughness.setBaseColorFactor(color);
}
