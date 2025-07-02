let pinNumber = "";

function pin(number) {
  if (pinNumber.length >= 4) {
    pinNumber = String(number);
  } else {
    pinNumber += String(number);
  }
  document.getElementById("screen").textContent = pinNumber;
}

async function entered() {
  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin: pinNumber }),
  });

  const data = await res.json();
  if (data.success) {
    loadSecret();
  } else {
    document.getElementById("message").textContent = data.message || "Login failed";
  }

  pinNumber = "";
  document.getElementById("screen").textContent = "";
}

async function loadSecret() {
  const res = await fetch("/secret");
  const data = await res.json();
  const secret = document.getElementById("secret");

  if (data.success) {
    secret.innerHTML = data.html;
  } else {
    secret.innerHTML = "<p>Access denied.</p>";
  }
}

async function logout() {
  await fetch("/logout");
  document.getElementById("secret").innerHTML = "";
  document.getElementById("message").textContent = "Logged out.";
}



const sky = document.getElementById('sky');
const numStars = 300;

for (let i = 0; i < numStars; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  // Random position
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  // Random animation delay for twinkling
  star.style.animationDelay = `${Math.random() * 5}s`;

  // Optional: slightly random size for realism
  const size = Math.random() * 2 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  
  sky.appendChild(star);
}
