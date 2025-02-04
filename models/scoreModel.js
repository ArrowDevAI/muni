module.exports = (sequelize, DataTypes) => {
  const Scores = sequelize.define('Scores', {
    scoreid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Reference to the 'users' table
        key: 'userid',
      },
    },
    courseid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses', // Reference to the 'courses' table
        key: 'courseid',
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'scores', // Explicit table name
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt', 
  });

  // Define associations
  Scores.associate = (models) => {
    // Each score belongs to a single user
    Scores.belongsTo(models.Users, {
      foreignKey: 'userid', // Foreign key in the Scores table
      as: 'user',           // Alias for the association
    });

    // Each score is associated with a single course
    Scores.belongsTo(models.Courses, {
      foreignKey: 'courseid', // Foreign key in the Scores table
      as: 'course',           // Alias for the association
    });
  };

  return Scores;
};
