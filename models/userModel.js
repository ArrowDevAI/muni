const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    googleid: {
      type: DataTypes.STRING(50),
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'users',     // Explicit table name
    timestamps: true,       // Sequelize will manage createdAt/updatedAt
    underscored: true,      // Auto-map camelCase to snake_case
    createdAt: 'createdat', // Map to the database column
    updatedAt: 'updatedat'  // Map to the database column
  });

  // Static method to hash a password
  Users.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);  
  };

  // Instance method to validate the password
  Users.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Users;
};
