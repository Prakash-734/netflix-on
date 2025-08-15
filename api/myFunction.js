export default async function handler(req, res) {
  const response = await fetch("https://api.groq.com/some-endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({ prompt: "Hello Groq" })
  });

  const data = await response.json();
  res.status(200).json(data);
}
