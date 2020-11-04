const BALLOONS_INGAME = 80;

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
    checkEndofGame();
}

for (let i = 0 ; i< balloon.length ; i++)
{   
    balloon[i].addEventListener('mouseover',popHandler.bind(null,i));
}

const checkEndofGame = () => {
    let numberOfPoppedBalloons = 0 ; 
    for ( let i=0 ; i< balloon.length ; i++)
        { 
            if(balloon[i].classList.contains('visible'))
               numberOfPoppedBalloons++;
            
        }
    if(numberOfPoppedBalloons === BALLOONS_INGAME)
        {
            const winScreen = document.querySelector('.win');
            const gameContainer = document.querySelector('.game-container');
            gameContainer.style.display = 'none';
            winScreen.style.display = 'flex';
            console.log('End of Game');
            console.log(winScreen.style.display);
        }
}
