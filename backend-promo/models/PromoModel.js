import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Promo = db.define(
  "promo",
  {
    name: DataTypes.STRING,
    Image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Promo;

(async () => {
  await db.sync();
})();
