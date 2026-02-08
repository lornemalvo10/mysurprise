document.addEventListener("DOMContentLoaded", function(){

    const lines = [
    "So, I wanted to take this thing forward....",
    "And......",
    "Ask you out!!",
    "(Since I am into older girls...)",
    "And you fit that criteria perfectly!!"
    ];
    
    let index = 0;
    let typing = false;
    let musicStarted = false;
    
    const textArea = document.getElementById("textArea");
    const btn = document.getElementById("nextBtn");
    const music = document.getElementById("bgMusic");
    const typeSound = document.getElementById("typeSound");
    
    function startMusic(){
        if(!musicStarted){
            music.currentTime = 4;
            music.volume = 0.6;
            music.play();
            musicStarted = true;
        }
    }
    
    function typeLine(line){
        typing = true;
        let i = 0;
    
        const div = document.createElement("div");
        textArea.appendChild(div);
    
        typeSound.currentTime = 0;
        typeSound.play();
    
        const typer = setInterval(()=>{
            if(i < line.length){
                div.innerHTML += line.charAt(i);
                i++;
            } else {
                clearInterval(typer);
                typing = false;
                typeSound.pause();
            }
        }, 30);
    }
    
    btn.addEventListener("click", function(){
        startMusic();   // 🔥 music starts on first click
    
        if(typing) return;
    
        if(index < lines.length){
            typeLine(lines[index]);
            index++;
        } else {
            finalMoment();
        }
    });
    
    function finalMoment(){
        textArea.innerHTML = 
        "And there is no better time to ask out than <span class='valentine-word'>Valentine's</span>";
    
        textArea.className = "final-moment";
        btn.style.display = "none";
    
        // wait 3 seconds, then fade to next scene
        setTimeout(()=>{
            const fade = document.getElementById("fade");
            fade.classList.add("active");
    
            setTimeout(()=>{
                window.location.href = "page4.html";
            }, 1000);
    
        }, 3000);
    }
    
    
    });