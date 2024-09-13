var numberToFind = 0;
var attempts = 0;
var isEnviar = true;
var tentativas = 0;

document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.getElementById("startGameBtn");
  const lobbyContent = document.querySelector(".lobby-content");
  const gameContent = document.querySelector("#historicoNumeros");
  

  startGameBtn.addEventListener("click", () => {
    lobbyContent.style.display = "none";
    gameContent.style.display = "flex";
    limparHistorico();
  });

  document.getElementById('voltarLobbyBtn').addEventListener('click', voltarParaLobby);
});

function iniciarJogo() {
  // Adicione aqui a lógica para iniciar o jogo
  document.getElementById("lobbyContent").style.display = "none";
  document.getElementById("jogoContent").style.display = "block";
  document.getElementById('voltarLobbyBtn').style.display = "block";
}

function refresh() {
    var element = document.getElementById('bet');
    element.value = '';
    
    tentativas = 0;

    do {
        numberToFind = parseInt(Math.random() * 100);
      } while (numberToFind === 0);
    attempts = 0;

    console.log('O número a ser encontrado: ' + numberToFind);

    limparHistorico();
}

refresh();

function verificarEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (isEnviar) {
        acionarBotao();
      } else {
        reiniciarJogo();
      }
    }
  }

function acionarBotao() {
    var element = document.getElementById('bet');
    var bet = element.value;
    var enviarBtn = document.getElementById('enviarBtn');
    var parabensTexto = document.getElementById('parabensTexto');
    var texto = document.getElementById('texto');
    var content = document.getElementById('content');

    if (bet.length < 1 || bet.length > 3) {
        alert('🚨Por favor, digite um número entre 1 e 3 dígitos.🚨');
        element.value = ""; 
        return;
    }

    exibirBotaoVoltarLobby();

    if (bet > 100 || bet < 1) {
        alert('🚨Por favor, digite um número entre 1 e 100.🚨');
        element.value = "";
    return;
    }

    if (tentativas == 10) {
      // Exibir mensagem de perda
      document.getElementById('mensagemPerda').style.display = 'block';
      exibirBotaoReiniciar();
      document.getElementById('bet').style.display = 'none'; 
      enviarBtn.style.display = 'none';
      texto.style.display = 'none';
      isEnviar = false;

      var somErro = document.getElementById('somErro');
      somErro.play();

      limparHistorico();
      refresh();
      return;
  }

    if (bet > numberToFind) {
        attempts++;
        tentativas++;
        element.value = "";
    } else if (bet < numberToFind) {
        attempts++;
        tentativas++;
        element.value = "";
    } else {
        parabensTexto.style.display = 'block'; // Mostra o texto de parabéns
        exibirBotaoReiniciar();
        enviarBtn.style.display = 'none'; // Oculta o botão "Enviar"
        texto.style.display = 'none'
        document.getElementById('bet').style.display = 'none';
        isEnviar = false;

        document.getElementById('tentativasTexto').textContent = `${tentativas} tentativas!`;
      
        var somCerto = document.getElementById('somCerto');
        somCerto.play();      
      }
    adicionarAoHistorico(bet);
}

function exibirBotaoVoltarLobby() {
  var voltarLobbyBtn = document.getElementById('voltarLobbyBtn');
  voltarLobbyBtn.style.display = 'block';
}

function voltarParaLobby() {
  var lobbyContent = document.getElementById('lobbyContent');
  var jogoContent = document.getElementById('jogoContent');
  lobbyContent.style.display = 'flex';
  jogoContent.style.display = 'none';
  voltarLobbyBtn.style.display = 'none';
  limparHistorico();
  refresh();
}

function adicionarAoHistorico(numero) {
    var historicoElemento = document.getElementById('historicoNumeros');
    var novoItem = document.createElement('li');

    if (parseInt(numero) !== numberToFind) {
      novoItem.textContent = numero;

      if (parseInt(numero) < numberToFind) {
        novoItem.classList.add('maior');
      }

      if (parseInt(numero) > numberToFind) {
        novoItem.classList.add('menor');
      }
    } else {
      novoItem.textContent = numero + '✅';
      novoItem.classList.add('acertou');
    }

    historicoElemento.appendChild(novoItem);
    historicoElemento.scrollTop = historicoElemento.scrollHeight;
  }

function exibirBotaoReiniciar() {
    var reiniciarBtn = document.getElementById('reiniciarBtn');
    reiniciarBtn.style.display = 'block';
}

function reiniciarJogo() {
    var reiniciarBtn = document.getElementById('reiniciarBtn');
    var enviarBtn = document.getElementById('enviarBtn');
    var parabensTexto = document.getElementById('parabensTexto');
    var texto = document.getElementById('texto');
    var bet = document.getElementById('bet');

    reiniciarBtn.style.display = 'none';
    enviarBtn.style.display = 'block'; // Mostra o botão "Enviar"
    parabensTexto.style.display = 'none'; // Oculta o texto de parabéns
    texto.style.display = 'block';
    bet.style.display = 'block';
    mensagemPerda.style.display = 'none';
    isEnviar = true;

    limparHistorico();
    refresh();
  }

function limparHistorico() {
    var historicoElemento = document.getElementById('historicoNumeros');
    historicoElemento.innerHTML = "<li>HISTÓRICO</li>"; // Restaurar o texto inicial
  }