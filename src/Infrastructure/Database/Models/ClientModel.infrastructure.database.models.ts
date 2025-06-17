import { DataTypes, Model } from "sequelize";
import { Database } from "../Config/ConnectDB.infrastructre.database.config";

class ClientModel extends Model {}

ClientModel.init(
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
    modelName: "clients",
    tableName: "clients",
    timestamps: true,
    underscored: false,
  }
);

export { ClientModel };
