// Page Elements
var video = document.getElementById('video');
var videoplayer = document.getElementById('videoplayer');
var container = document.getElementById('container');
var videoProgress = document.getElementById('progressBar');
var videoTime = document.getElementById('videoTime');
var videoOverlay = document.getElementById('videoOverlay');
var volumeBar = document.getElementById('volumeBar');
var currVolume = document.getElementById('volumeStatus');
var playScreen = document.getElementById('playScreen');
var pauseScreen = document.getElementById('pauseScreen');
var progressContainer = document.getElementById('progressContainer');
var progressBar = document.getElementById('progressBar');


// Variables
var tempVolume = 0;
var isFull = false;
var isPlaying = false;
var videoPosition = 0;
var isDblClick = false;
var pos1 = progressContainer.getBoundingClientRect();
var pos2 = progressBar.getBoundingClientRect();




// Buttons
var playBtn = document.getElementById('playPauseBtn');
var playIcon = document.getElementById('pauseplay');
var muteBtn = document.getElementById('muteBtn');
var fullBtn = document.getElementById('fullscreenBtn');

// Volume
var volumeBar = document.getElementById('volumeBar');


// Event Listeners

videoplayer.addEventListener("mouseover", showCtrl);
videoplayer.addEventListener("mouseout", hideCtrl);
video.addEventListener("click", togglePlayPause2);
video.addEventListener("timeupdate", toggleSeeker);
video.addEventListener("dblclick", toggleFullscreen);
volumeBar.addEventListener("mousemove", setVolume);
playBtn.addEventListener("click", togglePlayPause);
muteBtn.addEventListener("click", toggleMute);
fullBtn.addEventListener("click", toggleFullscreen);
progressContainer.addEventListener("mouseover", seek);
progressContainer.addEventListener("mouseout", seekStop);
progressContainer.addEventListener("mousedown", seeking);







// Functionality

window.onload = toggleSeeker;

function showCtrl() {
    videoOverlay.style.transform = "translateY(0px)";
}

function hideCtrl() {
    videoOverlay.style.transform = "translateY(40px)";
}

function setVolume() {
    video.volume = volumeBar.value;
    if (video.volume === 0) {
        currVolume.className = "fas fa-volume-mute";
    } else if (video.volume < 0.50) {
        currVolume.className = "fas fa-volume-down";
    } else if (video.volume > 0.50) {
        currVolume.className = "fas fa-volume-up"
    }
    console.log("video volume: " + video.volume);
}

function togglePlayPause() {
    if (video.paused) {
        playIcon.className = "fas fa-pause";
        video.play();
        isPlaying = true;
        playScreen.style.visibility = "visible";
        playScreen.style.opacity = 0;
        disablePlay();
        setTimeout(function () {
            playScreen.style.visibility = "hidden";
            setTimeout(function () {
                playScreen.style.opacity = 1;
            }, 500);
        }, 1000);
        console.log(pos1);
        console.log(videoProgress.style.width);
    }
    else {
        playIcon.className = "fas fa-play";
        video.pause();
        isPlaying = false;
        pauseScreen.style.visibility = "visible";
        pauseScreen.style.opacity = 0;
        disablePlay();
        setTimeout(function () {
            pauseScreen.style.visibility = "hidden";
            setTimeout(function () {
                pauseScreen.style.opacity = 1;
            }, 500);
        }, 1000);
    }
}

function disablePlay() {
    playBtn.removeEventListener("click", togglePlayPause);
    setTimeout(function () {
        playBtn.addEventListener("click", togglePlayPause);
    }, 1000);
}

function togglePlayPause2() {

    setTimeout(function () {
        if (isDblClick === false) {
            if (isPlaying === false) {
                playIcon.className = "fas fa-pause";
                video.play();
                isPlaying = true;
                playScreen.style.visibility = "visible";
                playScreen.style.opacity = 0;
                setTimeout(function () {
                    playScreen.style.visibility = "hidden";
                    setTimeout(function () {
                        playScreen.style.opacity = 1;
                    }, 500);
                }, 1000);
            }
            else if (isPlaying === true) {
                playIcon.className = "fas fa-play";
                video.pause();
                isPlaying = false;
                pauseScreen.style.visibility = "visible";
                pauseScreen.style.opacity = 0;
                setTimeout(function () {
                    pauseScreen.style.visibility = "hidden";
                    setTimeout(function () {
                        pauseScreen.style.opacity = 1;
                    }, 500);
                }, 1000);
            }
        }
    }, 400);
}

function toggleMute() {
    if (video.volume !== 0) {
        tempVolume = video.volume;
        volumeBar.value = 0;
        video.volume = 0;
    } else {
        video.volume = tempVolume;
        volumeBar.value = tempVolume;
    }
}

function toggleSeeker() {
    var videoCurrentTime = new Date(video.currentTime * 1000).toISOString().substr(14, 5);
    var videoCurrentDuration = new Date(video.duration * 1000).toISOString().substr(14, 5);


    videoPosition = video.currentTime / video.duration;
    videoProgress.style.width = videoPosition * 100 + "%";
    videoTime.innerHTML = videoCurrentTime + " / " + videoCurrentDuration;
}

function toggleFullscreen() {
    isDblClick = true;
    if (isFull === false) {
        container.style.width = "100%";
        container.style.height = "100%";
        isFull = true;
        fullBtn.className = "fas fa-compress";
        setTimeout(function () {
            isDblClick = false;
        }, 500);
    } else if (isFull === true) {
        container.style.width = "50%";
        container.style.height = "50%";
        isFull = false;
        fullBtn.className = "fas fa-expand";
        setTimeout(function () {
            isDblClick = false;
        }, 500);
    }
}

function seek() {
    progressContainer.style.height = "10px";
    videoOverlay.style.height = "50px";
    console.log("seeking");
}

function seekStop() {
    progressContainer.style.height = "5px";
    videoOverlay.style.height = "45px";
    console.log("seeking");
}


function seeking(e) {
    var xPos = e.clientX;
    var oldTime = progressContainer.clientWidth
    var newTime = xPos / oldTime


    video.currentTime = video.duration * newTime;

    console.log(progressContainer.clientWidth);
    console.log(xPos);
    console.log(video.currentTime);
    console.log(video.duration);
    console.log(newTime);
}

if (video.currentTime === video.duration) {
    video.currentTime = 0;
    video.pause;
}