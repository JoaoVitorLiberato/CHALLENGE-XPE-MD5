import { IWebSocketPort } from "../../Domain/Ports/IWebSocketPort.domain.ports";

export class WebSocketAdapter implements IWebSocketPort {
  constructor(private readonly clients: Set<WebSocket>) {}

  async broadcast (message: string): Promise<void> {
    for (const client of this.clients) {
      try {
        client.send(message);
      } catch (error) {
        console.error("[ERROR WebSocketAdapter - broadcast]", error);
      }
    }
  }
}