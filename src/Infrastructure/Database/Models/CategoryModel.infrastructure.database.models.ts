import { DataTypes, Model } from "sequelize";
import { Database } from "../Config/ConnectDB.infrastructre.database.config";

class CategoryModel extends Model {}

CategoryModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
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
    modelName: "categories",
    tableName: "categories",
    timestamps: true,
    underscored: false
  }
);

export { CategoryModel };
