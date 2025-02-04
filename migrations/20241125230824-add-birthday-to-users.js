'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the 'birthday' column already exists in the 'users' table
    const hasColumn = await queryInterface.sequelize.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'birthday';"
    );

    // If the column does not exist, add it
    if (hasColumn[0].length === 0) {
      await queryInterface.addColumn('users', 'birthday', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'birthday' column if it exists
    await queryInterface.removeColumn('users', 'birthday');
  }
};
