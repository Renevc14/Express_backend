import { Status } from "../constants/index.js";
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Task } from './task.js';
import logger from "../logs/logger.js";
import { encriptar } from '../common/bycript.js'

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull:{
                msg: 'Ingrese nombre de usuario'
            },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:{
                msg: 'Ingrese password'
            },
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: `Debe ser ${Status.ACTIVE} o ${Status.INACTIVE}`
            }
        }
    },
});

//Forma automática
// un usuario tiene muchas tareas
User.hasMany(Task)
//pero una tareia pertenece a un usuario
Task.belongsTo(User)

//Forma manual
//Un usuario tiene muchas tareas
// User.hasMany(Task, {
//     foreignKey: 'userId',
//     sourceKey: 'id',
// });
// //pero una tarea pertenece a un usuario
// Task.belongsTo(User, {
//     foreignKey: 'userId',
//     sourceKey: 'id',
// });

User.beforeCreate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    }catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña');
    }
})

User.beforeUpdate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    }catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña');
    }
})