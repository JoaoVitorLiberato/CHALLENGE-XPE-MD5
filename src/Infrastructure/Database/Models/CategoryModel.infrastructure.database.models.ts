import { DataTypes } from "sequelize";
import { Database } from "../Config/ConnectDB.infrastructre.database.config";

const CategoryModel = Database.define(
  "categories", 
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
    tableName: "categories",
    timestamps: true,
    underscored: false
  }
);

export { CategoryModel };