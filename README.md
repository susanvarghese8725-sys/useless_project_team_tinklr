<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



#Please Leave🎯


## Basic Details
### Team Name: TINKLE


### Team Members
- Team Lead: Sreegadha S PAI - College of engineering, Adoor
- Member 2: Susan Varghese - College of engineering, Adoor

### Project Description
"Please Leave" is a hostile AI surveillance web application that actively yells at human intruders to get out of its sight. Once the room is completely empty, it takes a high-quality photograph of "absolutely nothing" and celebrates its triumph.

### The Problem (that doesn't exist)
Photographs are constantly ruined by humans getting in the frame, making it impossible to capture pure, unadulterated background space without someone standing in the way.

### The Solution (that nobody asked for)
An overly aggressive web application that uses computer vision to detect humans, berate them using text-to-speech warnings, trigger a flashing alarm siren if they stay too long, and automatically capture a snapshot the exact moment everyone leaves.

## Technical Details
### Technologies/Components Used
For Software:
- Languages used: HTML5, CSS3, JavaScript (ES6+)

- Frameworks used: None (Vanilla Web Stack)

- Libraries used: TensorFlow.js, COCO-SSD (Pre-trained Object Detection Model), Web Speech API (Browser Text-to-Speech), Web Audio API (Synthesized Alarm Siren)

- Tools used: Visual Studio Code, Live Server, GitHub, GitHub Pages

For Hardware:

- Laptop with built-in webcam

### Implementation
For Software:
# Installation
- Clone the repository:
    git clone https://github.com/susanvarghese8725-sys/please-leave.git
- Navigate into the project folder:
  cd please-leave

# Run
- Open index.html directly in Google Chrome / Microsoft Edge 
- OR use Visual Studio Code Live Server extension to launch local web server

### Project Documentation
For Software:

# Screenshots (Add at least 3)
- Screenshot1: https://github.com/susanvarghese8725-sys/useless_project_team_tinklr/blob/main/Screenshot1.jpeg

  A setup screen prompting the user with "Click Start to begin." to grant webcam access.
- Screenshot2:https://github.com/susanvarghese8725-sys/useless_project_team_tinklr/blob/main/Screenshot2.jpeg

   The camera detects the player in the frame, triggering the red warning: "SECURITY ALERT! Target refuses to leave!"
- Screenshot3:https://github.com/susanvarghese8725-sys/useless_project_team_tinklr/blob/main/Screenshot3.jpeg

  Success State: The player successfully ducks out of the camera view, prompting a Grand Theft Auto-style "mission passed!" overlay and the humorous message: "Congratulations! You photographed absolutely nothing."


# Diagrams
<img width="487" height="591" alt="Screenshot 2026-09-12 194705" src="https://github.com/user-attachments/assets/8dca037c-9bf6-46d5-bba4-7d9c1249ee12" />

This diagram illustrates the real-time execution flow of the app: webcam frames are continuously processed by TensorFlow.js and COCO-SSD to detect human presence, triggering voice warnings and a red-flashing audio siren if an intruder lingers, while automatically initiating a 3-second countdown to capture an empty-room snapshot the moment the frame is clear.

### Project Demo
https://github.com/susanvarghese8725-sys/useless_project_team_tinklr/blob/main/Demo.mp4

This demonstration shows the "Please Leave" web application detecting a person in the frame, triggering voice alerts and a red-flashing siren until the user steps out of view, after which it successfully counts down and takes a photo of an empty room.



## Team Contributions
- Sreegadha S PAI: Conceptualization, frontend HTML/CSS interface design, Web Audio API & sound effects integration.

- Susan Varghese: TensorFlow.js & COCO-SSD AI model integration, empty frame countdown logic, and GitHub deployment.

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)



