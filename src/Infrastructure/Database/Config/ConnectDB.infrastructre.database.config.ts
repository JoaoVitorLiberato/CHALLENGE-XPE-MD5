import { Dialect, Sequelize } from "sequelize";

const Database = new Sequelize(
  String(process.env.CONNECTION_DB_URL),
  {
    timezone: String(process.env.CONNECTION_DB_TIMEZONE),
    dialect: String(process.env.CONNECTION_DB_DIALECT) as Dialect,
    dialectOptions: {
      useUTC: Boolean(process.env.CONNECTION_DB_USE_UTC),
      ssl: {
        require: Boolean(process.env.CONNECTION_DB_SSL_REQUIRE),
        rejectUnauthorized: Boolean(process.env.CONNECTION_DB_SSL_REJECT_UNAUTHORIZED),
      },
    },
  }
);

const ConnecDatabase = async () => {
  try {
    await Database.authenticate();
    // await Database.sync(); // sincroniza o banco de dados com as entidades do projeto sem apagar os dados e tabelas existentes
    // await Database.sync({ force: true }); // força a sincronização do banco de dados e apaga todas as tabelas e dados existentes
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados", error);
  }
};

export {
  Database,
  ConnecDatabase
};
