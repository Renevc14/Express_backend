import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:{
                msg: 'Ingrese tarea'
            },
        }
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

