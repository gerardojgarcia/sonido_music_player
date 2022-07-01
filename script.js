const wrapper = document.querySelector('.wrapper')
const musicImg = wrapper.querySelector('.img-area img')
const musicName = wrapper.querySelector('.song-details .name')
const musicArtist = wrapper.querySelector('.song-details')
const playPauseBtn = wrapper.querySelector('play-pause')
const prevBtn = wrapper.querySelector('#prev')
const mainAudio = wrapper.querySelector('#next')

const progressArea = wrapper.querySelector('.progress-area')
const progressBar = progressArea.querySelector('.progress')
const musicList = wrapper.querySelector('.music-list')
const moreMusicBtn = wrapper.querySelector('#more-music')
const closeMoreMusic = musicList.querySelector('#close')



/// Music Index

let musicIndex = Math.floor(Math.random() * allMusic.length) + 1
isMusicPaused = true


window.addEventListener("laod", () => {
    loadMusic(musicIndex)
    playingSong()

})

function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb -1].name
    musicArtist.innerText = allMusic[indexNumb -1].artist
    musicImg.src = `/images/${allMusic[indexNumb-1].src}.jpg}`
    mainAudio.src = `/Music/${allMusic[indexNumb -1].src}.mp3`

}



// Play musicName

function playMusic() {
    wrapper.classList.add('paused')
    playPauseBtn.querySelector('i').innerText = 'pause'
    mainAudio.play()
}


// Prev Music FUntion

function prevMusic()  {
    musicIndex--; 

    if (musicIndex < 1) {
        musicIndex = allMusic.length 
    } else {
        musicIndex = musicIndex
    }

    loadMusic(musicIndex)
    playMusic()
    playingSong()

}


// next music Function

function nextMusic() {
    musicIndex ++

    if(musicIndex > allMusic.length) {
        musicIndex  = 1
    } else {
        musicIndex = musicIndex
    }

    laodMusic(musicIndex)
    playMusic()
    playingSong()

}


// pause/play event

playPauseBtn.addEventListener('click', ()=> {
    const isMusicPlay = wrapper.classList.contains("paused")

    if(isMusicPlay == true) {
        pauseMusic()
    } else {
        playMusic()
        
    }

    playingSong()
    
})


// Prev butto even


prevBtn.addEventListener('click', () => {
    prevMusic()

})

nextBtn.addEventListener('click', () =>{
    nextMusic()

})

//progress bar


mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime 
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`

})


let musicCurrentTime = wrapper.querySelector('.curerent-time')
musicDuration = wrapper.querySelector('.max-duration')
mainAudio.addEventListener('loadeddata', ()=> {
    let mainAdDuration = mainAudio.duration
    let totalMin = Math.floor(mainAdDuration / 60)
    let totalSec = Math.floor(mainAdDuration % 60)
    if(totalSec < 10) {
        totalSec = `0${totalSec}`

    }

    musicDuration.innerText = `${totalMin}: ${totalSec}`

    //update playing song

let currentMin = Math.floor(currentTime / 60)
let currentSec = Math.floor(currentTime % 60)
if(currentSec < 10) {
    currentSec = `0${currentSec}`

}

musicCurrentTime.innerText = `${currentMin}:${currentSec}`

})

progressArea.addEventListener('click', (e) =>{
    let progressWidth = progressArea.clientWidth
    let clickedOffsetX = e.offsetX
    let songDuration = mainAudio.duration

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration
    playMusic()
    playingSong()

})

// loop shuffle

const repeatBtn = wrapper.querySelector('#repeat-plist')
repeatBtn.addEventListener('click', (e) =>{
    let getText = repeatBtn.innerText
    switch(getText) {
        case 'repeat':
            repeatBtn.innnerText = 'repeat_one'
            repeatBtn.setAttribute('title', "Song Looped")
            break
        case 'repeat_one':
            repeatBtn.innerText = 'shuffle'
            repeatBtn.setAttribute('title', 'playback shuffled') 
            break
        case 'shuffle':
            repeatBtn.innnerText = 'repeat'
            repeatBtn.setAttribute('title', "playlist looped")
            break
        


    }
    
})


///Song End


mainAudio.addEventListener('ended', () => {
    let getText = repeatBtn.innerText
    switch(getText) {
        case 'repeat':
            nextMusic()
        break

        case 'shuffle':
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1)

            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1)

            }while(musicIndex == randIndex)

            musicIndex = randIndex
            loadMusic(musicIndex)
            playMusic()
            playingSong()
            break

    }
    
})

// show more music


moreMusicBtn.addEventListener('click', () =>{
    moreMusicBtn.click()
})

const ulTag = wrapper.querySelector('ul')

for(let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}"
                    <div class="row">
                    <span> ${allMusic[i].name}</span>
                    <p>
                    `
     
}





 





