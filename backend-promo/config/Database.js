import { Sequelize } from "sequelize";

const db = new Sequelize("eduspace_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
