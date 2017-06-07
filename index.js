let decisions = {}
let ids = [];

window.onload = function(event) {
    if(window.localStorage.getItem('ids') != null) {
        ids = JSON.parse(window.localStorage.getItem('ids'));
        decisions = JSON.parse(window.localStorage.getItem('decisions'));
    }

    if(ids.length > 0) {
        checkNoDecisions();
        ids.forEach(function(id) {
            renderDecisionCard(decisions[id]);
        });
    }
}

function renderDecisionCard(decision) {
    const decHTML = `
        <div class="mdl-card" id="id-${decision.id}">
            <div class="mdl-card__title ${decision.favorite}" id="title-${decision.id}">
                <h4 class="mdl-card__title-text">${decision.question}</h4>
            </div>
            <div class="mdl-card__supporting-text" id="#decisionCardContent">
                <h2>${decision.answer}</h2>
                <p>Options: ${decision.options}</p>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <button class="mdl-button mdl-js-button mdl-button--icon" onclick="starClick('${decision.id}')">
                    <i class="material-icons">star</i>
                </button>
                <button class="mdl-button mdl-js-button mdl-button--icon" onclick="deleteClick('${decision.id}')">
                    <i class="material-icons">delete</i>
                </button>
            </div>
        </div>
    `
    const answersArea = document.querySelector('#answersArea')
    answersArea.innerHTML = decHTML + answersArea.innerHTML;
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
        favorite: '',
    }
    const id = Math.random().toString(36).substring(8)
    decision['id'] = id;
    decisions[id] = decision;
    ids.push(id);
    localStorage.setItem('decisions',JSON.stringify(decisions));
    localStorage.setItem('ids',JSON.stringify(ids));
    renderDecisionCard(decision,id);
}

function deleteClick(id) {
    const decisionCard = document.querySelector(`#id-${id}`)
    delete decisions[id];
    ids.splice(ids.indexOf(id),1);
    localStorage.setItem('decisions',JSON.stringify(decisions));
    localStorage.setItem('ids',JSON.stringify(ids));
    decisionCard.parentNode.removeChild(decisionCard);
    checkNoDecisions();
}

function starClick(id) {
    const decisionCard = document.querySelector(`#title-${id}`)
    const decisionClass = decisionCard.getAttribute('class');
    if(decisionClass.includes('star')) {
        decisionCard.setAttribute('class',decisionClass.replace('star',''));
        decisions[id].favorite = '';
    } else {
        decisionCard.setAttribute('class',decisionClass + ' star');
        decisions[id].favorite = 'star';
    }
    localStorage.setItem('decisions',JSON.stringify(decisions));
}

function decisionSubmit(event) {
    checkNoDecisions();
    event.preventDefault();
    const form = event.target;
    const question = form.question.value;
    const answerText = form.answers.value;
    makeDecision(question,answerText);
    form.question.value = null;
    form.answers.value = null;
    document.querySelectorAll('.mdl-textfield').forEach(function(field) {
        console.log(field);
        field.setAttribute('class',field.getAttribute('class').replace('is-dirty',''));
    });
}

function checkNoDecisions() {
    const noDecisions = document.querySelector('#noDecisions')
    if(noDecisions != null) {
        noDecisions.parentNode.removeChild(noDecisions);
    } else if(ids.length == 0) {
        document.querySelector('#answersArea').innerHTML = '<p class="text-primary-color" id="noDecisions">No decisions have been made yet.</p>';
    }
}

const decisionForm = document.querySelector('#decisionForm')
decisionForm.addEventListener('submit',decisionSubmit)