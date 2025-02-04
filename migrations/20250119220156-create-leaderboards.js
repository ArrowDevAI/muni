// migrations/[timestamp]-create-leaderboards.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leaderboards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-incrementing primary key
      },
      leaderboardName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      courseid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'courses', // Reference to the 'Courses' table
          key: 'courseid',  // The primary key of the 'Courses' table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('leaderboards');
  },
};
