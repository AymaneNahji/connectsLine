const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Newsletter = sequelize.define('Newsletter', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    timestamps: true
});

module.exports = Newsletter;