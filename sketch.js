<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ghost Whacker</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
<style>
  body { margin:0; background:#120a20; color:#f2e9d0; font-family:Georgia,serif; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; }
  canvas { max-width:100%; height:auto !important; touch-action:none; border:3px solid #7cfc9a; border-radius:6px; }
  p { margin:10px 12px; font-size:14px; text-align:center; opacity:.8; }
</style>
</head>
<body>
<main id="game"></main>
<p>Click or tap the ghosts. Don’t hit the bats!</p>
<script>
const W = 600, H = 500;
const LV = [
  { name: "Quiet Graveyard", goal: 10, stay: 1600, gap: 1000, bats: 0 },
  { name: "Bat Night",       goal: 15, stay: 1100, gap: 800,  bats: 0.3 },
  { name: "Midnight Rush",   goal: 20, stay: 800,  gap: 600,  bats: 0.4 }
];
let state = "title", level = 0, score = 0, lives = 3, total = 0;
let holes = [], nextSpawn = 0;

function setup() {
  createCanvas(W, H).parent("game");
  textAlign(CENTER, CENTER);
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++)
      holes.push({ x: 120 + c * 180, y: 190 + r * 130, type: null, until: 0 });
}

function startLevel(n) {
  level = n; score = 0;
  for (let h of holes) h.type = null;
  nextSpawn = millis() + 500;
  state = "play";
}

function draw() {
  background(20, 12, 36);
  noStroke(); fill(255, 214, 120); circle(520, 70, 60);
  fill(20, 12, 36); circle(506, 62, 52);
  for (let h of holes) drawHole(h);
  if (state === "play") {
    let L = LV[level];
    if (millis() > nextSpawn) {
      let h = random(holes);
      if (!h.type) {
        h.type = random() < L.bats ? "bat" : "ghost";
        h.until = millis() + L.stay;
      }
      nextSpawn = millis() + L.gap;
    }
    for (let h of holes) if (h.type && millis() > h.until) h.type = null;
    fill(242, 233, 208); textSize(18);
    textAlign(LEFT, CENTER);  text("Level " + (level + 1) + ": " + L.name, 14, 24);
    text("Ghosts " + score + "/" + L.goal, 14, 50);
    textAlign(RIGHT, CENTER); text("Total " + total, W - 14, 24);
    text("Lives " + "\u2665".repeat(lives), W - 14, 50);
    textAlign(CENTER, CENTER);
  } else drawScreen();
}

function drawHole(h) {
  noStroke(); fill(10, 5, 18); ellipse(h.x, h.y + 30, 110, 36);
  if (h.type === "ghost") {
    fill(242, 233, 208); ellipse(h.x, h.y - 5, 60, 60); rect(h.x - 30, h.y - 5, 60, 30);
    fill(20, 10, 30); circle(h.x - 12, h.y - 10, 10); circle(h.x + 12, h.y - 10, 10);
    ellipse(h.x, h.y + 6, 10, 14);
  } else if (h.type === "bat") {
    fill(90, 60, 130);
    triangle(h.x, h.y, h.x - 45, h.y - 25, h.x - 30, h.y + 15);
    triangle(h.x, h.y, h.x + 45, h.y - 25, h.x + 30, h.y + 15);
    ellipse(h.x, h.y, 28, 34);
    fill(255, 60, 60); circle(h.x - 5, h.y - 4, 5); circle(h.x + 5, h.y - 4, 5);
  }
  fill(55, 42, 80); rect(h.x - 55, h.y + 28, 110, 12, 6);
}

function drawScreen() {
  fill(18, 10, 32, 210); rect(0, 0, W, H);
  let msg = "", sub = "", col = color(124, 252, 154);
  if (state === "title") { msg = "Ghost Whacker"; sub = "Tap ghosts. Avoid bats. Three levels."; }
  if (state === "between") { msg = "Level " + (level + 1) + " done!"; sub = "Next: " + LV[level + 1].name; }
  if (state === "over") { msg = "Game over"; sub = "You got " + total + " points."; col = color(255, 60, 60); }
  if (state === "win") { msg = "You win!"; sub = "Final score: " + total; col = color(255, 214, 120); }
  fill(col); textSize(54); text(msg, W / 2, 190);
  fill(242, 233, 208); textSize(20); text(sub, W / 2, 250);
  text("Click or press Enter to continue", W / 2, 320);
}

function advance() {
  if (state === "between") startLevel(level + 1);
  else if (state !== "play") { lives = 3; total = 0; startLevel(0); }
}

function mousePressed() {
  if (state !== "play") { advance(); return; }
  for (let h of holes) {
    if (h.type && dist(mouseX, mouseY, h.x, h.y) < 45) {
      if (h.type === "ghost") {
        score++; total++;
        if (score >= LV[level].goal) state = level === 2 ? "win" : "between";
      } else {
        lives--;
        if (lives <= 0) state = "over";
      }
      h.type = null;
      return;
    }
  }
}
function keyPressed() { if (keyCode === ENTER) advance(); }
</script>
</body>
</html>
