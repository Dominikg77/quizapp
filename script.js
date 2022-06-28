let questionsHTML = [{
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbien Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Für was steht HTML?",
        "answer_1": "Hyperlinks und Auszeichnungssprache",
        "answer_2": "Startseite Werkzeugauszeichnungssprache",
        "answer_3": "Hypertext-Auszeichnungssprache",
        "answer_4": "Hypertext Make-up-Sprache",
        "right_answer": 3
    },
    {
        "question": "Wer hat Webstandards definiert?",
        "answer_1": "Google",
        "answer_2": "das Worldwide Web Consortium",
        "answer_3": "Mozilla",
        "answer_4": "Microsoft",
        "right_answer": 2
    },
    {
        "question": "Wählen Sie das richtige Tag für die größte Überschrift",
        "answer_1": "h1",
        "answer_2": "Überschrift",
        "answer_3": "h6",
        "answer_4": "Header",
        "right_answer": 1
    },
    {
        "question": "Wähle das richtige tag um wichtigen Text zu markieren",
        "answer_1": "b",
        "answer_2": "important",
        "answer_3": "strong",
        "answer_4": "i",
        "right_answer": 3
    },
    {
        "question": "Welches Attribut brauchst du für einen hyperlink?",
        "answer_1": "url",
        "answer_2": "name",
        "answer_3": "keines, einfach den Pfad",
        "answer_4": "href",
        "right_answer": 4
    },
    {
        "question": "Welches Symbol kennzeichnet ein schließendes tag?",
        "answer_1": "*",
        "answer_2": "<",
        "answer_3": "/",
        "answer_4": "`",
        "right_answer": 3
    },
];

let questionsCSS = [{
        "question": "Für was steht CSS?",
        "answer_1": "colorful style sheets",
        "answer_2": "computer style sheets",
        "answer_3": "cascading style sheets",
        "answer_4": "creative style sheets",
        "right_answer": 3
    },
    {
        "question": "Mit welchem tag bindet man ein stylesheet ein?",
        "answer_1": "script",
        "answer_2": "link",
        "answer_3": "style",
        "answer_4": "stylesheet",
        "right_answer": 2
    },
    {
        "question": "In welchem Teil eines HTML Dokuments wird ein externes stylesheet eingebunden?",
        "answer_1": "im body",
        "answer_2": "im footer",
        "answer_3": "am Ende des Dokuments",
        "answer_4": "im head",
        "right_answer": 4
    },
    {
        "question": "Mit welchem Attribut definiert man inline CSS?",
        "answer_1": "style",
        "answer_2": "styles",
        "answer_3": "font",
        "answer_4": "class",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man einen Kommentar in CSS?",
        "answer_1": "// Ich bin ein Kommentar",
        "answer_2": "'Ich bin ein Kommentar",
        "answer_3": "// Ich bin ein Kommentar //",
        "answer_4": "/* Ich bin ein Kommentar*/",
        "right_answer": 4
    },
    {
        "question": "Welche CSS property bestimmt die Größe eines Textes?",
        "answer_1": "text-size",
        "answer_2": "font-style",
        "answer_3": "font-size",
        "answer_4": "text-style",
        "right_answer": 3
    },
    {
        "question": "Mit welcher property ändert man die Schriftart eines Elements?",
        "answer_1": "font-weight",
        "answer_2": "font-family",
        "answer_3": "font-size",
        "answer_4": "text-style",
        "right_answer": 2
    },
];

let array = questionsHTML;
let rightQuestions = 0; // anzahl richtige Fragen
let currentQuestion = 0; // JSON 0 Anfange (Frage 0)
let Audio_SUCCESS = new Audio(`audio/right.mp3`);
let Audio_FAIL = new Audio(`audio/wrong.mp3`);



function init() { // Onload funktion
    document.getElementById(`all-questions`).innerHTML = array.length; // Dynamische anzahl Fragen 
    showQuestion();
    aktiv();
}


function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressbar();
        showNegstQuestion();
        resetAnswerButtons();
    }
}


function gameIsOver() {
    return currentQuestion >= array.length

}


function showEndscreen() {
    document.getElementById(`end-screen`).style = ``; // Endsccren einblenden
    document.getElementById(`question-body`).style = `display: none;`; // Question Body ausblenden
    document.getElementById(`amount-of-right-questions`).innerHTML = rightQuestions; // auf die anzahl der richtigen Fragen zugreiffen am EndSccren
    document.getElementById(`amount-of-questions`).innerHTML = array.length; // auf die anzahl der Fragen zugreiffen am EndSccren
    document.getElementById(`header-image`).src = `img/pokal.png`; // auf ein src zugreiffen um das bild zu wechseln
    //Progressbar Endscreen
    let percent = rightQuestions / array.length;
    percent = Math.round(percent * 100);
    document.getElementById(`progress-bar-endscreen`).innerHTML = `${percent}%`;
    document.getElementById(`progress-bar-endscreen`).style.width = `${percent}%`;
}


