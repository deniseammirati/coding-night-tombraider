// Elementi del DOM: app container, i video ecc...
const appContainerEl = document.querySelector("#app-container")
const videosEls = document.querySelectorAll("video")
const audioIconsEls = document.querySelectorAll(".volume")

// Variabili globali: è il volume attivo
const halfScreenHeight = window.innerHeight / 2
let isVolumeEnabled = false

// Eventi: allo scroll dell'app container, al click dell'icona del volume
appContainerEl.addEventListener("scroll", function() {
    // Per ogni video
    videosEls.forEach(function(video, index) {
        // Recupero le informazioni della posizione del video nella pagina
        const videoRect = video.getBoundingClientRect()
        // Determinare la distanza fra il bordo superiore del video e il bordo superiore del nostro schermo
        // console.log(videoRect.top)
        // SE il bordo superiore videoRect.top del video su cui sto iterando è compreso fra 0 e il valore della metà dello schermo halfScreenHeight
        // faccio partire il video
        // ALTRIMENTI
        // lo metto in pausa
        if(videoRect.top >= 0 && videoRect.top <= halfScreenHeight) {
            video.currentTime = 0
            video.play()
        } else {
            video.pause()
        }
    })
})

// Per ogni icona dell'audio 
// al click
// Imposto l'audio di tutti i video allo stato attuale
// SE isVolumeEnabled è falso => true
// ALTRIMENTI il contrario
audioIconsEls.forEach(function(audioIcon) {
    audioIcon.addEventListener("click", function() {
        // Inverto il valore di isVolumeEnabled
        isVolumeEnabled = !isVolumeEnabled
        // Per ogni video cambio il valore dell'attributo muted
        videosEls.forEach(function(video) {
            if(isVolumeEnabled == true) {
                video.muted = false
            } else {
                video.muted = true
            }
        })

        // Cambio l'icona dell'audio
        let iconClass = ""
        if(isVolumeEnabled == true) {
            iconClass = "fa-solid fa-volume-high volume"
        } else {
            iconClass = "fa-solid fa-volume-xmark volume"
        }
        audioIconsEls.forEach(function(audioIcon) {
            audioIcon.className = iconClass
        })
    })
})