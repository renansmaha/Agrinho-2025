// Variáveis globais
let trees = [];
let treeTypes = ['pino', 'árvore'];
let growingTrees = [];

function setup() {
  createCanvas(800, 600);
  textSize(16);
  textAlign(LEFT);
}

// Função para desenhar o cenário do campo
function drawLandscape() {
  background(135, 206, 235); // Céu azul claro

  // Céu e sol
  noStroke();
  fill(255);
  ellipse(700, 100, 80, 80); // Sol

  // Nuvens
  ellipse(150, 100, 60, 40);
  ellipse(180, 90, 60, 40);
  ellipse(210, 100, 60, 40);
  ellipse(500, 80, 80, 50);
  ellipse(530, 70, 80, 50);
  ellipse(560, 80, 80, 50);

  // Chão
  fill(34, 139, 34);
  rect(0, height * 0.75, width, height * 0.25);
}

// Função para desenhar a pessoa com detalhes
function drawPerson() {
  stroke(0);
  strokeWeight(2);
  fill(255, 224, 189); // Tom de pele

  let baseY = height * 0.75;

  // Cabeça
  ellipse(150, baseY - 60, 30, 30);
  // Corpo
  line(150, baseY - 45, 150, baseY);
  // Braços
  line(150, baseY - 30, 130, baseY - 10);
  line(150, baseY - 30, 170, baseY - 10);
  // Pernas
  line(150, baseY, 130, baseY + 30);
  line(150, baseY, 170, baseY + 30);
}

// Função para desenhar árvores com diferentes estilos
function drawTree(x, y, type = 'pino') {
  push();
  translate(x, y);
  // Tronco
  fill(139, 69, 19);
  rect(0, 0, 10, -40);
  // Folhagem
  fill(34, 139, 34);
  if (type === 'pino') {
    triangle(-20, -40, 15, -80, 50, -40);
  } else if (type === 'árvore') {
    ellipse(5, -50, 40, 40);
    ellipse(0, -50, 40, 40);
    ellipse(10, -50, 40, 40);
  }
  pop();
}

// Função para desenhar todas árvores
function drawTrees() {
  for (let t of trees) {
    drawTree(t.x, t.y, t.type);
  }
}

// Função para animar crescimento de árvores
function animateTrees() {
  // Usar um novo array para evitar problemas ao modificar enquanto itera
  let finishedTrees = [];
  for (let t of growingTrees) {
    t.size += 0.5; // crescimento progressivo
    if (t.size >= t.maxSize) {
      // Finaliza o crescimento: adiciona à lista de árvores permanentes
      trees.push({x: t.x, y: t.y, type: t.type});
      finishedTrees.push(t);
    } else {
      // Desenho do crescimento
      push();
      translate(t.x, t.y);
      fill(139, 69, 19);
      rect(0, 0, 10, -40);
      fill(34, 139, 34);
      if (t.type === 'pino') {
        triangle(-t.size, -t.size * 2, t.size / 2, -t.size * 4, t.size * 2, -t.size * 2);
      } else if (t.type === 'árvore') {
        ellipse(5, -t.size * 2.5, t.size * 4, t.size * 4);
        ellipse(0, -t.size * 2.5, t.size * 4, t.size * 4);
        ellipse(10, -t.size * 2.5, t.size * 4, t.size * 4);
      }
      pop();
    }
  }
  // Remove árvores que terminaram de crescer
  for (let t of finishedTrees) {
    let index = growingTrees.indexOf(t);
    if (index > -1) {
      growingTrees.splice(index, 1);
    }
  }
}

function draw() {
  drawLandscape();
  drawPerson();
  drawTrees();
  animateTrees();

  // Instruções
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT);
  text("Clique na área do chão para plantar uma árvore.\nClique duas vezes na árvore para removê-la.\nPressione 'C' para limpar todas as árvores.", 10, height - 60);
}

// Evento de clique para plantar árvore com crescimento animado
function mousePressed() {
  if (mouseY > height * 0.75) {
    // Planta uma árvore com crescimento
    let type = random(treeTypes);
    growingTrees.push({x: mouseX, y: height * 0.75, type: type, size: 0, maxSize: 2});
  }
}

// Evento de duplo clique para remover árvore
function doubleClicked() {
  for (let i = trees.length - 1; i >= 0; i--) {
    let t = trees[i];
    let d = dist(mouseX, mouseY, t.x, t.y);
    if (d < 20) {
      trees.splice(i, 1);
      break;
    }
  }
}

// Evento para limpar todas as árvores ao pressionar 'C'
function keyPressed() {
  if (key === 'C' || key === 'c') {
    trees = [];
    growingTrees = [];
  }
}