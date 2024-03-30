// models/user.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model { }
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'User'
    });
    return User;
};
