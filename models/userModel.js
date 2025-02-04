const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
      validate: {
        notEmpty: true,
      },
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat',
  });

  // Static method to hash a password
  Users.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  };

  // Instance method to validate the password
  Users.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Add the associate method
  Users.associate = (models) => {
    // User has many scores
    Users.hasMany(models.Scores, {
      foreignKey: 'userid', // The foreign key in the Scores table
      as: 'scores'          // Alias for the relationship
    });

    Users.belongsToMany(models.Leaderboards, { 
      through: models.LeaderboardUser, 
      foreignKey: 'userid',
      as: 'leaderboards'
    });

    // User belongs to many courses (through the join table 'user_courses')
    Users.belongsToMany(models.Courses, {
      through: 'user_courses',  // The join table
      foreignKey: 'userid',      // Foreign key in the join table for Users
      as: 'courses'              // Alias for the relationship
    });
  };

  return Users;
};
