const BALLOONS_INGAME = 80;
const GAME_TIME_ALLOWED = 60; // seconds
const balloon = document.getElementsByClassName('balloon');


const balloonColorGenerator = () => {

    for(let i = 0 ; i< balloon.length ;i++)
    {
    const number = Math.floor(Math.random()*4);
    if( number === 0)
        balloon[i].classList.add('first-col'); 
    if( number === 1)
        balloon[i].classList.add('second-col');
    if( number === 2)
        balloon[i].classList.add('third-col'); 
    if( number === 3)
        balloon[i].classList.add('fourth-col');
    }

}

const popHandler = (index) => {

    balloon[index].classList.add('visible'); 
    checkAllBalloonsPopped();
}

const clearData = () => {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.style.display = 'flex';
    const winScreen = document.querySelector('.result');
    winScreen.style.display = 'none';
    const resultMessage = winScreen.querySelector('h1');
    resultMessage.textContent = "You";
    const timeLeftEl = document.getElementById('time-left');
    timeLeftEl.textContent = `${GAME_TIME_ALLOWED} s`;
} 

const EndOfGame = (result) => {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.style.display = 'none';
    const winScreen = document.querySelector('.result');
    const resultMessage = winScreen.querySelector('h1');
    winScreen.style.display = 'flex';
    if(result === 'win')
        resultMessage.textContent += ' win!';
    else
        resultMessage.textContent += ' lost!';
        
    
}

const exitIntervals = () => {
    clearInterval(window.interval1);
    clearInterval(window.interval2);
}

const checkAllBalloonsPopped = () => {
    let numberOfPoppedBalloons = 0 ; 
    for ( let i=0 ; i< balloon.length ; i++)
        { 
            if(balloon[i].classList.contains('visible'))
               numberOfPoppedBalloons++;
            
        }
    if(numberOfPoppedBalloons === BALLOONS_INGAME)
       {EndOfGame('win');
        exitIntervals(); 
        }
            
}

const balloonRebirth = () => {
    const indexToRevive = Math.floor(Math.random()*BALLOONS_INGAME);
    balloon[indexToRevive].classList.remove('visible');
}

let gameTime = GAME_TIME_ALLOWED;
const updateTimeLeft = () => {
    gameTime--;
    const timeLeftEl = document.getElementById('time-left');
    timeLeftEl.textContent = `${gameTime} s`; 
    if(gameTime === 0)
        {EndOfGame('lost');
        exitIntervals();
        }
}

const startNewGame = () => {
    clearData();
    gameTime = GAME_TIME_ALLOWED; 
    for(let i = 0 ; i< balloon.length ;i++)
        {balloon[i].classList.remove(balloon[i].classList[1]);
        balloon[i].classList.remove('visible');   
        }
    balloonColorGenerator();
    addIntervals();
}

const addIntervals = () => {
    window.interval1 = setInterval(balloonRebirth, 1000);
    window.interval2 = setInterval(updateTimeLeft,1000);
    
}

const startGame = () =>{
    balloonColorGenerator();
    addIntervals();
    //add listeners
    const newGameBtn = document.getElementById('restart-btn');
    newGameBtn.addEventListener('click',startNewGame);
    for (let i = 0 ; i< balloon.length ; i++){   
        balloon[i].addEventListener('mouseover',popHandler.bind(null,i));
    }
}

startGame();