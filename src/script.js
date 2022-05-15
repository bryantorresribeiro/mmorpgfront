const world = document.querySelector(".world");
//sprite.style.margin = `${y}px ${x}px`;

const input = document.querySelector(".input");
const button = document.querySelector(".button");

function peopleLogin(){
  const sprite = document.createElement("img")
  sprite.src = "./src/img/sprite.png"
  sprite.className = "sprite";
  document.body.appendChild(sprite)
}

button.addEventListener("click", peopleLogin)

function render(){
    world.innerHTML = "";
}

render()

function motion(evt){
   if(evt.key === "ArrowLeft"){
     x -= 10;
   }
   if(evt.key === "ArrowRight"){
     x += 10;
   }
   if(evt.key === "ArrowUp"){
     y -= 10;
   }
   if(evt.key === "ArrowDown"){
     y += 10;
   }
   render();
}

document.body.addEventListener("keydown", function(evt){
    motion(evt);
});
