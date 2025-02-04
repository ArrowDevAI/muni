'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leaderboardUsers', {
      leaderboardid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'leaderboards', // Reference to the 'Leaderboards' table
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Reference to the 'Users' table
          key: 'userid',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('leaderboardUsers');
  },
};
