const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

class Utils { 
    static checkValidTime(time) {
        const rex = /^([0-9]+\:)?([0-9]{1,2}\:)?[0-9]{1,2}$/gi
        if (!time || !time.match(rex)) {
            return false;
        }
        const split = time.split(':').map(e => +e).reverse();
        return (split.length <= 1 || (split.length > 1 && split[0] <= 59)) && 
            (split.length <= 2 || (split.length > 2 && split[1] <= 59));
    }

    static secondsToTime(seconds) {
        return new Date(seconds * 1000).toISOString().substr(11, 8);
    }
}

class Timer {
    constructor (numbersContainer, controls) {
        this.validateParameters(numbersContainer, controls);
        this.numbers = numbersContainer.querySelectorAll('img');
        this.controls = controls;
        this.intervalIdentifier = undefined;
        this.seconds = 0;
        this.timesPlayed = 0;
        this.max_plays = 2;
        this.addClickEventOnNumbers();
        this.addClickEventOnControls();
    }

    validateParameters(numbersContainer, controls) {
        if (!numbersContainer) { throw new Error('Define numbersContainer'); }
        if (!controls) { throw new Error('Define controls'); }
        if (!controls.start) { throw new Error('Define controls.start'); }
        if (!controls.pause) { throw new Error('Define controls.pause'); }
        if (!controls.clear) { throw new Error('Define controls.clear'); }
        if (!controls.time) { throw new Error('Define controls.time'); }
    }

    addDigitToTime(digit) {
        let prevText = this.controls.time.innerHTML;
        const withColumn = (prevText.length && prevText.replace(/:/gm, '').length % 2 === 0 ? ':' : '');
        prevText += withColumn + digit;
        if (Utils.checkValidTime(prevText)) {
            this.controls.time.innerHTML = prevText;
        }
    }

    addClickEventOnNumbers() {
        this.numbers.forEach(e => {
            e.addEventListener('click', ev => {
                this.addDigitToTime(+ev.target.dataset.numb);
            });
        });
    }

    addClickEventOnControls() {
        this.controls.clear.addEventListener('click', () =>{ 
            this.handleClearButtonClick();
            this.timesPlayed = 0;

        });
        this.controls.start.addEventListener('click', () => {
            this.startTimer();
            this.blockButtonsAfterStart(this.controls.clear, this.controls.start);
            this.unblockButtonsAfterPause(this.controls.pause, null);
            this.fakeStartAudio();
        });
        this.controls.pause.addEventListener('click', () =>{ 
            this.clearInterval()
            this.unblockButtonsAfterPause(this.controls.clear, this.controls.start)
        });
    }

    startTimer() {
        const time = this.controls.time.innerHTML.split(':').map(e => +e);
        this.seconds = time.reduce((acc, el, ndx) => acc + el * Math.pow(60, (time.length - 1) - ndx), 0);
        this.controls.time.innerHTML = Utils.secondsToTime(this.seconds--);
        this.intervalIdentifier = setInterval(() =>this.interval(), 1000);

    }

    interval() {
        this.controls.time.innerHTML = Utils.secondsToTime(+this.seconds--);
        this.seconds === -1 && this.clearInterval();
    }

    clearInterval() {
        clearInterval(this.intervalIdentifier);
        this.intervalIdentifier = undefined;
        if(this.seconds=== -1){
            this.whenTimeIsOver()

        }
    }

    blockButtonsAfterStart(clear, start){
        clear.style.opacity = .4;
        clear.style.pointerEvents = 'none';
        if(start === null)return
        else{start.style.opacity = .4;
            start.style.pointerEvents = 'none'}
        
    }

    unblockButtonsAfterPause(clear, start){
        clear.style.opacity = 1;
        clear.style.pointerEvents = 'all';
        if(start === null)return;
        else{start.style.opacity = 1;
            start.style.pointerEvents = 'all'}
        
    }

    handleClearButtonClick(){
        this.controls.time.innerHTML = ''
        this.unblockButtonsAfterPause(this.controls.start, null);
        if(this.seconds === -1){
            this.controls.cock.classList.remove('move_cock');
            this.blockButtonsAfterStart(this.controls.pause, null);
            this.stopAudio();
        }

    }
    playAudio(){
        this.controls.x.play();
        this.timesPlayed++;
    }

    makeRoosterCrowTwice(){
        this.controls.x.addEventListener('ended', ()=>{
            if(this.timesPlayed >= this.max_plays){
                return;
            }else{this.controls.x.currentTime = 0;
                this.controls.x.play();
                this.timesPlayed++;
            }  
        })
    }

    stopAudio(){
        this.controls.x.pause();
        this.controls.x.currentTime = 0;
    }

    whenTimeIsOver(){
        this.blockButtonsAfterStart(this.controls.start, this.controls.pause)
        this.unblockButtonsAfterPause(this.controls.clear, null)
        this.controls.cock.classList.add('move_cock');
        this.controls.cock.src = "./countdown-img/Animated_Cockerel 2.gif?"+new Date().getTime();
        this.playAudio();
        this.makeRoosterCrowTwice();
    }

    fakeStartAudio(){
        this.controls.x.play();
        this.stopAudio();

    }

}

const numbersContainer = $('.numbers');
const controls = {
    'start': $('#start'),
    'clear': $('#clear'),
    'pause': $('#pause'),
    'time': $('#time'),
    'cock': $('.cock'),
    'x': $('#myAudio'),
};
const timer = new Timer(numbersContainer, controls);
