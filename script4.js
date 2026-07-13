

    // Questions array
   // Questions array
const questions = [

    {
        question: "What is 1 + 1?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: 1
    },

    {
        question: "What is 2 + 1?",
        options: [
            "2",
            "3",
            "4",
            "5"
        ],
        correctAnswer: 1
    },

    {
        question: "What is 5 - 2?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: 2
    },

    {
        question: "What is 3 × 2?",
        options: [
            "5",
            "6",
            "7",
            "8"
        ],
        correctAnswer: 1
    },

    {
        question: "What is 8 ÷ 2?",
        options: [
            "2",
            "3",
            "4",
            "5"
        ],
        correctAnswer: 2
    }

];

    // Select page elements
    const quizContainer = document.getElementById("quizContainer");
    const submitBtn = document.getElementById("submitBtn");
    const resetBtn = document.getElementById("resetBtn");
    const resultDisplay = document.getElementById("resultDisplay");

    let submitted = false;

    // Load questions
    function loadQuestions(){

        quizContainer.innerHTML="";

        questions.forEach((question,index)=>{

            const card=document.createElement("div");
            card.className="question-card";
            card.dataset.questionIndex=index;

            let html="<h3>"+question.question+"</h3>";

            question.options.forEach((option,optionIndex)=>{

                html+=`
                <div class="option"
                     data-option-index="${optionIndex}">
                    ${option}
                </div>
                `;

            });

            card.innerHTML=html;

            quizContainer.appendChild(card);

        });

        submitted=false;

    }

    // Select answer
    function selectAnswer(questionIndex,optionIndex){

        if(submitted) return;

        const card=document.querySelector(
            '[data-question-index="'+questionIndex+'"]'
        );

        const options=card.querySelectorAll(".option");

        options.forEach(option=>{
            option.classList.remove("selected");
        });

        options[optionIndex].classList.add("selected");

    }

    // Submit quiz
    function submitQuiz(){

        if(submitted) return;

        submitted=true;

        let score=0;

        const cards=document.querySelectorAll(".question-card");

        cards.forEach((card,index)=>{

            const selected=card.querySelector(".selected");

            const options=card.querySelectorAll(".option");

            options[questions[index].correctAnswer]
                .classList.add("correct-answer");

            if(selected){

                const answer=
                Number(selected.dataset.optionIndex);

                if(answer===questions[index].correctAnswer){

                    score++;

                    card.classList.add("correct");

                }else{

                    card.classList.add("incorrect");

                }

            }else{

                card.classList.add("incorrect");

            }

        });

        resultDisplay.textContent=
        "You scored "+score+" out of "+questions.length+"!";

    }

    // Reset quiz
    function resetQuiz(){

        resultDisplay.textContent="";

        loadQuestions();

    }

    // Event delegation for options
    quizContainer.addEventListener("click",function(event){

        if(!event.target.classList.contains("option"))
            return;

        const card=event.target.closest(".question-card");

        const questionIndex=
        Number(card.dataset.questionIndex);

        const optionIndex=
        Number(event.target.dataset.optionIndex);

        selectAnswer(questionIndex,optionIndex);

    });

    // Buttons
    submitBtn.addEventListener("click",submitQuiz);

    resetBtn.addEventListener("click",resetQuiz);

    // Load quiz on page load
    loadQuestions();