// /api/auth.js
// Forçando um novo deploy no Vercel para carregar as variáveis de ambiente
export default function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID || "Ov23ctDcBh0JdO2fPf9H";
  const scope = "repo,user";
  const redirect_uri = `https://${req.headers.host}/api/callback`;
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;
  
  res.redirect(githubAuthUrl);
}
