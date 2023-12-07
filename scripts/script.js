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
var eatImage = document.querySelector(".eat img"); // Add similar IDs in your HTML
var gameImage = document.querySelector(".game img"); // Add similar IDs in your HTML

// States
var states = {
    IDLE: 'idle', // Idle video
    TRANSITION: 'transition', // Transition video
    ANIMATION: 'animation' // The other videos
};

// Sets initial state
var currentState = states.IDLE;



// FUNCTIONS
// Adding event listeners to the buttons, works on click
danceButton.addEventListener("click", function () {
    playAnimation('./videos/dance.mp4', true);
});

eatButton.addEventListener("click", function () {
    playAnimation('./videos/eat.mp4', true);
});

gameButton.addEventListener("click", function () {
    // Randomly chooses between win.mp4 and loss.mp4, 50% chance
    var randomChance = Math.random();
    var gameSource = (randomChance < 0.5) ? './videos/win.mp4' : './videos/loss.mp4';
    playAnimation(gameSource, false);
});

// Image change on hover
addImageHover(danceButton, danceImage, './images/dancemove.gif');
addImageHover(eatButton, eatImage, './images/eatmove.gif');
addImageHover(gameButton, gameImage, './images/gamemove.gif');

// Function to play the animation video
function playAnimation(animationSource, loop) {
    // Set state to transition
    currentState = states.TRANSITION;

    // Play the transition first
    playVideo('./videos/transition.mp4', function () {
        // Set state to animation
        currentState = states.ANIMATION;

        // Play the animation
        playVideo(animationSource, function () {
            // Wait for 2 seconds before playing the transition video
            setTimeout(function () {
                playVideo('./videos/transition.mp4', function () {
                    // Set state back to idle after the transition video finishes
                    currentState = states.IDLE;
                    playVideo('./videos/idle.mp4', true);
                });
            }, 2000);
        });
    });
}

// Function to play the video and execute a callback when it's done
function playVideo(videoSource, callback) {
    source.src = videoSource;
    video.load();
    video.play();

    // Execute the callback function after the video finishes
    video.onended = function () {
        if (typeof callback === 'function') {
            callback();
        }
    };
}

// Function for the hovering
function addImageHover(button, imageElement, hoverImageSrc) {
    var originalSrc = imageElement.src;

    // Change the image source on mouseover
    button.addEventListener("mouseover", function () {
        imageElement.src = hoverImageSrc; 
    });

    // Restore the original image source on mouseout
    button.addEventListener("mouseout", function () {
        imageElement.src = originalSrc; 
    });
}
