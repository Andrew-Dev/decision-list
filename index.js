let decisions = {}

function renderDecisionCard(decision) {
    const id = Math.random().toString(36).substring(8)
    decision['id'] = id;
    const decHTML = `
        <div class="mdl-card" id="${id}">
            <div class="mdl-card__title" id="title-${id}">
                <h4 class="mdl-card__title-text">${decision.question}</h4>
            </div>
            <div class="mdl-card__supporting-text" id="#decisionCardContent">
                <h2>${decision.answer}</h2>
                <p>Options: ${decision.options}</p>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <button class="mdl-button mdl-js-button mdl-button--icon" onclick="starClick('${id}')">
                    <i class="material-icons">star</i>
                </button>
                <button class="mdl-button mdl-js-button mdl-button--icon" onclick="deleteClick('${id}')">
                    <i class="material-icons">delete</i>
                </button>
            </div>
        </div>
    `
    const answersArea = document.querySelector('#answersArea')
    answersArea.innerHTML += decHTML
    return id
}

function makeDecision(question,answerText) {
    const answers = answerText.split('\n')
    const index = Math.floor(Math.random() * answers.length)
    const answer = answers[index]
    let options = "";
    answers.forEach(function(answer) {
        options += answer + ", "
    });
    const decision = {
        answer: answer,
        options: options,
        question: question,
    }
    renderDecisionCard(decision);
}

function deleteClick(id) {

}

function starClick(id) {

}

function decisionSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const question = form.question.value;
    const answerText = form.answers.value;
    answerText.value = "";
    question.value = "";
    makeDecision(question,answerText);
}

const decisionForm = document.querySelector('#decisionForm')
decisionForm.addEventListener('submit',decisionSubmit)