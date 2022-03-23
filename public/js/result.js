fetch("http://localhost:3000/ranking")
        .then((resposta) => {
          return resposta.json();
        })
        .then((json) => {
          console.log(json);
          const ranking = json.playerList;

          const lista = document.querySelector("ul");

          ranking.forEach(player => {
            let li = document.createElement("li");
            li.textContent = `${player.name}: ${player.score}`;
            lista.appendChild(li);
          });
        });