// VARIABLES
// Video variables
var video = document.querySelector('video');
var source = document.querySelector('source');

// Button variables
var danceButton = document.querySelector(".dance");
var eatButton = document.querySelector(".eat");
var gameButton = document.querySelector(".game");

// Button image variables
var danceImage = document.querySelector(".dance img");
var eatImage = document.querySelector(".eat img");
var gameImage = document.querySelector(".game img");

// States
var states = {
    IDLE: 'idle',
    TRANSITION: 'transition',
    ANIMATION: 'animation'
};

// Sets initial state
var currentState = states.IDLE;



// FUNCTIONS
// Event listeners for buttons to play animations
danceButton.addEventListener("click", function () {
    playAnimation('./videos/dance.mp4', true);
});

eatButton.addEventListener("click", function () {
    playAnimation('./videos/eat.mp4', true);
});

gameButton.addEventListener("click", function () {
    var randomChance = Math.random();
    var gameSource = (randomChance < 0.5) ? './videos/win.mp4' : './videos/loss.mp4';
    playAnimation(gameSource, false);
});

// Hover effect on images
addImageHover(danceButton, danceImage, './images/dancemove.gif');
addImageHover(eatButton, eatImage, './images/eatmove.gif');
addImageHover(gameButton, gameImage, './images/gamemove.gif');

// Function to play transition video
function playAnimation(animationSource, loop) {
    currentState = states.TRANSITION;
    playVideo('./videos/transition.mp4', function () {
        currentState = states.ANIMATION;
        playVideo(animationSource, function () {
            setTimeout(function () {
                playVideo('./videos/transition.mp4', function () {
                    currentState = states.IDLE;
                    playVideo('./videos/idle.mp4', true);
                });
            }, 2000);
        });
    });
}

// Function to play video and execute a callback when done
function playVideo(videoSource, callback) {
    source.src = videoSource;
    video.load();
    video.play();

    video.onended = function () {
        if (typeof callback === 'function') {
            callback();
        }
    };
}

// Function for image hover effect
function addImageHover(button, imageElement, hoverImageSrc) {
    var originalSrc = imageElement.src;

    button.addEventListener("mouseover", function () {
        imageElement.src = hoverImageSrc; 
    });

    button.addEventListener("mouseout", function () {
        imageElement.src = originalSrc; 
    });
}
