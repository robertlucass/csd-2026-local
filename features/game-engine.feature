#language: pt

Funcionalidade: Motor do Jogo - Palpitar Letra
  Como um jogador
  Eu quero palpitar letras no jogo da forca
  Para que eu possa tentar descobrir a palavra secreta

  Contexto:
    Dado que a palavra secreta é "scrum"
    E que o jogo foi iniciado

  Cenário: Jogador faz um palpite errado
    Quando eu palpito a letra "z"
    Então meu número de vidas deve diminuir em 1
    E a letra "z" deve ser adicionada aos meus palpites
    # E eu devo ver uma mensagem dizendo que a letra não está na palavra
    Mas o status do jogo deve permanecer "RUNNING" se eu tiver vidas restantes

  Cenário: Jogador insere mais de 1 letra
    Quando eu palpito as letras "za"
    Então meu número de vidas deve continuar o mesmo
    E eu devo ver uma mensagem dizendo que o palpite está incorreto
    Mas o status do jogo deve permanecer "RUNNING"