export default function handler(req, res) {
  const { username, password } = req.body;

  // load your valid creds from env
  const VALID_USER = process.env.USERNAME || "1";
  const VALID_PASS = process.env.PASSWORD || "1"; 

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (username === VALID_USER && password === VALID_PASS) {
    return res.status(200).json({ success: true });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect username or password" });
  }
}
