const cvs = document.getElementById('pong');
const ctx = cvs.getContext("2d");
const smallBtn = document.getElementById('small');
const start = document.getElementById('start')

let textFont = '45px fantasy';

const checkBrowserWidth = ()=>{
    if(window.outerWidth > 700)return;
    else{
        cvs.width = window.outerWidth - 60;
        cvs.height = (cvs.width / 2) + 50;
        textFont = '20px fantasy';
    }
}
checkBrowserWidth()

//create user paddle

const user={
    x: 0,
    y: cvs.height/2 -100/2,
    width: 10,
    height: 100,
    color: "white",
    score: 0
}

const com ={
    x: cvs.width - 10,
    y: cvs.height/2 -100/2,
    width: 10,
    height: 100,
    color: "white",
    score: 0
}

//create ball
const ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "white"

}

//draw rect function

function drawRect(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

// create the net
const net = {
    x: cvs.width/2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "white"
}

//draw net
function drawNet(){
    for(let i=0; i< cvs.height; i+=15){
        drawRect(net.x, net.y+i, net.width, net.height, net.color);
    }
}


//draw circls
function drawCircle(x,y,r,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
}


//DRAW TEXT
function drawText(text, x,y,color){
    ctx.fillStyle = color;
    ctx.font = textFont;
    ctx.fillText(text, x, y);
}


function render(){
    //clear canvas
    drawRect(0,0, cvs.width, cvs.height, "gray");

    //draw the net
    drawNet();

    //draw score
    drawText(user.score, cvs.width/4, cvs.height/5, "white");
    drawText(com.score, 2.80*(cvs.width/4), cvs.height/5, "white");

    //draw paddles
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    //draw the ball
    drawCircle(ball.x,ball.y, ball.radius, ball.color )
}

//controll user paddle
cvs.addEventListener('mousemove', movePaddle);
function movePaddle(e){
    let rect = cvs.getBoundingClientRect();
    user.y = e.clientY - rect.top - user.height/2;
}

document.addEventListener('keydown',(e)=>{
    if(e.keyCode == '38'){
         user.y = user.y - 20;
    }else if(e.keyCode =='40'){
        user.y += 20;
    }
})

//collistion detection
function collision(b,p){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

//reset ball function
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;

    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

//update: pos, move, score...
function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //simple ai to control the com paddle
   let computerLevel = 0.1;
   com.y += (ball.y - (com.y + com.height/2)) * computerLevel;

    if( ball.y + ball.radius > cvs.height || ball.y -ball.radius < 0){
        ball.velocityY = - ball.velocityY
    }

    let player = (ball.x < cvs.width/2) ? user: com;

    if(collision(ball, player)){
        //where the ball hit the player
        let collidePoint = ball.y - (player.y + player.height/2);

        //normalization
        collidePoint = collidePoint/(player.height/2);

        //calculate angle in Radian
        let angleRad = collidePoint * Math.PI/7;

        //x direction of the ball when it;s hit
        let direction = (ball.x < cvs.width/2) ? 1 : -1;

        //CHANGE VEL X AND Y
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY =   ball.speed * Math.sin(angleRad);


        //everytime ball hits a paddle icrease speed
        ball.speed += 0.5;
        
    }
    //update the score
    if(ball.x - ball.radius < 0){
        //the com win
        com.score++;
        resetBall();
    }else if(ball.x + ball.radius > cvs.width){
        //user wins
        user.score++;
        resetBall();
    }

}

function changePaddle(){
    user.height = 50;
    com.height = 50;
    ball.radius = 5;
    user.color = 'blue'
}

smallBtn.addEventListener('click', changePaddle);

render();

//game init
function game(){
    update();
    render();
}

start.addEventListener('click', ()=>{
    const framePerSecond = 50;
    setInterval(game, 1000/framePerSecond)
})

