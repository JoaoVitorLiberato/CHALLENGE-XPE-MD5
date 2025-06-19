import { injectable } from "tsyringe";
import { IOrderRepository } from "../../Domain/Repositories/IOrderRepository.domain.repositories";
import { OrderModel } from "../Database/Models/OrderModel.infrastructure.database.models";
import { OrderEntity } from "../../Domain/Entities/OrderEntity.domain.entities";
import { ClientModel } from "../Database/Models/ClientModel.infrastructure.database.models";

@injectable()
export class OrderRepository implements IOrderRepository {
  async create(order: OrderEntity): Promise<OrderEntity|string> {
    return new Promise((resolve) => {
      OrderModel.create({ ...order }, {
        include: [
          {
            model: ClientModel,
            as: "client",
            attributes: ["id", "name"],
          },
        ],
      })
        .then((order) => resolve(order as unknown as OrderEntity))
        .catch((error) => {
          console.error("[ERROR] OrderRepository - create", error);
          resolve("error-create-order");
        });
    });
  }

  async findAll(): Promise<OrderEntity[]|string> {
    return new Promise((resolve) => {
      OrderModel.findAll({
        include: [
          {
            model: ClientModel,
            as: "client",
            attributes: ["id", "name"],
          },
        ],
      })
        .then((orders) => resolve(orders as unknown as OrderEntity[]))
        .catch((error) => {
          console.error("[ERROR] OrderRepository - findAll", error);
          resolve("error-find-all-orders");
      });
    });
  }

  async findById(id: string): Promise<OrderEntity|string> {
    return new Promise((resolve) => {
      OrderModel.findByPk(id, {
        include: [
          {
            model: ClientModel,
            as: "client",
            attributes: ["id", "name"],
          },
        ],
      })
        .then((order) => resolve(order as unknown as OrderEntity))
        .catch((error) => {
          console.error("[ERROR] OrderRepository - findById", error);
          resolve("error-find-order-by-id");
      });
    });
  }

  async update(id: string, status: string): Promise<OrderEntity|string> {
    return new Promise((resolve) => {
      OrderModel.update({ status }, { where: { id } })
        .then(() => resolve("success-update-order"))
        .catch((error) => {
          console.error("[ERROR] OrderRepository - update", error);
          resolve("error-update-order");
        });
    });
  }

  async delete(id: string): Promise<string> {
    return new Promise((resolve) => {
      OrderModel.destroy({ where: { id } })
        .then(() => resolve(id))
        .catch((error) => {
          console.error("[ERROR] OrderRepository - delete", error);
          resolve("error-delete-order");
        });
    });
  }

  async count(): Promise<number|string> {
    return new Promise((resolve) => {
      OrderModel.count()
        .then((count) => resolve(count as unknown as number))
        .catch((error) => {
          console.error("[ERROR] OrderRepository - count", error);
          resolve("error-count-orders");
        });
    });
  }
}