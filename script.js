const questions = [
    { question: "1. A heavy, prolonged attack of words.", options: ["A. Barage", "B. Barrage", "C. Barrega", "D. Baragge"], correct: "B. Barrage" },
    { question: "2. A fabric, sometimes brightly coloured, having stripes or bars in a checked or squared pattern.", options: ["A. Tattersall", "B. Terttasall", "C. Tatersall", "D. Tarttessal"], correct: "A. Tattersall" },
    { question: "3. A cultivated variety of cabbage bearing heads of green or purplish flower buds.", options: ["A. Brocoli", "B. Broccolli", "C. Brocolli", "D. Broccoli"], correct: "D. Broccoli" },
    { question: "4. To provide (information, advice, etc.) lavishly or over generously.", options: ["A. Ladle", "B. Laddle", "C. Laadle", "D. Ladlle"], correct: "A. Ladle" },
    { question: "5. Subject (milk, wine, or other products) to a process of partial sterilization.", options: ["A. Pasterize", "B. Pastuerize", "C. Pastorise", "D. Pasteurize"], correct: "D. Pasteurize" },
    { question: "6. A short fictional story; a short novel, typically light and romantic.", options: ["A. Novellette", "B. Novellete", "C. Novelette", "D. Novelletee"], correct: "C. Novelette" },
    { question: "7. An act or instance of saying or pleading in protest.", options: ["A. Remontranse", "B. Remonstrance", "C. Remmonstrance", "D. Remonsttranse"], correct: "B. Remonstrance" },
    { question: "8. Not conforming to conventional behaviour; bizarre or extravagant.", options: ["A. Outré", "B. Outreé", "C. Outtre", "D. Outrrè"], correct: "A. Outré" },
    { question: "9. A European police officer, especially one from France.", options: ["A. Gendam", "B. Gendarm", "C. Gendarme", "D. Gendame"], correct: "C. Gendarme" },
    { question: "10. Of ideas or statements so different that they cannot be made compatible.", options: ["A. Irreconciliable", "B. Irreconcilable", "C. Irreconcilliable", "D. Irreconcillable"], correct: "B. Irreconcilable" },
    { question: "11. A body of business people working together; a group of individuals, organizations or corporations making some joint effort. (Noun)", options: ["A. Sindycate", "B. Sindicate", "C. Syndicate", "D. Cyndycate"], correct: "C. Syndicate" },
    { question: "12. To make a strong impression on someone with something unexpected. (Verb)", options: ["A. Stupifying", "B. Stupefying", "C. Stupyfying", "D. Stupiffying"], correct: "B. Stupefying" },
    { question: "13. Tightly bound by morality convention or received opinion; strict or prudish. (Adj.)", options: ["A. Straitlaced", "B. Straightlaced", "C. Straightlased", "D. Straitlased"], correct: "A. Straitlaced" },
    { question: "14. Either of the pair of bones joining the breastbone to the shoulder blades. Also called clavicle. (Noun)", options: ["A. Collabone", "B. Colarbone", "C. Corllabone", "D. Collarbone"], correct: "D. Collarbone" },
    { question: "15. Fear of the number 13; extreme superstition regarding the number thirteen. (Noun)", options: ["A. Triskadekaphobia", "B. Triskaidekaphobia", "C. Triskadecophobia", "D. Triscaidekophobia"], correct: "B. Triskaidekaphobia" },
    { question: "16. The quality of having a friendly and good-natured manner.  (Noun)", options: ["A. Affabillity", "B. Affabbility", "C. Affability", "D. Afabbility"], correct: "C. Affability" },
    { question: "17. Abounding with or resembling fixed luminous points in the night sky. (Adjective)", options: ["A. Starey", "B. Stary", "C. Starry", "D. Staary"], correct: "C. Starry" },
    { question: "18. Ornamentation of fabric with needlework. (Noun)", options: ["A. Embrodery", "B. Embroidry", "C. Embroidery", "D. Enbroidery"], correct: "C. Embroidery" },
    { question: "19. A mythical serpent with a head at each end. (Noun)", options: ["A. Amphisbaena", "B. Amfisbina", "C. Amphisbeana", "D. Amphisbeanal"], correct: "A. Amphisbaena" },
    { question: "20. Consisting of or resembling dung or faeces. (Adjective)", options: ["A. Stercoracuous", "B. Stercoracous", "C. Stercoracious", "D. Stercoraceous"], correct: "D. Stercoraceous" },
];

let currentQuestion = 0, score = 0, timer, timeLeft = 25;
let userAnswers = [];

function startTimer() {
    clearInterval(timer);
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("time").textContent = timeLeft;
        } else {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    timeLeft = 25;
    startTimer();
    let q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    document.getElementById("options").innerHTML = q.options.map(option =>
        `<button class="option-btn" onclick="selectAnswer('${option}', this)">${option}</button>`
    ).join("");
}

function selectAnswer(selected, button) {
    clearInterval(timer);
    let correctAnswer = questions[currentQuestion].correct;
    userAnswers.push(selected);
    if (selected === correctAnswer) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }
    setTimeout(nextQuestion, 1500);
}

function nextQuestion() { 
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        submitQuiz();
    }
}

function submitQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").textContent = `${score} / 20`;

    let answersHTML = questions.map((q, i) => `
        <p><strong>Q${i + 1}:</strong> ${q.question}<br>
        <span class="correct-answer">Correct Answer: ${q.correct}</span><br>
        <span class="user-answer">Your Answer: ${userAnswers[i] || "No answer"}</span></p>
    `).join("");

    document.getElementById("answers").innerHTML = answersHTML;
}

function restartQuiz() { 
    currentQuestion = score = 0, userAnswers = [], document.getElementById("result-container").style.display = "none", document.getElementById("quiz-container").style.display = "block", loadQuestion();
}

loadQuestion();
