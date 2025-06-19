export interface IWebSocketPort {
  broadcast(message: string): Promise<void>;
}