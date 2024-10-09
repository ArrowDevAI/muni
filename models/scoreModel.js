const { DataTypes,Sequelize } = require('sequelize');
const sequelize = require('../index');

const Score = sequelize.define('Score', {
  scoreid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',  // Reference to the 'users' table
      key: 'userid'
    }
  },
  courseid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'courses',  // Reference to the 'courses' table
      key: 'courseid'
    }
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'scores',  // Define the explicit table name
  timestamps: false,    // No need for createdAt/updatedAt columns as they aren't in the SQL schema
});

module.exports = Score;