const socket = io('ws://localhost:4200');

const activityListen = document.querySelector("#activityListen");
const messages = document.querySelector("#messages")

sendMessage = (e) => {
    e.preventDefault();
    console.log(messages.value);
    if (messages.value) {
        socket.emit("message",messages.value)
        messages.value = ""
    }
    messages.focus();
}
document.querySelector('form').addEventListener('submit', sendMessage)

socket.on("message", (data) => {
    console.log(data);
    const list = document.createElement('li')
    list.textContent = data
    document.querySelector('ul').appendChild(list)
})

messages.addEventListener('keypress' ,()=>{
    socket.emit("activity" ,`${socket.id.substring(0,4)} `)
});

socket.on("activity", (data) => {
    console.log(data);
    activityListen.textContent = `${data}`

    // setTimeout(()=>{
    //     activityListen.textContent = ""

    // },4000)
   
})
