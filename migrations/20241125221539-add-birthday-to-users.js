'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column already exists before trying to add it
    const columns = await queryInterface.describeTable('users');
    if (!columns.birthday) {
      await queryInterface.addColumn('users', 'birthday', {
        type: Sequelize.DATE,
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'birthday' column if needed
    await queryInterface.removeColumn('users', 'birthday');
  }
};