let heroName = "";

// Universally relatable multi-section story stages
const storyStages = [
    {
        title: "The First Monday Morning",
        emoji: "⏰ 🛏️",
        text: "It's 8:00 AM. For the first time in years, your alarm goes off and you realize you don't have to sprint to a lecture or exam. What is your very first move?",
        options: [
            { text: "Turn off the alarm, pull the covers over your head, and sleep till noon 🛏️", next: 1 },
            { text: "Jump out of bed to celebrate with a big breakfast and zero schedule 🥞", next: 1 }
        ]
    },
    {
        title: "Entering the Real World",
        emoji: "🗺️ 📋",
        text: "You open your phone and realize 'adulting' is officially here. Family and friends are asking what's next. How do you respond?",
        options: [
            { text: "Send out applications and tackle official paperwork head-on 📄", next: 2 },
            { text: "Tell everyone you're taking a well-deserved break to breathe first 🌴", next: 2 }
        ]
    },
    {
        title: "A Few Months In",
        emoji: "🍕 🎶",
        text: "You're navigating life after school, juggling new routines, catching up with friends, and handling unexpected curveballs. How do you spend your weekend?",
        options: [
            { text: "Go out with close friends for food, selfies, and endless laughter 📸", next: 3 },
            { text: "Plan a spontaneous road trip or outdoor adventure to clear your head 🌲", next: 3 }
        ]
    },
    {
        title: "The Plot Twist",
        emoji: "✨ 💖",
        text: "Plot twist, {{name}}: It never mattered which path you picked or how fast you figured it out. Real life has no strict syllabus, and you are writing your own unique story.",
        options: [
            { text: "🎉 Claim Your Graduation Finale!", next: "celebrate" }
        ]
    }
];

function submitName() {
    const inputField = document.getElementById("name-input");
    if (inputField.value.trim() !== "") {
        heroName = inputField.value.trim();
    } else {
        heroName = "Graduate";
    }

    // Load the first stage of the adventure
    loadStage(0);
}

function loadStage(index) {
    const mainTitle = document.getElementById("main-title");
    const scenarioText = document.getElementById("scenario-text");
    const cardEmoji = document.getElementById("card-emoji");
    const nameSection = document.getElementById("name-section");
    const btnGroup = document.getElementById("btn-group");

    // Hide input box once the game has started
    nameSection.style.display = "none";
    btnGroup.style.display = "flex";

    if (index === "celebrate") {
        showCelebration();
        return;
    }

    const currentStage = storyStages[index];
    
    // Replace placeholder name dynamically in text
    let processedText = currentStage.text.replace("{{name}}", heroName);

    cardEmoji.textContent = currentStage.emoji;
    mainTitle.textContent = currentStage.title;
    scenarioText.textContent = processedText;

    // Clear old buttons and load choices for this stage
    btnGroup.innerHTML = "";
    currentStage.options.forEach(opt => {
        const button = document.createElement("button");
        button.className = "choice-btn";
        button.textContent = opt.text;
        button.onclick = () => loadStage(opt.next);
        btnGroup.appendChild(button);
    });
}

function showCelebration() {
    const card = document.getElementById("game-card");
    card.classList.add("celebrate-card");
    
    card.innerHTML = `
        <div class="emoji">🎓 🧢 👏 🎉</div>
        <h1>HURRAEE, ${heroName.toUpperCase()}!</h1>
        <p>✨ <strong>CONGRATULATIONS!</strong> ✨<br><br>Cap tossed, degree secured, and official bragging rights unlocked. You put in the late nights, passed the exams, and crossed the finish line. We are SO proud of you!</p>
        <button class="choice-btn primary-btn" onclick="location.reload()" style="text-align: center;">🔄 Play Adventure Again</button>
    `;
}