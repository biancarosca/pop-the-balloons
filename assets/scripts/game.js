const BALLOONS_INGAME = 80;
const GAME_TIME_ALLOWED = 60; // seconds
const balloon = document.getElementsByClassName('balloon');


const balloonColorGenerator = () => {
    console.log(balloon.length);
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

balloonColorGenerator();

const popHandler = (index) => {

    balloon[index].classList.add('visible'); 
    checkAllBalloonsPopped();
}

for (let i = 0 ; i< balloon.length ; i++)
{   
    balloon[i].addEventListener('mouseover',popHandler.bind(null,i));
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

const checkAllBalloonsPopped = () => {
    let numberOfPoppedBalloons = 0 ; 
    for ( let i=0 ; i< balloon.length ; i++)
        { 
            if(balloon[i].classList.contains('visible'))
               numberOfPoppedBalloons++;
            
        }
    if(numberOfPoppedBalloons === BALLOONS_INGAME)
       EndOfGame('win');
            
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
        EndOfGame('lost');
}

setInterval(balloonRebirth, 1000);
setInterval(updateTimeLeft,1000);