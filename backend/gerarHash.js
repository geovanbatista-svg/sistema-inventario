// gerarHash.js
const argon2 = require('argon2');

async function gerarHash() {
  const senha = 'admin123'; // Sua senha em texto puro
  const hash = await argon2.hash(senha);
  console.log('Hash gerado:', hash);
}

gerarHash();
