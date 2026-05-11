// /api/callback.js
export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return res.status(400).send('Código de autorização não fornecido');
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();
    const { access_token, error } = data;

    if (error) {
      return res.status(400).send(`Erro na autenticação: ${error}`);
    }

    // Script padrão para o Decap CMS receber o token
    const content = `
      <!DOCTYPE html>
      <html>
        <head><title>Autenticando...</title></head>
        <body>
          <script>
            (function() {
              function recieveMessage(e) {
                window.opener.postMessage(
                  'authorization:github:success:{"token":"${access_token}","provider":"github"}',
                  e.origin
                );
              }
              window.addEventListener("message", recieveMessage, false);
              window.opener.postMessage("authorizing:github", "*");
            })()
          </script>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);
  } catch (error) {
    console.error("Erro no callback:", error);
    res.status(500).send('Erro interno no servidor de autenticação');
  }
}
