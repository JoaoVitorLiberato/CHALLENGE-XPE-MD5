import { DataTypes, Model } from "sequelize";
import { Database } from "../Config/ConnectDB.infrastructre.database.config";
import { ClientModel } from "./ClientModel.infrastructure.database.models";


class OrderModel extends Model {}

OrderModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.UUID,
      references: {
        model: ClientModel,
        key: "id",
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: Database,
    modelName: "orders",
    tableName: "orders",
    timestamps: true,
    underscored: false,
  }
);

OrderModel.belongsTo(ClientModel, { foreignKey: "clientId" });
ClientModel.hasMany(OrderModel, { foreignKey: "clientId" });

export { OrderModel };
