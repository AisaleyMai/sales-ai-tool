export default async function handler(req, res) {
  const { message } = req.body;

  const prompt = `
你是一个资深私域销售，请根据用户的话生成3条高转化话术。

要求：
1. 不强卖，要像真人
2. 必须有引导用户继续回复的问题
3. 语气要真诚、帮助用户
4. 输出3条不同风格话术（分段）

用户说：
${message}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();

  res.status(200).json({
    reply: data.choices[0].message.content
  });
}
