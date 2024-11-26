'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the `birthday` column to the `users` table
    await queryInterface.addColumn('users', 'birthday', {
      type: Sequelize.DATE, // You can also use Sequelize.STRING if you want to store a string like 'YYYY-MM-DD'
      allowNull: true, // Adjust this to `false` if you want the column to be required
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If you need to undo this migration, drop the `birthday` column
    await queryInterface.removeColumn('users', 'birthday');
  }
};
