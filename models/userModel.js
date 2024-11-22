const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../index');
const bcrypt = require('bcrypt')

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
    defaultValue: Sequelize.literal('NOW()')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }
}, {
  tableName: 'users',  // Define the explicit table name
  timestamps: true,    // Sequelize will expect createdAt/updatedAt columns by default
  createdAt: 'createdat',  // Map to your SQL column names
  updatedAt: 'updatedat'
});

Users.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);  
};

// Instance method to validate the password
Users.prototype.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);  // Use lowercase 'password' as defined in the model
};

module.exports = Users;
