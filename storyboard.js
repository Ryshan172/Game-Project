const cutscenes = [
    { img: './images/scenepack/scene1.png', 
        text: 'The boys look around for a petrol station...'
     },
    { img: './images/scenepack/scene1b.png', 
        text: 'A strange beast appears and they run...' 
    },
    { img: './images/scenepack/townmain.jpg', 
        text: 'Danger lurks everywhere in this strange town. They must find each other and a way out...' 
    }
];
let currentCutsceneIndex = 0;

export function showStory() {
    const cutsceneContainer = document.getElementById('story-container');
    const cutsceneImage = document.getElementById('story-image');
    const cutsceneText = document.getElementById('story-text');
    const nextCutsceneButton = document.getElementById('next-story-button');

    cutsceneImage.src = cutscenes[currentCutsceneIndex].img;
    cutsceneText.innerText = cutscenes[currentCutsceneIndex].text;
    cutsceneContainer.style.display = 'flex'; // Show the cutscene container

    nextCutsceneButton.onclick = () => {
        currentCutsceneIndex++;
        if (currentCutsceneIndex < cutscenes.length) {
            cutsceneImage.src = cutscenes[currentCutsceneIndex].img;
            cutsceneText.innerText = cutscenes[currentCutsceneIndex].text;
        } else {
            cutsceneContainer.style.display = 'none'; // Hide the cutscene container
            initGame(); // Start the game after the cutscenes
        }
    };
}

