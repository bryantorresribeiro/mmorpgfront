const input = document.querySelector(".chatInput")
const button = document.querySelector(".chatButton")
const frame = document.querySelector(".frame")
const xaropinho = document.querySelector(".xaropinho")
function submit(){
   if(input.value==="/xaropinho"){
     xaropinho.play()
   }else{
    const nick = localStorage.getItem("nick")
    fetch(`https://mmorpgtestando.herokuapp.com/chat/create`,
    {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({nick: nick, message: input.value}),
    })
   }
   input.value = ""
}

button.addEventListener("click", submit)

async function message(){
    const chat = await fetch(`https://mmorpgtestando.herokuapp.com/chat`,{method: 'GET'})
    return await chat.json()
}

async function render(){
    frame.innerHTML = ""
    const chat = await message()
    chat.forEach(data => {
        const div = document.createElement("div")
        div.className = "box"
        const nick = document.createElement("strong")
        const message = document.createElement("p")
        nick.innerText = data.nick+":"
        message.innerText = data.message
        div.appendChild(nick)
        div.appendChild(message)
        frame.appendChild(div)
    });
}

setInterval(async ()=>{await render()}, 5000)
