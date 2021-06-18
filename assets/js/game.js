(() => {

    //Creando la baraja / Creating the deck

    // C = clubs (tréboles)
    // D = diamonds (diamantes)
    // H = hearts (corazones)
    // S = spades (espadas o picas)

    //++ = Puede ser optimizado / Can be optimized

    let player = prompt("Nombre del jugador / Player name", "Jugador 1 / Player 1");
    let playerName = document.querySelector(".nombre-jugador");
    playerName.prepend(`${player}`)

    let deck = [];
    let specialCards = ["A", "J", "Q", "K"];
    let playerPoints = 0;
    let computerPoints = 0;

    const createDeck = () => { //++

        for (i = 2; i <= 10; i++) {
            deck.push(i + "C");
            deck.push(i + "D");
            deck.push(i + "H");
            deck.push(i + "S");
        }

        specialCards.forEach(card => {
            deck.push(card + "C");
            deck.push(card + "D");
            deck.push(card + "H");
            deck.push(card + "S");
        });

        // console.log("Baraja Organizada");
        // console.log(deck); //baraja ordenada / organized deck

        deck = _.shuffle(deck);

        // console.log("Baraja barajeada");
        // console.log(deck); //baraja desordenada / deck shuffle

        return deck;

    }

    createDeck();



    //Pedir carta / Draw card

    const drawCard = () => {

        if (deck.length === 0) {
            console.error("No hay más cartas en la baraja");
        }

        const card = deck.pop();

        // console.log("Carta obetenida:")
        // console.log(card);

        // console.log(deck); //Referencia de la baraja sin la carta obtenida / Deck without drawed card reference

        return card;

    }

    // drawCard();



    //Valor de la carta / card value

    const cardValue = (card) => {

        const value = card.substring(0, card.length - 1);
        let points = 0;

        // console.log("Valor de la carta:")
        // console.log(value);

        // if ( isNaN(value) ) {

        //     console.log("No es un número");
            
        //     if ( points === "A" ) {
        //         console.log (11);
        //         return 11;
        //     } else {
        //         console.log(10);
        //         return 10;
        //     }

        // } else {

        //     console.log("Es un número");
        //     points = parseInt(value) ; //Para transformar el string en número
        // }                              //Con * 1 puede funcionar

        // console.log(points);

        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;

        //Last return it´s teachers code. Mine did´nt work after drawBtn event T_T

    }

    cardValue(drawCard());


    //Events & Creating cards in HTML

    let playerCards = document.querySelector("#jugador-cartas");
    let onScreenPlayerPoints = document.querySelector(".puntos-jugador");
    const drawBtn = document.querySelector("#drawBtn");
    drawBtn.addEventListener("click", () => {

        const card = drawCard();
        // console.log(card);
        playerPoints = playerPoints + cardValue(card);
        // console.log({playerPoints});


        onScreenPlayerPoints.innerHTML = `<small>${playerPoints}</small>`;

        const cardImg = document.createElement("img");
        cardImg.classList.add("carta");
        cardImg.src = `/assets/cartas/${card}.png`;
        playerCards.append(cardImg);

        if (playerPoints > 21) {
            // console.warn("Perdiste");
            drawBtn.disabled = true;
            stopBtn.disabled = true;
            onScreenPlayerPoints.append(" Perdiste / You lose :(");
            computerTurn(playerPoints);
        } else if (playerPoints === 21) {
            // console.warn("Ganaste");
            drawBtn.disabled = true;
            stopBtn.disabled = true;
            onScreenPlayerPoints.append(" Llegaste a 21 / You reach 21 :D");
            computerTurn(playerPoints);
        }

    });


    const stopBtn = document.querySelector("#stopBtn");
    stopBtn.addEventListener("click", () => {
        drawBtn.disabled = true;
        stopBtn.disabled = true;
        computerTurn(playerPoints);
    })


    //Computer turn

    let onScreenComputerPoints = document.querySelector(".puntos-computadora");
    let computerCards = document.querySelector("#computadora-cartas");

    const computerTurn = (minimalPoints) => {

        do {
            const card = drawCard();
            computerPoints = computerPoints + cardValue(card);


            onScreenComputerPoints.innerHTML = `<small>${computerPoints}</small>`;

            const cardImg = document.createElement("img");
            cardImg.classList.add("carta");
            cardImg.src = `/assets/cartas/${card}.png`;
            computerCards.append(cardImg);

            if (minimalPoints > 21) {
                break;
            }

        } while ((computerPoints < playerPoints) && (minimalPoints <= 21));

        setTimeout(() => {

            if (computerPoints === minimalPoints) {
                alert("Nadie gana / Nobody wins =(");
            } else if (minimalPoints > 21) {
                onScreenComputerPoints.append(" Skynet will destroy the world / Skynet destruirá el mundo >:D");
            } else if (computerPoints > 21) {
                onScreenPlayerPoints.append(" Ganaste / You won xD");
            } else if (computerPoints > playerPoints && computerPoints <= 21) {
                onScreenComputerPoints.append(" Skynet will destroy the world / Skynet destruirá el mundo >:D");
            } else {
                alert("More conditions needs to be considered");
            }

        }, 10);

    }


    //New game 

    const newGame = document.querySelector("#newGameBtn");
    newGame.addEventListener("click", () => {

        let deck = [];
        deck = createDeck();
        playerPoints = 0;
        computerPoints = 0;
        onScreenPlayerPoints.innerHTML = `<small>${playerPoints}</small>`;
        onScreenComputerPoints.innerHTML = `<small>${computerPoints}</small>`;
        drawBtn.disabled = false;
        stopBtn.disabled = false;
        playerCards.innerHTML = "";
        computerCards.innerHTML = "";

    });

})();






