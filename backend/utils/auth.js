const argon2 = require('argon2');

async function validarSenha(senhaDigitada, hashArmazenado) {
  try {
    return await argon2.verify(hashArmazenado, senhaDigitada);
  } catch (err) {
    console.error('Erro ao validar senha:', err);
    return false;
  }
}

module.exports = { validarSenha };
