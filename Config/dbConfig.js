module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "Gadibazzar",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  // const dbConfig = {
  //   DB: 'Gadibazzar',
  //   USER: 'root',
  //   PASSWORD: '',
  //   HOST: 'localhost', 
  //   dialect: 'mysql',
  //   pool: {
  //     max: 5,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000,
  //   },
  // };
  
  // module.exports = dbConfig;
  