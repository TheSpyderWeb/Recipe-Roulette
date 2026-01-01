export function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() !== "") {
    appendMessage(userInput, "user");
    document.getElementById("user-input").value = "";

    setTimeout(() => {
      const botResponse = generateBotResponse(userInput);
      appendMessage(botResponse, "bot");
    }, 1000);
  }
}

export function appendMessage(message, sender) {
  const chatDisplay = document.getElementById("chat-display");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", `${sender}-message`);
  messageDiv.innerHTML = `<p>${message}</p>`;
  chatDisplay.appendChild(messageDiv);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

export function generateBotResponse(userMessage) {
  const responses = {
    "hello": "Hi! Looking for a recipe?",
    "what's for dinner?": "Try pasta or a burger!",
    "what is your favorite food?": "If I could taste, pizza would be my favorite!",
    "what is a good recipe?": "Spaghetti carbonara is a classic. Want the recipe?",
    "tell me a food fact": "Honey never spoils! Archaeologists found 3000+ year old honey.",
    "bye": "Goodbye! Come back for more food talk!"
  };
  const lowerCaseMessage = userMessage.toLowerCase();
  return responses[lowerCaseMessage] || "Sorry, I didn't understand that.";
}
