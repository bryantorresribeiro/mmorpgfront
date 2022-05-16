const input = document.querySelector(".input")
const button = document.querySelector(".button")
const world = document.querySelector(".world")

async function login(){
  if(localStorage.getItem("nick")){
    await player()
  }else{
    fetch(`https://mmorpgteste.herokuapp.com/create`,
    {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: input.value}),
    })
    localStorage.setItem("nick", input.value);
    await player()
  }
}

button.addEventListener("click", async function(){
  await login()
})

async function geolocationCharacter(){
  const geolocation = fetch(`https://mmorpgteste.herokuapp.com`,{method: 'GET'})
      return (await geolocation).json()
}

async function player(){
  const dataBase = await geolocationCharacter()
  world.innerHTML = "";
  dataBase.forEach(player => {
    const {name, x, y} = player
    const div = document.createElement("div")
    div.className = "player";
    div.style.margin = `${y}px ${x}px`;
    const namePlayer = document.createElement("p")
    namePlayer.innerText = name;
    const sprite = document.createElement("img")
    sprite.src = "./src/img/sprite.png"
    div.appendChild(namePlayer)
    div.appendChild(sprite)
    world.appendChild(div)
  });
}

async function updatePlayer(valueX, valueY){

  const nick = localStorage.getItem("nick");

  fetch(`https://mmorpgteste.herokuapp.com/update`,
  {
    method: "put",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name: nick, x: valueX, y:valueY}),
  })
  await player()
}

async function infoPlayer(){
  const nick = localStorage.getItem("nick");
  const index = await fetch(`https://mmorpgteste.herokuapp.com/${nick}`,{method: "get"})
  return index.json()
} 

async function motion(evt){

  const info = await infoPlayer()
  const {x, y} = info

  let valueX = x
  let valueY = y

   if(evt.key === "ArrowLeft"){
    valueX -= 10;
   }
   if(evt.key === "ArrowRight"){
    valueX += 10;
   }
   if(evt.key === "ArrowUp"){
    valueY -= 10;
   }
   if(evt.key === "ArrowDown"){
    valueY += 10;
   }

   await updatePlayer(valueX, valueY)
}

document.body.addEventListener("keydown", async function(evt){
    await motion(evt);
});

setInterval(async ()=>{await player()}, 500)