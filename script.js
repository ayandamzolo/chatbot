let conversationHistory = [];
const chatContainer = document.getElementById("chat-container");
const startContainer = document.getElementById("start-container");
var responseMessages = {
  greetings: [
    "Hi there! How can I help you?",
    "Hey there! Want me to make your day with jokes, or help you with some math calculations."
  ],
  unknown: "I'm not sure how to respond to that. Ask me about jokes, or calculations.",
  weatherPrompt: "Please enter your location for weather information.",
  fetchingWeather: "Checking the weather...",
  weatherError: "Sorry, there was an error fetching the weather.",
  jokeFetching: "Fetching a random joke...",
  jokeError: "Sorry, I couldn't fetch a joke at the moment."
};

function startChat() {
  startContainer.style.display = "none";
  chatContainer.style.display = "block";
  respondToUser(responseMessages.greetings[1]);
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

const userInput = document.getElementById("user-input");
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }});

function processUserMessage(userMessage) {
  conversationHistory.push({ sender: "user", message: userMessage });

  if (userMessage.toLowerCase().includes("hello") && userMessage.length === 5|| userMessage.toLowerCase().includes("hi") && userMessage.length === 2 || userMessage.toLowerCase().includes("hey") && userMessage.length === 3) {
    respondToUser(responseMessages.greetings[0]);
  } else if (userMessage.toLowerCase().includes("how are you")) {
    respondToUser("I'm just a computer program, but thanks for asking!");
  } else if (userMessage.toLowerCase().includes("weather")) {
    askForLocation();
  } else if (userMessage.toLowerCase().includes("news")) {
    performNewsAction();
  } else if (userMessage.toLowerCase().includes("joke")) {
    performJokeAction();
  }else if (
    userMessage.toLowerCase().includes("calculate") ||
    userMessage.toLowerCase().includes("what is") ||
    userMessage.toLowerCase().includes("give me the") ||
    userMessage.toLowerCase().includes("+") ||
    userMessage.toLowerCase().includes("-") ||
    userMessage.toLowerCase().includes("*") ||
    userMessage.toLowerCase().includes("/")
  ) {
    performCalculationAction(userMessage);
  } else {
    respondToUser(responseMessages.unknown);
  }
}

/*function askForLocation() {
  respondToUser("Please enter your location for weather information.");
}

function processLocation(location) {
  performWeatherAction(location);
}

function performWeatherAction(location) {
  var apiKey = process.env.WEATHER_API_KEY;

  var apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  appendMessage("bot", "Checking the weather...");

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      var weatherResponse = `The current weather in ${data.location.name} is ${data.current.condition.text} with a temperature of ${data.current.temp_c}°C.`;
      appendMessage("bot", weatherResponse);
      conversationHistory.push({ sender: "bot", message: weatherResponse });
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      appendMessage("bot", "Sorry, there was an error fetching the weather.");
      conversationHistory.push({ sender: "bot", message: "Sorry, there was an error fetching the weather." });
    });
}

var newsHeadlines = [
  "Scientists discover new planet with the potential for life.",
  "Global economy shows signs of recovery after recent downturn.",
  "Breakthrough in medical research promises new treatments for common diseases.",
  "Technology giants announce collaboration on a groundbreaking project.",
  "Environmental initiatives gain momentum with new policies and agreements.",
  "Exciting developments in space exploration as new missions are planned."
];
*/

function performJokeAction() {
  var apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

  appendMessage("bot", "Fetching a random joke...");

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      var jokeResponse;
      if (data.type === 'single') {
        jokeResponse = data.joke;
      } else if (data.type === 'twopart') {
        jokeResponse = `${data.setup} ${data.delivery}`;
      } else {
        jokeResponse = "Oops, I couldn't fetch a joke this time.";
      }
      appendMessage("bot", jokeResponse);
      conversationHistory.push({ sender: "bot", message: jokeResponse });
    })
    .catch(error => {
      console.error('Error fetching joke:', error);
      appendMessage("bot", "Sorry, I couldn't fetch a joke at the moment.");
      conversationHistory.push({ sender: "bot", message: "Sorry, I couldn't fetch a joke at the moment." });
    });
  }

/*function performNewsAction() {
  appendMessage("bot", "Fetching the latest news headlines...");

  setTimeout(function() {
    var randomNews = newsHeadlines[Math.floor(Math.random() * newsHeadlines.length)];
    appendMessage("bot", randomNews);
    conversationHistory.push({ sender: "bot", message: randomNews });
  }, 2000);
}
*/

function performCalculationAction(userMessage) {
  var mathRegex = /(?:what is|calculate|give me (?:the )?(sum|difference|product) of)(?:\s*(-?\d+(\.\d+)?))?(?:\s*(plus|add|\+|minus|subtract|\-|times|multiplied by|\*|divided by|over|\/)\s*(-?\d+(\.\d+)?))?/i;

  var match = userMessage.match(mathRegex);

  if (match) {
    var operation = match[0].toLowerCase(); // Full matched operation
    var num1 = parseFloat(match[2]); // First number
    var operator = match[4]; // Mathematical operator (+, -, *, /)
    var num2 = parseFloat(match[5]); // Second number (if present)

    // Check if the first number is valid
    if (isNaN(num1)) {
      respondToUser("Invalid number provided. Please provide a valid numerical value.");
      return;
    }

    // Map operator synonyms to standard mathematical symbols
    switch (operator.toLowerCase()) {
      case 'plus':
      case 'add':
      case 'and':
      case '+':
        operator = '+';
        break;
      case 'minus':
      case 'subtract':
      case 'from':
      case '-':
        operator = '-';
        break;
      case 'times':
      case 'multiplied by':
      case '*':
        operator = '*';
        break;
      case 'divided by':
      case 'over':
      case '/':
        operator = '/';
        break;
      default:
        respondToUser("Invalid operator or operation. Please try again.");
        return;
    }

    var result;
    switch (operator) {
      case '+':
        if (!isNaN(num2)) {
          result = num1 + num2;
        } else {
          respondToUser("Missing or invalid second number for addition.");
          return;
        }
        break;
      case '-':
        if (!isNaN(num2)) {
          result = num1 - num2;
        } else {
          respondToUser("Missing or invalid second number for subtraction.");
          return;
        }
        break;
      case '*':
        if (!isNaN(num2)) {
          result = num1 * num2;
        } else {
          respondToUser("Missing or invalid second number for multiplication.");
          return;
        }
        break;
      case '/':
        if (!isNaN(num2) && num2 !== 0) {
          result = num1 / num2;
        } else if (num2 === 0) {
          respondToUser("Cannot divide by zero. Please provide a valid division.");
          return;
        } else {
          respondToUser("Missing or invalid second number for division.");
          return;
        }
        break;
      default:
        respondToUser("Invalid operation. Please try again.");
        return;
    }

    var response = `The result of "${operation}" is ${result}.`;
    respondToUser(response);
  } else {
    respondToUser("Sorry, I couldn't understand the math expression. Please try again.");
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
