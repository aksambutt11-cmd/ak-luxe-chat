const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/your-production-id';

export async function sendToN8nWebhook(messageText: string, sessionId: string = 'default-session') {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'sendMessage',
        message: messageText,
        chatId: sessionId,
        sessionId: sessionId,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const replyText =
      data.output ||
      data.text ||
      data.response ||
      data.message ||
      (Array.isArray(data) && data[0]?.output) ||
      (typeof data === 'string' ? data : JSON.stringify(data));

    return replyText;
  } catch (error) {
    console.error('Error connecting to n8n AI Agent:', error);
    return '⚠️ Unable to connect to n8n AI Agent. Please verify your webhook URL and backend connectivity.';
  }
}