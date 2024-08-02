const socket = io('ws://localhost:4200');

const person = document.querySelector("#name");
const chatRoom = document.querySelector("#chatroom");
const activityListen = document.querySelector("#activityListen");
const messages = document.querySelector("#messages");
const messagesList = document.querySelector(".myList");
const CommonChat = document.querySelector("#CommonChat");
const containerFlex = document.querySelector(".container-flex");
const afterRoom = document.querySelector(".afterroom");
const textonly = document.querySelector("#textonly");

let storedName = ""
let storedchatRoom = ""

sendMessage = (e) => {
    e.preventDefault();
    console.log(messages.value);
    console.log(person.value);
    console.log(chatRoom.value);
    if (person.value && chatRoom.value && messages.value) {
        socket.emit("message", {
            name: person.value,
            chatRoom: chatRoom.value,
            text: messages.value
        })
    }
    messages.focus();
    storedName = person.value;
    storedchatRoom = chatRoom.value
    socket.emit("chatroom", chatRoom.value)

    const chatroomList = chatRoom.value;
    if (chatroomList.value !== "") {
        afterRoom.classList.remove("hidden");
        containerFlex.classList.add("hidden");
    } else {
        afterRoom.classList.add("hidden");
        containerFlex.classList.remove("hidden");
    }
}
document.querySelector('form').addEventListener('submit', sendMessage)


const sendMessageOnly = () => {
    if(textonly.value){
        socket.emit("message", {
            text: textonly.value,
            name: storedName,
            chatRoom: storedchatRoom
        })
    }
    textonly.value = ""
}
socket.on("commonchat", (data) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${data.text}`;
    CommonChat.appendChild(listItem);
})
socket.on("chatroom", (data) => {
    console.log(data);
    const listItem = document.createElement('li');
    listItem.innerHTML = `Welcome  ${data.name} to ${data.chatRoom} chatroom `;
    messagesList.appendChild(listItem);
})

socket.on("message", (data) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>Welcome to the Chat Room ${data.chatRoom} ${data.name}</strong> `;
    listItem.innerHTML = `<strong>${data.name}</strong> (${data.date}): ${data.text} `;
    messagesList.appendChild(listItem);
    messagesList.scrollTop = messagesList.scrollHeight; // Scroll to the bottom
});

socket.on("disconnected" ,(data)=>{
    console.log(data);
    const listItem = document.createElement('li');
    listItem.innerHTML = `${data}`
    messagesList.appendChild(listItem);
})

messages.addEventListener('keypress', () => {
    socket.emit("activity", `${socket.id}`)
});

socket.on("activity", (data) => {
    console.log(data);
    activityListen.textContent = `${data}`

    setTimeout(() => {
        activityListen.textContent = ""

    }, 5000)

})


