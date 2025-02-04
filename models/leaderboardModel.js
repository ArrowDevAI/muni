module.exports = (sequelize, DataTypes) => {
    const Leaderboards = sequelize.define('Leaderboards', {
      leaderboardName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      courseid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'courseid',
        },
      },
    });
  
    Leaderboards.associate = (models) => {
      // A leaderboard can have many users through the LeaderboardUser table
      Leaderboards.belongsToMany(models.Users, {
        through: models.LeaderboardUser,
        foreignKey: 'leaderboardid',
        otherKey: 'userid',
      });
  
      // A leaderboard belongs to a course
      Leaderboards.belongsTo(models.Courses, {
        foreignKey: 'courseid',
        as: 'course',
      });
    };
  
    return Leaderboards;
  };
  