// Birthday cake: blow out all the candles.
const blow = document.getElementById("blowCandles");
if (blow) {
  blow.addEventListener("click", () => {
    document.querySelectorAll(".flame").forEach(f => f.remove());
    document.getElementById("cakeMessage").textContent = "WISH GRANTED! HAPPY BIRTHDAY! 🎉";
    blow.textContent = "CANDLES BLOWN!";
    blow.disabled = true;
  });
}

// Secret letter.
const openLetter = () => {
  const letter = document.getElementById("letterContent");
  if (letter) letter.classList.remove("hidden");
  const envelope = document.getElementById("openEnvelope");
  if (envelope) envelope.textContent = "💖";
};
document.getElementById("openLetter")?.addEventListener("click", openLetter);
document.getElementById("openEnvelope")?.addEventListener("click", openLetter);

// Basketball game: 60-second timer and randomized shots.
let score = 0, timeLeft = 60, timer = null, running = false;
const start = document.getElementById("startGame");
const shoot = document.getElementById("shoot");
if (start && shoot) {
  start.addEventListener("click", () => {
    clearInterval(timer);
    score = 0; timeLeft = 60; running = true;
    document.getElementById("score").textContent = score;
    document.getElementById("time").textContent = timeLeft;
    document.getElementById("gameStatus").textContent = "GAME ON! SHOOT YOUR SHOT!";
    shoot.disabled = false;
    start.textContent = "RESTART GAME";
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer); running = false; shoot.disabled = true;
        document.getElementById("gameStatus").textContent = `TIME! FINAL SCORE: ${score} 🏀`;
      }
    }, 1000);
  });
  shoot.addEventListener("click", () => {
    if (!running) return;
    const ball = document.getElementById("ball");
    ball.classList.remove("shoot"); void ball.offsetWidth; ball.classList.add("shoot");
    const scored = Math.random() < 0.65;
    if (scored) score++;
    document.getElementById("score").textContent = score;
    document.getElementById("gameStatus").textContent = scored ? "SWISH! NICE SHOT 🔥" : "MISSED! GET THE REBOUND!";
    setTimeout(() => ball.classList.remove("shoot"), 380);
  });
}

// Drawing canvas: mouse and touch via pointer events.
const canvas = document.getElementById("drawCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let drawing = false, erase = false;
  function resizeCanvas() {
    const snapshot = canvas.width ? canvas.toDataURL() : null;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = 360 * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    if (snapshot) { const img = new Image(); img.onload = () => ctx.drawImage(img,0,0,rect.width,360); img.src = snapshot; }
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  const point = e => { const r=canvas.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; };
  canvas.addEventListener("pointerdown", e => { drawing=true; canvas.setPointerCapture(e.pointerId); const p=point(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); });
  canvas.addEventListener("pointermove", e => {
    if(!drawing)return; const p=point(e);
    ctx.strokeStyle=erase?"#ffffff":document.getElementById("color").value;
    ctx.lineWidth=document.getElementById("size").value;
    ctx.lineTo(p.x,p.y); ctx.stroke();
  });
  const stop=()=>{drawing=false;ctx.closePath();};
  canvas.addEventListener("pointerup",stop); canvas.addEventListener("pointercancel",stop);
  document.getElementById("eraser")?.addEventListener("click",()=>{erase=!erase;document.getElementById("eraser").textContent=erase?"ERASER ON":"ERASER";});
  document.getElementById("color")?.addEventListener("input",()=>{erase=false;document.getElementById("eraser").textContent="ERASER";});
  document.getElementById("clear")?.addEventListener("click",()=>ctx.clearRect(0,0,canvas.width,canvas.height));
  document.getElementById("save")?.addEventListener("click",()=>{
    const out=document.createElement("canvas"); out.width=canvas.width; out.height=canvas.height;
    const o=out.getContext("2d"); o.fillStyle="#fff"; o.fillRect(0,0,out.width,out.height); o.drawImage(canvas,0,0);
    const a=document.createElement("a"); a.download="birthday-art.png"; a.href=out.toDataURL("image/png"); a.click();
  });
}

// Final surprise.
document.getElementById("revealSurprise")?.addEventListener("click",()=>{
  document.getElementById("surpriseMessage").classList.remove("hidden");
  document.getElementById("revealSurprise").textContent="SURPRISE UNLOCKED ♥";
});
