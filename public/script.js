async function login(evt) {
  evt.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  const msgEl = document.getElementById("message");

  if (res.ok && data.success) {
    // mark logged-in
    localStorage.setItem("loggedIn", "true");
    // redirect to protected page
    window.location.href = "/secret.html";
  } else {
    msgEl.textContent = data.message || "Login failed";
  }
}


const sky = document.getElementById('sky');
const numStars = 100;

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
