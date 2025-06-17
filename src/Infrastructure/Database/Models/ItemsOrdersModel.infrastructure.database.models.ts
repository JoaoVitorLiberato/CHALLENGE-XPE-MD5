import { DataTypes, Model } from "sequelize";
import { Database } from "../Config/ConnectDB.infrastructre.database.config";
import { OrderModel } from "./OrderModel.infrastructure.database.models";
import { ProductModel } from "./ProductModel.infrastructure.database.models";

class ItemsOrdersModel extends Model {}

ItemsOrdersModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: OrderModel,
        key: "id",
      }
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: ProductModel,
        key: "id",
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: "itemsOrder",
    tableName: "itemsOrder",
    timestamps: true,
    underscored: false,
  }
);

ItemsOrdersModel.belongsTo(OrderModel, { foreignKey: "orderId" });
OrderModel.hasMany(ItemsOrdersModel, { foreignKey: "orderId" });

ItemsOrdersModel.belongsTo(ProductModel, { foreignKey: "productId" });
ProductModel.hasOne(ItemsOrdersModel, { foreignKey: "productId" });

export { ItemsOrdersModel };
