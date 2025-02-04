module.exports = (sequelize, DataTypes) => {
    const LeaderboardUser = sequelize.define('LeaderboardUser', {
      // Foreign key to the Leaderboard model
      leaderboardid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Leaderboards',
          key: 'id', // Reference to the 'Leaderboards' table
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      
      // Foreign key to the User model
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id', // Reference to the 'Users' table
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
  
      // Additional attribute: score (example)
      score: {
        type: DataTypes.INTEGER,
        allowNull: true, // score may or may not be provided
      },
  
      // Additional attribute: rank (example)
    
    });
  
    return LeaderboardUser;
  };
  