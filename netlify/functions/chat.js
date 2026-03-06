export async function handler(event) {

  if (!event.body) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: "Chatbot is running. Send a POST request with a message."
      })
    };
  }

  const body = JSON.parse(event.body);
  const message = body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an assistant for Ajay Kumar's portfolio. Ajay is a Scrum Master and Delivery Manager experienced in Agile delivery, sprint planning, stakeholder management, and Power BI reporting."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      reply: data.choices[0].message.content
    })
  };
}
