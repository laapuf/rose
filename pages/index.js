import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login(event) {
    event.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('yes');

//code runner
        localStorage.setItem("loggedIn", "true");
        window.location.href = "/secret.html";


      } else {
        alert(data.message || 'no');
      }
    } catch (err) {
      alert('uhuh');
    }
  }

  useEffect(() => {
    const sky = document.getElementById('sky');
    const numStars = 200;

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
  }, []); // empty dependency array runs once after mount

  return (
    <>
      <Head>
        <title>~</title>
        <link rel="icon" href="/moon.gif" type="image/gif" />
      </Head>

      <div className="sky" id="sky"></div>

      <div id="globe">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif"
          alt="rotating earth"
          style={{ width: '75px', height: '75px' }}
        />
      </div>

      <div id="login" className="left">
        <form onSubmit={login}>
          <input
            type="text"
            id="username"
            placeholder="user"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="pass"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">◄</button>
        </form>
      </div>

      <footer className="footer">© 2025 david. i have no rights.</footer>
    </>
  );
}
