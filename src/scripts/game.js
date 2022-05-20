const input = document.querySelector(".input")
const button = document.querySelector(".button")
const world = document.querySelector(".world")

async function login(){
  try{
    localStorage.clear()
    fetch(`https://mmorpgtestando.herokuapp.com/gamer/create`,
    {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: input.value}),
    })
    localStorage.setItem("nick", input.value);
    await player()
  }catch(err){
    alert("Nome de jogador já está em uso!")
  }
}

button.addEventListener("click", async function(){
  await login()
})

async function geolocationCharacter(){
  const geolocation = fetch(`https://mmorpgtestando.herokuapp.com/gamer`,{method: 'GET'})
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
  fetch(`https://mmorpgtestando.herokuapp.com/gamer/update`,
  {
    method: "put",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name: nick, x: valueX, y:valueY}),
  })
  await player()
}

async function infoPlayer(){
  const nick = localStorage.getItem("nick");
  const index = await fetch(`https://mmorpgtestando.herokuapp.com/gamer/${nick}`,{method: "get"})
  try{
    return await index.json()
  }
  catch(err){
    console.log("Vai com calma cara!"); 
  }
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
   console.log(valueX, valueY)
}

document.body.addEventListener("keydown", async function(evt){
   const motions = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
   motions.forEach( async (element, index) => {
     if(evt.key === motions[index]){
       await motion(evt)
     }
   });
});

setInterval(async ()=>{await player()}, 1000)