import { DataTypes, Model } from "sequelize";
import { Database } from "../Config/ConnectDB.infrastructre.database.config";

class UsersModel extends Model {}

UsersModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
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
    modelName: "users",
    tableName: "users",
    timestamps: true,
    underscored: false,
  }
);

export { UsersModel };