const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('capturedCanvas');
const messageElement = document.getElementById('message');
const submessageElement = document.getElementById('submessage');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const ctx = canvasElement.getContext('2d');

let model;
let emptyFrameStartTime = null;
let personFirstSeenTime = null;
let countdownTimer = null;
let isPhotoTaken = false;
let isAppStarted = false;
let lastMessageTime = 0;

// Custom MP3 Audio Object
// Change 'meme.mp3' to match your exact audio filename!
const customAudio = new Audio('meme.mp3');
customAudio.loop = true;
customAudio.volume = 0.5; // Set to true if you want the sound to loop continuously

// Function to play sound safely
function playCustomSound() {
    if (customAudio.paused) {
        customAudio.currentTime = 0; // Rewind to start
        customAudio.play().catch(e => console.log("Audio play blocked:", e));
    }
}

// Function to stop sound
function stopCustomSound() {
    customAudio.pause();
    customAudio.currentTime = 0;
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 0.8;
        window.speechSynthesis.speak(utterance);
    }
}

async function loadAIModel() {
    try {
        messageElement.innerText = "Loading AI model, please wait...";
        model = await cocoSsd.load();
        messageElement.innerText = "Click Start to begin.";
        startBtn.style.display = "inline-block";
    } catch (err) {
        console.error("Failed to load AI model:", err);
        messageElement.innerText = "Failed to load AI model. Check internet connection.";
    }
}

async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoElement.srcObject = stream;
        videoElement.addEventListener("loadeddata", () => {
            detectLoop();
        });
    } catch (error) {
        console.error("Error accessing webcam: ", error);
        messageElement.innerText = "Camera access denied. Please check permissions.";
    }
}

async function detectLoop() {
    if (isPhotoTaken || !isAppStarted) return;

    const predictions = await model.detect(videoElement);
    const personDetected = predictions.some(pred => pred.class === "person");
    const otherObjects = predictions.filter(pred => pred.class !== "person");

    const now = Date.now();

    if (personDetected) {
        emptyFrameStartTime = null;
        if (countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }

        if (!personFirstSeenTime) {
            personFirstSeenTime = now;
        }

        const durationInFrame = (now - personFirstSeenTime) / 1000;

        // Play custom sound & flash background after 5 seconds in frame
        if (durationInFrame > 5) {
            playCustomSound();
            document.body.style.backgroundColor = (Math.floor(now / 200) % 2 === 0) ? "#ff4757" : "#121212";
        }

        if (now - lastMessageTime > 3000) {
            let selectedMessage = "";

            if (otherObjects.length > 0) {
                const item = otherObjects[0].class;
                selectedMessage = `Nice try! That ${item} is not going to hide you.`;
            } else if (durationInFrame > 5) {
                selectedMessage = "SECURITY ALERT! Target refuses to leave!";
            } else {
                selectedMessage = "PLEASE LEAVE THE FRAME.";
            }

            messageElement.innerText = selectedMessage;
            messageElement.style.color = "#ff4757";
            speak(selectedMessage);

            lastMessageTime = now;
        }
    } else {
        // Frame is empty
        stopCustomSound();
        document.body.style.backgroundColor = "#121212";
        personFirstSeenTime = null;

        if (!emptyFrameStartTime) {
            emptyFrameStartTime = now;
            startCountdown();
        }
    }

    requestAnimationFrame(detectLoop);
}

function startCountdown() {
    let secondsLeft = 3;
    messageElement.innerText = "Frame is clear! Initiating capture...";
    messageElement.style.color = "#ffa500";
    submessageElement.innerText = `Taking photo in ${secondsLeft}...`;

    speak("Frame is clear. Taking photo.");

    countdownTimer = setInterval(() => {
        secondsLeft--;
        if (secondsLeft > 0) {
            submessageElement.innerText = `Taking photo in ${secondsLeft}...`;
        } else {
            clearInterval(countdownTimer);
            takePhoto();
        }
    }, 1000);
}

function takePhoto() {
    isPhotoTaken = true;
    stopCustomSound();
    document.body.style.backgroundColor = "#121212";

    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(videoElement, -640, 0, 640, 480);
    ctx.restore();

    canvasElement.style.display = "block";
    videoElement.style.display = "none";

    messageElement.innerText = "Congratulations! 🎉";
    messageElement.style.color = "#2ed573";
    submessageElement.innerText = "You photographed absolutely nothing.";
    
    speak("Congratulations. You photographed absolutely nothing.");

    resetBtn.style.display = "inline-block";
}

startBtn.addEventListener('click', () => {
    isAppStarted = true;
    startBtn.style.display = "none";
    startWebcam();
});

resetBtn.addEventListener('click', () => {
    isPhotoTaken = false;
    emptyFrameStartTime = null;
    personFirstSeenTime = null;
    stopCustomSound();
    document.body.style.backgroundColor = "#121212";
    canvasElement.style.display = "none";
    videoElement.style.display = "block";
    resetBtn.style.display = "none";
    submessageElement.innerText = "";
    detectLoop();
});

loadAIModel();