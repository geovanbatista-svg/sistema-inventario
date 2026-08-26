const express = require('express');
const router = express.Router();
const argon2 = require('argon2');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Busca o usuário e o hash do .env. Se não existirem, deixa vazio para bloquear o acesso.
  const correctUsername = process.env.ADMIN_USERNAME;
  const correctPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  // Se o .env não foi carregado corretamente por algum motivo, rejeita o login na hora
  if (!correctUsername || !correctPasswordHash) {
    console.error("ERRO CRÍTICO: Variáveis de ambiente não foram carregadas!");
    return res.status(500).json({ success: false, message: 'Erro interno de configuração' });
  }

  try {
    // O argon2.verify compara a senha digitada pelo usuário com o hash criptografado com segurança total
    const isPasswordCorrect = await argon2.verify(correctPasswordHash, password);

    if (username === correctUsername && isPasswordCorrect) {
      return res.json({ success: true, user: { username } });
    } else {
      return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erro interno na autenticação' });
  }
});

module.exports = router;

