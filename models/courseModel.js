module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define('Course', {
    courseid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    par: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(14),
      allowNull: false
    }
  }, {
    tableName: 'courses',  // Explicitly map to the "courses" table
    timestamps: false      // No "createdAt" or "updatedAt" in this table
  });

  return Courses;
};

