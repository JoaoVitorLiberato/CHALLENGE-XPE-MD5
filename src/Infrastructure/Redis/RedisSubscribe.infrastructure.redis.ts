import Redis from "ioredis";
import { injectable } from "tsyringe";
import { IEventSubscribeContract } from "../../Application/Contracts/IEventSubscribeContract.application.contracts";
import { IWebSocketPort } from "../../Domain/Ports/IWebSocketPort.domain.ports";  

interface IWebSocket extends IWebSocketPort {}

@injectable()
export class RedisSubscribe implements IEventSubscribeContract {
  private readonly channel = "pedidos"

  constructor(
    private readonly redis: Redis,
    private readonly webSocket: IWebSocket
  ) {}

  async subscribe(): Promise<void> {
    await this.redis.subscribe(String(process.env.APPLICAITON_REDIS_CHANNEL));

    this.redis.on("message", (channel:string, message:string) => {
      if (String(this.channel) === String(channel)) {
        this.webSocket.broadcast(message);
      }
    });
  }
}
