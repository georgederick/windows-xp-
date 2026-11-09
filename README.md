# Windows XP Web Desktop

Uma réplica interativa da área de trabalho do **Windows XP** que roda direto no navegador. A ideia não é um site com visual retrô, e sim a sensação de ligar um computador com Windows XP e usá-lo.

Criado por **Georgederick**.

## Recursos

- **Boot completo:** tela de BIOS, tela de carregamento com a barra animada clássica, tela de boas-vindas e transição para o desktop. Há um botão para pular a inicialização.
- **Tema Luna azul:** janelas, barra de título, botões 3D, barra de tarefas, botão Iniciar verde e menu Iniciar no estilo do original.
- **Gerenciador de janelas:** arrastar, redimensionar, minimizar, maximizar, restaurar e fechar. A janela ativa fica em primeiro plano e as janelas abertas aparecem na barra de tarefas.
- **Área de trabalho:** ícones em SVG que podem ser arrastados, seleção, duplo clique para abrir e menu de contexto (Atualizar, Organizar ícones, Propriedades).
- **Sistema:** relógio em tempo real, notificação de boas-vindas, caixas de diálogo, Executar, Pesquisar, Painel de Controle e tela de desligamento.
- **Sons:** efeitos de inicialização e encerramento gerados pelo navegador (Web Audio), com opção de desligar.

## Programas

| Programa | O que tem |
|---|---|
| Jogo da Velha | Jogador x jogador ou contra o computador, 3 níveis de dificuldade (o difícil usa minimax) e placar |
| Calculadora | Operações básicas, porcentagem, raiz, inversão de sinal, apagar dígito, suporte ao teclado e sem uso de `eval()` |
| Snake | Pontuação, velocidades, pausa, game over, recorde salvo no `localStorage` e funcionamento ao redimensionar a janela |
| Adivinhe o Número | 4 dificuldades (até 1000), contador de tentativas e histórico de palpites |

## Como executar

1. Baixe ou clone o repositório.
2. Abra o `index.html` em um navegador moderno.

Não precisa de instalação, servidor ou dependências.

## Atalhos

- `Alt + Q`: fecha a janela ativa
- `Alt + M`: minimiza a janela ativa
- `Esc`: fecha menus
- Calculadora: teclado numérico, `Enter`, `Backspace`, `Delete`, `Esc`
- Snake: setas ou `W A S D`, `Espaço` pausa

## Estrutura

```
WindowsXP/
├── index.html
├── assets/   wallpaper, logo e ícone
├── css/      main.css, apps.css
└── js/       módulos (boot, janelas, desktop, apps)
```

## Tecnologias

HTML5, CSS3 e JavaScript puro (Vanilla JS), sem frameworks nem bibliotecas. As preferências, o placar e o recorde ficam salvos no `localStorage`.

## Observação sobre fontes

O projeto usa Tahoma e Trebuchet MS, as fontes do XP. Elas aparecem se estiverem instaladas no sistema, como no Windows. Em outros sistemas entra uma fonte parecida no lugar.

## Aviso

Projeto feito por diversão e para estudo, sem vínculo com a Microsoft. Windows XP é marca da Microsoft Corporation.
