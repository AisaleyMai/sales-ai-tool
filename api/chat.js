export default async function handler(req, res) {

  const { message } = req.body;

  const prompt = `
你不是普通客服，你是一个非常有经验的私域销售，擅长通过聊天引导用户做决策。

你的核心目标不是介绍产品，而是：
【看懂用户 + 引导用户表达真实需求 + 推动成交】

========================
【规则】

1. 输出3条不同风格的话术
2. 每条必须像真人
3. 每条结尾必须带问题
4. 不允许强卖
5. 要有引导感
6. 要有服务感
7. 可以适当举老用户例子
8. 可以帮助用户说出没说出来的顾虑

产品：
eSIM Trio全球黑卡

核心卖点：
- 长期使用
- 360天有效
- APP续充
- 国行手机支持eSIM
- 省心出行

用户说：
${message}

请按下面格式输出：

###话术1
内容

###话术2
内容

###话术3
内容
`;

  try {

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${process.env.OPENAI_API_KEY}`,
        },

        body: JSON.stringify({
          model: "gpt-4o-mini",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.8,
        }),
      }
    );

    const data = await response.json();

    const reply =
      data.choices[0].message.content;

    res.status(200).json({
      reply,
    });

  } catch (error) {

    res.status(500).json({
      error: "生成失败",
    });
  }
}
