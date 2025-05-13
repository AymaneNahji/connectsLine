const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Contact = sequelize.define('Contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.ENUM(
            'web-design',
            'e-commerce',
            'custom-development',
            'customer-support',
            'lead-generation',
            'outbound-calls',
            'demand-job-application',
            'other'
        ),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Contact; 