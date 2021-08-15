/* Imports */
const SequlizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define("Test", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required",
        },
      },
    },
    slug: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
  });
  SequlizeSlugify.slugifyModel(Test, { source: ["name"] });

  return Test;
};
