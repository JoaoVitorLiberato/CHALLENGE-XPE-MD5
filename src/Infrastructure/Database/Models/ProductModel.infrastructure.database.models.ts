import { DataTypes, Model } from "sequelize";
import { Database } from "../Config/ConnectDB.infrastructre.database.config";
import { CategoryModel } from "./CategoryModel.infrastructure.database.models";

class ProductModel extends Model {}

ProductModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CategoryModel,
        key: "id",
      },
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
    modelName: "products",
    tableName: "products",
    timestamps: true,
    underscored: false
  }
);



CategoryModel.hasMany(ProductModel);
ProductModel.belongsTo(CategoryModel, { foreignKey: "categoryId" });

export { ProductModel };