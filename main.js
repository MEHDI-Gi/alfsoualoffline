
let theme = document.getElementById('themeIcon');
let QuestionNum = document.getElementById('Qnum');
let imgDiv = document.querySelector('.img-screen');
let QuestArea = document.getElementById('quest');
let nextBtnClick = document.getElementById('next-btn');
let backBtnClick = document.getElementById('back-btn');
let checkBtnClick = document.getElementById('check-btn');
let againBtnClick = document.getElementById('again-btn');
let imgQuestion = document.getElementById('QuestCover');
let answersArea = document.querySelector('#answers');
let answerIn = document.getElementsByName('answer-inp');
let answerChange = document.getElementsByClassName('AnswerPara');
let svgImg = document.getElementById('svg-img');
let result = document.getElementById('result');
let resultText = document.getElementById('result-text');
let message = document.getElementById('message');
let messageText = document.getElementById('message-text');
let answerLabel = document.getElementsByClassName('myLabel');
let aswerLabelAll = document.querySelectorAll('label')
let themeIcon = document.getElementById('themeIcon');
let heart = document.getElementsByClassName('fa-solid fa-heart');
let heartDiv = document.getElementById('heart');
let heartsAr = document.getElementById('heartsAria');
let heartIcName = document.getElementsByName('heart-icon-name');
let timeCount = document.getElementById('time-count');
let timeCountAria = document.getElementById('time-count-aria');

if ("ServiceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("./service-worker.js").then(
            function (registration) {
                console.log(
                    "serviceWorker registration successful with scope: ",
                    registration.scope
                );
            },
            function (err) {
                console.log("serviceWorker registration failed: ", err)
            }
        )
    })
}

 fetch('Quiz.json').then(function (resp) {
     return resp.json()
 }).then(function (data) {
          Question(data);
          QuestImg(data);
          Answers(data);   
          nextBtnClickF(data);
          backBtnClickF(data);
          checkBtnClickF(data)
 }).catch(function (err) {
     console.error('failed to load data try again !')
 })
function QuestImg(data){
    imgQuestion.src = data[`Q1`][`img`];
};

theme.addEventListener('click', function (){
    document.body.classList.toggle('lightDark');
    themeIcon.className = themeIcon.className === 'fa-solid fa-sun' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
});


function Question(data){
    QuestionNum.innerHTML = '# 01' ;
    QuestArea.innerHTML = data[`Q1`][`Question`];
};

let y = 1;
let ty = 0;
let time;
let trueAnswer = 'إجابة صحيحة';
let falseAnswer = 'إجابة خاطئة';

function Answers(data){
    for(let i = 1; i <= 3; i++){
        let AnswerLi = document.createElement('li');
        
        let AnswerInput = document.createElement('input');
        AnswerInput.id = `answer-name-${i}`;
        AnswerInput.name = 'answer-inp';
        AnswerInput.type = 'radio';
        AnswerInput.dataset.Answer = data[`Q${y}`][`Answer-${i}`];

        let AnswerP = document.createElement('p');
        let AnswerTxt = document.createTextNode(data['Q1'][`Answer-${i}`]);
        AnswerP.className = 'AnswerPara';
        AnswerP.appendChild(AnswerTxt);

        let AnswerLabel = document.createElement('label');
        AnswerLabel.id = `lab${i}`;
        AnswerLabel.className = 'myLabel';
        AnswerLabel.htmlFor = `answer-name-${i}`;
        AnswerLabel.appendChild(AnswerP);
        
        AnswerLi.append(AnswerInput , AnswerLabel);
        
            answersArea.appendChild(AnswerLi);
    }
}
for(let h = 1; h <= 5; h++){
    let Ci = document.createElement('i');
    Ci.id = "heart-icon";
    Ci.className = 'fa-solid fa-heart' ;
    Ci.setAttribute('name', 'heart-icon-name');
    heartDiv.appendChild(Ci);
}



