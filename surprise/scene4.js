document.addEventListener("DOMContentLoaded", function(){

    // FIREWORKS
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFirework(){
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height/2;

    for(let i=0;i<80;i++){
        particles.push({
            x:x,
            y:y,
            angle:Math.random()*2*Math.PI,
            speed:Math.random()*4+2,
            radius:2,
            life:100
        });
    }
}

function animateFireworks(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,i)=>{
        p.x += Math.cos(p.angle)*p.speed;
        p.y += Math.sin(p.angle)*p.speed;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fillStyle = "rgba(255,200,200," + p.life/100 + ")";
        ctx.fill();

        if(p.life<=0){
            particles.splice(i,1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

animateFireworks();

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noGifArea = document.getElementById("noGifArea");
const yesGifArea = document.getElementById("yesGifArea");
const music = document.getElementById("bgMusic");

let noCount = 0;
let yesSize = 1;
let decided = false;

const noGifs = ["no1.gif","no2.gif","no3.gif","no4.gif"];
const yesGifs = ["yes1.gif","yes2.gif","yes3.gif","yes4.gif","yes5.gif"];

function startMusic(){
    music.currentTime = 4;
    music.play();
}

noBtn.addEventListener("click", function(){
    if(decided) return;

    startMusic();

    if(noCount < noGifs.length){
        const img = document.createElement("img");
        img.src = noGifs[noCount];
        noGifArea.appendChild(img);
        noCount++;
    }

    yesSize += 0.8;
    yesBtn.style.transform = `scale(${yesSize}) translateY(-5px)`;
});
yesBtn.addEventListener("click", function(){
    setInterval(createFirework, 600);
    if(decided) return;
    decided = true;

    startMusic();

    noBtn.style.display = "none";

    // clear NO gifs
    noGifArea.innerHTML = "";

    let i = 0;
    const interval = setInterval(()=>{
        if(i < yesGifs.length){
            const img = document.createElement("img");
            img.src = yesGifs[i];
            yesGifArea.appendChild(img);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 1000);
});

});