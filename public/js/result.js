fetch("http://localhost:3000/playerList")
        .then((resposta) => {
          return resposta.json();
        })
        .then((json) => {
          let ranking = json.playerList;
          
          ranking.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
          
          console.log(ranking);
          const lista = document.querySelector("ul");

          for(let i = 0; i < 10; i++) {
            let li = document.createElement("li");
            li.textContent = `${i+1} - ${ranking[i].name}: ${ranking[i].score}`;
            lista.appendChild(li);
          }
        });