import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import ParticleCanvas from '../components/ParticleCanvas';
import TelemetryMarquee from '../components/TelemetryMarquee';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import SidePanel from '../components/SidePanel';
import { sendToN8nWebhook } from '../n8nApi';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => 'session_' + Math.random().toString(36).substring(2, 9));

  const handleSendMessage = async (text: string) => {
    if (!text || !text.trim()) return;

    const userMsg = { role: 'user' as const, content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const aiReplyText = await sendToN8nWebhook(text, sessionId);
      const aiMsg = { role: 'assistant' as const, content: aiReplyText };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Webhook execution failed:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant' as const, content: 'An unexpected error occurred while communicating with the AI agent.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0A0C10] text-slate-100 overflow-hidden relative">
      <ParticleCanvas />
      <TelemetryMarquee />

      <div className="flex-1 flex overflow-hidden relative z-10">
        <Sidebar
          onNewChat={handleNewChat}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />

        <SidePanel
          onSelectPrompt={(promptText) => handleSendMessage(promptText)}
        />
      </div>
    </div>
  );
}