function checkBtnClickF(data){
    checkBtnClick.addEventListener('click', () => {
        for(let i = 0; i < 3; i++ ){
            if(answerIn[i].checked){
                if(answerIn[i].dataset.Answer === data[`Q${y}`]['RightAnswer']){
                    resultText.innerHTML = trueAnswer;
                    nextBtnClick.style.display = 'block';
                    checkBtnClick.style.display = 'none';
                    result.style.translate = '0%';
                    message.style.translate = '-200%';
                    svgImg.className = "fa-regular fa-circle-check";
                    svgImg.style.color = 'green';
                    answerLabel[i].style.border = 'solid 2px var(--checkButton)';
                    answerIn[i].style.accentColor = 'var(--checkButton)';
                }else if(ty === 4){
                    againBtnClick.style.display = 'none';
                    checkBtnClick.style.display = 'none';
                    backBtnClick.style.display = 'none';
                    result.style.translate = '100%';
                    svgImg.className = "fa-regular fa-circle-xmark";
                    svgImg.style.color = 'rgb(146, 22, 22)';
                    answerLabel[i].style.border = 'solid 2px rgb(141, 30, 30)';
                    answerIn[i].style.accentColor = 'rgb(141, 30, 30)';
                    heartIcName[ty].className = 'fa-regular fa-heart';
                    ty += 1;
                    message.style.translate = '-100%';
                }else{
                    againBtnClick.style.display = 'block';
                    resultText.innerHTML = falseAnswer;
                    checkBtnClick.style.display = 'none';
                    result.style.translate = '0%';
                    message.style.translate = '-200%';
                    svgImg.className = "fa-regular fa-circle-xmark";
                    svgImg.style.color = 'rgb(146, 22, 22)';
                    answerLabel[i].style.border = 'solid 2px rgb(141, 30, 30)';
                    answerIn[i].style.accentColor = 'rgb(141, 30, 30)';
                    heartIcName[ty].className = 'fa-regular fa-heart';
                    ty++;
                    if(ty === 1){
                        time = 10;
                        let timeRe = setInterval(() => {
                            time--;
                            timeCount.innerHTML = `'${time} s' :الوقت المتبقي`;
                            messageText.innerHTML = `'${time} s'` + "  :  إنتهت عدد المحاولات، حاول بعد";
                        if(ty === 0 && time === 0){
                            clearInterval(timeRe)
                        } else if(time === 0){
                            ty--;
                            heartIcName[ty].className = "fa-solid fa-heart";
                            checkBtnClick.style.display = '';
                            backBtnClick.style.display = '';
                            message.style.translate = '';

                            time = 10;
                            if(ty === 0){
                                time = 0;
                                clearInterval(timeRe);
                            }
                        }
                            }, 1000)
                        }
                }
            }
        }
    })
}



function nextBtnClickF(data){
    nextBtnClick.addEventListener('click',  function(){
            if(y < Object.keys(data).length){
            setTimeout(()=>{
                y += 1;
                QuestionNum.innerHTML = '# 0' +  y;
                if(y >= 10){
                    QuestionNum.innerHTML = '# ' +  y;
                }
                QuestArea.innerHTML = data[`Q${y}`]['Question'];
                imgQuestion.src = data[`Q${y}`]['img'];
                result.style.translate = '100%';
                nextBtnClick.style.display = 'none';
                checkBtnClick.style.display = 'block'
                for(let i = 0; i < 3; i++){
                    answerLabel[i].style.border = '';
                    answerLabel[i].style.borderRadius = "";
                    answerIn[i].style.accentColor = '';
                    answerIn[i].checked = false;
                    answerChange[i].innerHTML = data[`Q${y}`][`Answer-${i + 1}`];
                    answerIn[i].dataset.Answer = data[`Q${y}`][`Answer-${i + 1}`];
                }
            }, 500)}else if(y === Object.keys(data).length){
                window.location.reload()
            }
        })
};

function backBtnClickF(data, i){
    backBtnClick.addEventListener('click',  function(){
        if(y < Object.keys(data).length && y !== 1){
            setTimeout(()=>{
                y -= 1;
                QuestionNum.innerHTML = '# 0' +  y;
                nextBtnClick.style.display = 'none';
                checkBtnClick.style.display = 'block'
                againBtnClick.style.display = 'none';
                QuestArea.innerHTML = data[`Q${y}`]['Question'];
                imgQuestion.src = data[`Q${y}`]['img'];
                result.style.translate = '';
                console.log(y)
                for(let i = 0; i < 3; i++){
                    answerLabel[i].style.border = '';
                    answerLabel[i].style.borderRadius = "";
                    answerIn[i].style.accentColor = '';
                    answerIn[i].checked = false;
                    answerChange[i].innerHTML = data[`Q${y}`][`Answer-${i + 1}`];
                    answerIn[i].dataset.Answer = data[`Q${y}`][`Answer-${i + 1}`];
                }
            }, 500)}
        })
};

againBtnClick.addEventListener('click', function (){
    for(let i = 0; i < 3; i++ ){
        if(ty === heartIcName.length ){
            result.style.translate = '100%';
            againBtnClick.style.display = 'none';
        }else{
            againBtnClick.style.display = 'none';
            checkBtnClick.style.display = 'block';
            result.style.translate = '100%';    
            answerLabel[i].style.border = '';
            answerIn[i].style.accentColor = '';        
            answerIn[i].checked = false;
        }
    }
})

heartDiv.addEventListener('click', () => {
    timeCountAria.style.display = 'flex';
    heartDiv.style.display = 'none';
    setTimeout(() => {
        timeCountAria.style.display = 'none';
        heartDiv.style.display = 'flex';
    }, 5000)
})


