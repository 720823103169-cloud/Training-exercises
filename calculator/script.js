const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons");

// Button layout (dynamic UI)
const buttons = [
  "C", "⌫", "/", "*",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "=",
  "0", ".", 
];

// Create buttons dynamically
buttons.forEach(text => {
  const btn = document.createElement("button");
  btn.textContent = text;

  // Style categories
  if (["/", "*", "-", "+"].includes(text)) btn.classList.add("operator");
  if (text === "=") btn.classList.add("equal");
  if (text === "C") btn.classList.add("clear");

  // Click actions
  btn.addEventListener("click", () => handleClick(text));

  buttonsContainer.appendChild(btn);
});

function handleClick(value) {
  if (value === "C") {
    display.value = "";
  }
  else if (value === "⌫") {
    display.value = display.value.slice(0, -1);
  }
  else if (value === "=") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  }
  else {
    display.value += value;
  }
}