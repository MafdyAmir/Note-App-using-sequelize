import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const userSchema = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      uique: true,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
