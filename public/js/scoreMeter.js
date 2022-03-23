
    const scoreMeter = document.querySelector("#scoreMeter");

    let score = 0;

    const scoreInterval = setInterval(() => {
        score+=10;
        scoreMeter.textContent = score;
    }, 1000);
