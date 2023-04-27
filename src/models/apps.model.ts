// @ts-ignore
module.exports = (sequelize: any, Sequelize: any) => {
  return sequelize.define("apps", {
    appid: {
      primaryKey: true,
      type: Sequelize.STRING
    },
    secret_key: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  });
};
