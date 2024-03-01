
//first select all the elements


let score = document.querySelector(".score");
let raceScreen = document.querySelector(".raceScreen");
let optionBar = document.querySelector(".optionBar");

console.log( optionBar,  score,  raceScreen);
let controls = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player = {
    speed: 5,
    score: 0
};

optionBar.addEventListener("click",start);

document.addEventListener("keydown",keyPressed);
document.addEventListener("keyup", keyReleased);

function keyPressed(e){
    e.preventDefault();
    let pressedKeyInfo = e.key;

    if(pressedKeyInfo in controls){
        controls[pressedKeyInfo] = true;
        console.log("Key was pressed: ",controls);
    }

}

function keyReleased(e){
    e.preventDefault();
    let releasedKeyInfo = e.key;
    if(releasedKeyInfo in controls){
        controls[releasedKeyInfo] = false;
        console.log("Key is released: ",controls);
    }
}



function start(){
    player.score = 0;
    optionBar.classList.add("hideThis");
    raceScreen.classList.remove("hideThis");

    player.start = true;
    requestAnimationFrame(gamePlay);

    // create divider for road
    for(let i=0;i<5;i++){
        let divider = document.createElement("div");
        divider.className = "divider";
        divider.y = i*100;
        divider.style.marginTop = `${divider.y}px`;
        raceScreen.append(divider);
    }


    //create a car
    let car = document.createElement("div");
    car.className = "car";
    raceScreen.append(car);

    player.xAxis = car.offsetLeft;
    player.yAxis = car.offsetTop;
    // console.log(player);

    //create enemies
    for(let i=0;i<5;i++){
        let enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.y = (i+1)*150;
        enemy.x = parseInt(4+Math.random()*200);
        enemy.style.top = enemy.y+"px";
        enemy.style.left = enemy.x+"px";
        enemy.style.backgroundColor="green";
        raceScreen.append(enemy);
    }


    
}

function gamePlay(){
    let car = document.querySelector(".car");
    let roadDimension = raceScreen.getBoundingClientRect();
    

    moveDivider();
    moveEnemy(car);

    if(player.start){
        if(controls.ArrowUp && player.xAxis>(roadDimension.top-5)){
            player.xAxis-=player.speed;
        }
        if(controls.ArrowDown && player.xAxis<480){
            player.xAxis+=player.speed;
        }
        if(controls.ArrowLeft && player.yAxis > 5){
            player.yAxis-=player.speed;
        }
        if(controls.ArrowRight && player.yAxis <250){
            player.yAxis+=player.speed;
            // console.log("hehe");
        }

        car.style.left = player.yAxis+"px";
        car.style.top = player.xAxis+"px";
        requestAnimationFrame(gamePlay);
    }
    player.score++;
    score.innerHTML = "Score: "+player.score;
}




// for moving divider

function moveDivider(){
    let divider = document.querySelectorAll(".divider");
    

    divider.forEach(line => {

        if(line.y>500){
            line.y = -530;
        }


        line.y+=player.speed+6;
        line.style.top = line.y+"px";
    });
}


//for moving enemies

function moveEnemy(car){
    const enemies = document.querySelectorAll('.enemy');

    enemies.forEach((enemy)=>{

         if(isCollide(car, enemy)){
                console.log('Boom! hit');
                endGame();
         }
       if(enemy.y >=800){
        enemy.y = enemy.y - 950;
        enemy.style.left = parseInt(Math.random()*250) + "px";
       }

       enemy.y = enemy.y + player.speed;
       enemy.style.top = enemy.y + "px";
    })
}


//for collide conditions


function isCollide(a,b){
    let aRect = a.getBoundingClientRect(); 
 //    console.log(aRect);
     let bRect = b.getBoundingClientRect();
 
     let collideCondition = (aRect.bottom <bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right);
     return !collideCondition;
 }
 

 //to end the game
 function endGame(){
     player.start = false;
     let restartBtn = document.createElement("button");
     restartBtn.innerHTML = "Restart";
     optionBar.innerHTML = "Game Over <br> Your final score is " + player.score;
     optionBar.append(restartBtn);
     optionBar.classList.remove('hideThis');
     raceScreen.classList.add('hideThis');
     restartBtn.addEventListener("click",restart);
 
 }

 function restart(){
    location.reload();
    // start();
 }