async function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  const data = await response.json();
  if (response.ok) {
    alert('Login realizado com sucesso!');
    // Redirecione ou armazene o token
  } else {
    alert(data.message);
  }
}
