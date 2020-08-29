window.load = init();
function init(){
    let controls = {
        timer: document.querySelector('.seconds'),
        info: document.querySelector('.timer'),
        timeSetup: document.querySelector('#game-time'),
        button: document.querySelector('.button__start'),
        playField: document.querySelector('.playfield'),
        score: document.querySelector('.score'),
        panelTime: document.querySelector('.game__setup')
    }
    
    let logic = {
        isGameStart:false,
        score:0,
        startGame: function(){
            if(!controls.score.classList.contains('hide')){
                display.showHide(controls.info);
                display.setupTime();
                display.showHide(controls.score);
            }
            display.showHide(controls.panelTime);
            controls.timeSetup.setAttribute('disabled','true');
            this.isGameStart = true;
            display.showHide(controls.button);
            let interval = setInterval(function(){
                let time = parseFloat(controls.timer.textContent);
                if (time <= 0) {
                  clearInterval(interval)
                    logic.endGame();
                } else {
                  controls.timer.textContent = (time - 0.1).toFixed(1)
                }
              },100)
            display.renderBox();
        },
        randomNumber: function(min,max){
            return Math.floor(Math.random() * (max - min) + min);
        },
        clickBox: function(event){
            if (!this.isGameStart) {
                return
            }
            if (event.target.dataset.box) {
                this.score++;
                display.renderBox();
            }
        },
        endGame: function(){
            this.isGameStarted = false
            display.showHide(controls.button);
            display.showHide(controls.panelTime);
            display.setScore();
            logic.score = 0;
            controls.playField.innerHTML = '';
            controls.timeSetup.disabled = false;
        }
    }

    let display = {
        showHide: function(button){
            button.classList.toggle('hide')
        },
        setupTime: function(){
            controls.timer.textContent = controls.timeSetup.value;
        },
        renderBox: function(){
            controls.playField.innerHTML = '';
            const box = document.createElement('div');
            const boxSize = logic.randomNumber(30,150);
            const gameSize = controls.playField.getBoundingClientRect()
            const maxTop =  gameSize.height - boxSize    
            const maxLeft = gameSize.width - boxSize
            box.style.height = box.style.width = boxSize+'px';
            box.style.position = 'absolute';
            box.style.backgroundColor = '#'+logic.randomNumber(111,999);
            box.style.top = logic.randomNumber(0,maxTop) + 'px';
            box.style.left = logic.randomNumber(0,maxLeft) + 'px';
            box.style.cursor = 'pointer';
            box.setAttribute('data-box','true')
            controls.playField.insertAdjacentElement('afterbegin',box);
        },
        setScore: function(){
            controls.score.textContent = `Ваш результат ${logic.score}`;
            display.showHide(controls.info);
            display.showHide(controls.score);
        }
    }

    controls.button.addEventListener('click',logic.startGame.bind(logic))
    controls.timeSetup.addEventListener('change',display.setupTime)
    controls.playField.addEventListener('click',logic.clickBox.bind(logic))
}
