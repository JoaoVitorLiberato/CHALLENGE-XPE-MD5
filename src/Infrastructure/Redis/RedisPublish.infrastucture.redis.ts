import Redis from "ioredis";
import { injectable } from "tsyringe";
import { IEventPublishContract } from "../../Application/Contracts/IEventPublishContract.application.contracts";
import { OrderEntity } from "../../Domain/Entities/OrderEntity.domain.entities";

@injectable()
export class RedisPublish implements IEventPublishContract {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({ host: "redis", port: 6379 });
  }

  async publish (order: OrderEntity): Promise<void> {
    try {
      await this.client.publish(String(process.env.APPLICAITON_REDIS_CHANNEL), JSON.stringify(order));
    } catch (error) {
      console.error("[ERROR] RedisPublish - publish", error);
    }
  }
}
