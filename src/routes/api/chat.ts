import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const WEBHOOK_URL = "https://cme-community.app.n8n.cloud/webhook/AK";
const messageSchema = z.string().trim().min(1).max(20_000);

function extractReply(payload: unknown): string {
  if (typeof payload === "string") return payload.trim();
  if (Array.isArray(payload)) {
    for (const item of payload) {
      const reply = extractReply(item);
      if (reply) return reply;
    }
    return "";
  }
  if (!payload || typeof payload !== "object") return "";

  const record = payload as Record<string, unknown>;
  for (const key of ["reply", "response", "message", "output", "text", "content"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  const data = record["data"];
  if (data && typeof data === "object") return extractReply(data);
  return "";
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = messageSchema.safeParse(await request.text());
        if (!parsed.success) {
          return Response.json(
            { error: "Please enter a message under 20,000 characters." },
            { status: 400 },
          );
        }

        try {
          const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain; charset=utf-8" },
            body: parsed.data,
          });
          const raw = await response.text();

          if (!response.ok) {
            return Response.json(
              { error: "AK could not complete that request. Please try again." },
              { status: response.status >= 500 ? 502 : response.status },
            );
          }

          let payload: unknown = raw;
          try {
            payload = JSON.parse(raw);
          } catch {
            // Plain-text webhook replies are already supported.
          }

          const reply = extractReply(payload);
          if (!reply) {
            return Response.json(
              { error: "AK returned an empty response. Please try again." },
              { status: 502 },
            );
          }

          return Response.json({ reply });
        } catch {
          return Response.json(
            { error: "AK is temporarily unavailable. Please try again shortly." },
            { status: 502 },
          );
        }
      },
    },
  },
});
