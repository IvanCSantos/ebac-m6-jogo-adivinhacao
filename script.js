// Define os números mínimos e máximos do jogo
const MIN = 1;
const MAX = 100;
const MAXTRIES = 3;

let tried = 0;

// Atualiza as regras na tela
document.getElementById(
  "regras"
).innerText = `Informe um número entre ${MIN} e ${MAX}. Você terá ${MAXTRIES} chances, se acertar o número sorteado, você vence o jogo!`;

// Gera um número aleatório
const randomNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;

const updateScreen = (id, message) => {
  getElement(id).innerText = message;
};

const isValid = (number) => number >= MIN && number <= MAX;

const getElement = (id) => document.getElementById(id);

const incrementTry = () => {
  tried += 1;
  updateScreen("counter", `Tentativa: ${tried}/${MAXTRIES}`);
};

const endGame = () => (getElement("try").disabled = true);

const checkNumber = (chosenNumber) => {
  if (chosenNumber > randomNumber) {
    updateScreen("messages", "O número é menor!");
  } else {
    updateScreen("messages", "O número é maior!");
  }
  checkGameOver();
};

const checkGameOver = () => {
  if (tried >= MAXTRIES) {
    endGame();
    updateScreen(
      "messages",
      `Você perdeu! O número secreto era ${randomNumber}`
    );
  }
};

const checkWin = (chosenNumber) => {
  return +chosenNumber === +randomNumber;
};

function userTry() {
  incrementTry();
  const chosenNumber = getElement("guess").value;
  if (!isValid(chosenNumber)) {
    updateScreen("messages", "Número inválido!");
    return;
  }
  if (checkWin(chosenNumber)) {
    endGame();
    updateScreen("messages", "Parabéns! Você acertou!");
    updateScreen("counter", `Você utilizou ${tried} de ${MAXTRIES} tentativas`);
  } else {
    checkNumber(chosenNumber);
  }
}

getElement("try").addEventListener("click", userTry);
