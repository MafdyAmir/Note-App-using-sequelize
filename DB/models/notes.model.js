import userSchema from "./users.model.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const noteSchema = sequelize.define(
  "note",
  {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.hasMany(noteSchema, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

noteSchema.belongsTo(userSchema);

export default noteSchema;
