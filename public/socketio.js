const socket = io('ws://localhost:4200');

sendMessage = (e) => {
    e.preventDefault();
    const messages = document.getElementById("messages")
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