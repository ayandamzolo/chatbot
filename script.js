var conversationHistory = [];
var chatContainer = document.getElementById("chat-container");
var startContainer = document.getElementById("start-container");

function startChat() {
  startContainer.style.display = "none";
  chatContainer.style.display = "block";
  appendMessage("bot", "Hello!");
}

function sendMessage() {
  var userInput = document.getElementById("user-input");
  var message = userInput.value.trim();

  if (message !== "") {
    appendMessage("user", message);
    userInput.value = "";
    processUserMessage(message);
  }
}

var jokes = [
  "Why did the bicycle fall over? It was two-tired!",
  "What did one wall say to the other wall? I'll meet you at the corner.",
  "I'm on a whiskey diet. I've lost three days already!",
  "Why don't scientists trust atoms? Because they make up everything!",
  "I told my wife she should embrace her mistakes. She gave me a hug.",
  "I used to play piano by ear, but now I use my hands and fingers."
];

var newsHeadlines = [
  "Scientists discover new planet with the potential for life.",
  "Global economy shows signs of recovery after recent downturn.",
  "Breakthrough in medical research promises new treatments for common diseases.",
  "Technology giants announce collaboration on a groundbreaking project.",
  "Environmental initiatives gain momentum with new policies and agreements.",
  "Exciting developments in space exploration as new missions are planned."
];

function processUserMessage(userMessage) {
  conversationHistory.push({ sender: "user", message: userMessage });

  if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
    respondToUser("Hi there! How can I help you?");
  } else if (userMessage.toLowerCase().includes("how are you")) {
    respondToUser("I'm just a computer program, but thanks for asking!");
  } else if (userMessage.toLowerCase().includes("weather")) {
    performWeatherAction();
  } else if (userMessage.toLowerCase().includes("news")) {
    performNewsAction();
  } else if (userMessage.toLowerCase().includes("joke")) {
    performJokeAction();
  } else if (userMessage.toLowerCase().includes("calculate")) {
    performCalculationAction(userMessage);
  } else {
    respondToUser("I'm not sure how to respond to that. Ask me something else?");
  }
}

function performJokeAction() {
  appendMessage("bot", "Fetching a random joke...");

  setTimeout(function() {
    var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    appendMessage("bot", randomJoke);
    conversationHistory.push({ sender: "bot", message: randomJoke });
  }, 2000);
}

function performNewsAction() {
  appendMessage("bot", "Fetching the latest news headlines...");

  setTimeout(function() {
    var randomNews = newsHeadlines[Math.floor(Math.random() * newsHeadlines.length)];
    appendMessage("bot", randomNews);
    conversationHistory.push({ sender: "bot", message: randomNews });
  }, 2000);
}

function performWeatherAction() {
  appendMessage("bot", "Checking the weather...");

  setTimeout(function() {
    var weatherResponse = "The weather is currently sunny. How can I assist you further?";
    appendMessage("bot", weatherResponse);
    conversationHistory.push({ sender: "bot", message: weatherResponse });
  }, 1500);
}

function performCalculationAction(userMessage) {
  var expression = userMessage.replace(/[^-()\d/*+.]/g, '');

  try {
    var result = eval(expression);
    appendMessage("bot", "The result is: " + result);
    conversationHistory.push({ sender: "bot", message: "The result is: " + result });
  } catch (error) {
    appendMessage("bot", "Sorry, I couldn't calculate that. Please provide a valid expression.");
    conversationHistory.push({
      sender: "bot",
      message: "Sorry, I couldn't calculate that. Please provide a valid expression."
    });
  }
}


function respondToUser(response) {
  appendMessage("bot", response);
  conversationHistory.push({ sender: "bot", message: response });
}

function appendMessage(sender, text, isAction = false) {
  var chatMessages = document.getElementById("chat-messages");
  var messageDiv = document.createElement("div");
  messageDiv.className = sender + (isAction ? " action" : "");
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}
