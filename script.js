const quoteText = document.querySelector('.frase-area p');
const authorText = document.querySelector('.name');
quoteBtn = document.querySelector('button');


soundBtn = document.querySelector('.sound');
copyBtn = document.querySelector('.copy');
tweeterBtn = document.querySelector('.tweeter');


//Random quote function
function randomQuote() {
    quoteBtn.classList.add('Carregando');
    quoteBtn.innerText = 'Carregando..';
   fetch('https://api.quotable.io/random')
   .then(res => res.json())
   .then(result => {

    let toTranslate = () => {
        fetch(`https://api.mymemory.translated.net/get?q=${result.content}&langpair=en|pt-BR`)
            .then(res => res.json())
            .then(translated => {
                quoteText.innerHTML = translated.responseData.translatedText;
                authorText.innerHTML = result.author;
                quoteBtn.innerText = 'Nova Frase';
                quoteBtn.classList.remove('Carregando');
            });
        };
        toTranslate();
    });
}

soundBtn.addEventListener('click', () =>{
    let voice = new SpeechSynthesisUtterance(`${quoteText.innerHTML}`);
    voice.rate = 1.5;
    speechSynthesis.speak(voice);
});


copyBtn.addEventListener('click', () =>{
    navigator.clipboard.writeText(quoteText.innerHTML);
});


tweeterBtn.addEventListener('click', () => {
    let sendTweeter = `https://twitter.com/intent/tweet?url=${quoteText.innerHTML}`;
    window.open(sendTweeter, '_blank');
});

quoteBtn.addEventListener('click', randomQuote);


