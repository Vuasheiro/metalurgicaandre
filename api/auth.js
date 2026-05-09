// /api/auth.js
export default function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const scope = "repo,user";
  const redirect_uri = `https://${req.headers.host}/api/callback`;
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;
  
  res.redirect(githubAuthUrl);
}