function showNegstQuestion() {
    let question = array[currentQuestion];
    document.getElementById(`question-number`).innerHTML = currentQuestion + 1; // Fragen Nummer, aktueller stand von currentQuestion holen
    document.getElementById(`questiontext`).innerHTML = question[`question`];
    document.getElementById(`answer_1`).innerHTML = question[`answer_1`];
    document.getElementById(`answer_2`).innerHTML = question[`answer_2`];
    document.getElementById(`answer_3`).innerHTML = question[`answer_3`];
    document.getElementById(`answer_4`).innerHTML = question[`answer_4`];
    aktiv();
}


function updateProgressbar() {
    let percent = currentQuestion / array.length;
    percent = Math.round(percent * 100);
    document.getElementById(`progress-bar`).innerHTML = `${percent}%`;
    document.getElementById(`progress-bar`).style.width = `${percent}%`;
}


//Antwort richtig oder Falsch
function answer(selection) { // selection = anwser_1 / 2...
    let question = array[currentQuestion]; //Frage 1
    let selectionQuestionNumber = selection.slice(-1); // slice(-1) auf das letzt Zeichen des strings zugreifen
    let idOfRightAnswer = `answer_${question[`right_answer`]}`; // richtige Anwort als String definieren 
    aktiv();
    if (rightAnswerSelected(selectionQuestionNumber, question)) { // wenn das letzt zeichen 3 ist, was die richtig antwort ist, dann... 
        document.getElementById(selection).parentNode.classList.add(`bg-success`) // auf das äussere Element / übergeordnete  zugreifen (.parrentNode)
        rightQuestions++; // wenn die frage richtig war, wird die summe um eins erhöht
        Audio_SUCCESS.play();
    } else {
        document.getElementById(selection).parentNode.classList.add(`bg-danger`)
        document.getElementById(idOfRightAnswer).parentNode.classList.add(`bg-success`) // wenn die Falsche Antwort ausgewählt wird sollte dann die richtige angezeigt werden
        Audio_FAIL.play();

    }
    document.getElementById('next-button').disabled = false;
    disable();
}

function rightAnswerSelected(selectionQuestionNumber, question){
    return selectionQuestionNumber == question[`right_answer`];
}

  function disable(){
    document.getElementById(`overlay`).classList.add(`overlay`);
  }

  function aktiv(){
    document.getElementById(`overlay`).classList.remove(`overlay`);
  }

function nextQuestion(){
    currentQuestion++; //um eins erhöhen (von 0 auf eins)
    document.getElementById(`next-button`).disabled=true; // Button deaktivieren
// Css Klassen ausblenden
resetAnswerButton();
aktiv();
showQuestion();
}


function resetAnswerButton(){
    // Css Klassen ausblenden
    document.getElementById(`answer_1`).parentNode.classList.remove(`bg-danger`);
    document.getElementById(`answer_1`).parentNode.classList.remove(`bg-success`);
    document.getElementById(`answer_2`).parentNode.classList.remove(`bg-danger`);
    document.getElementById(`answer_2`).parentNode.classList.remove(`bg-success`);
    document.getElementById(`answer_3`).parentNode.classList.remove(`bg-danger`);
    document.getElementById(`answer_3`).parentNode.classList.remove(`bg-success`);
    document.getElementById(`answer_4`).parentNode.classList.remove(`bg-danger`);
    document.getElementById(`answer_4`).parentNode.classList.remove(`bg-success`);
}


function restartGame(){
    document.getElementById(`header-image`).src = `img/education.jpg`; // Wieder auf das Start bild wechseln
    rightQuestions = 0; // Varbiable wieder auf 0 setzen
    currentQuestion = 0; // Varbiable wieder auf 0 setzen
    document.getElementById(`end-screen`).style = `display: none;`; // Endsccren ausblenden
    document.getElementById(`question-body`).style = ``; // QuestionBody wieder einblenden;
    init();
}

function switchToHTML() {
    document.getElementById(`header-image`).src = `img/education.jpg`; // Wieder auf das Start bild wechseln
    array = questionsHTML;
    currentQuestion = 0;
    rightQuestions = 0;
    document.getElementById(`end-screen`).style = `display: none;`; // Endsccren ausblenden
    document.getElementById(`question-body`).style = ``; // QuestionBody wieder einblenden
    init();
    document.getElementById('mark1').classList.remove('d-none');
    document.getElementById('mark2').classList.add('d-none');
}

function switchToCSS() {
    document.getElementById(`header-image`).src = `img/education.jpg`; // Wieder auf das Start bild wechseln
    array = questionsCSS;
    currentQuestion = 0;
    rightQuestions = 0;
    document.getElementById(`end-screen`).style = `display: none;`; // Endsccren ausblenden
    document.getElementById(`question-body`).style = ``; // QuestionBody wieder einblenden
    init();
    document.getElementById('mark1').classList.add('d-none');
    document.getElementById('mark2').classList.remove('d-none');
}