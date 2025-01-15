// types
import {ResultSetHeader, RowDataPacket} from "mysql2";  // Подключаем актуальные типы
import {Connection} from "mysql2/promise";
import {connectToDB} from "../../db/db";
import {hashPassword, isPasswordCorrect} from "./repo-helpers";

export const addUserToDB = async (email: string, password: string): Promise<number> => {
    let connection: Connection;

    console.log('ORIGINAL', password)
    password = await hashPassword(password);
    console.log('NEW', password)

    try {
        connection = await connectToDB();
        const [result] = await connection.execute<ResultSetHeader>('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
        return result.insertId;
    } catch (error) {
        if (error.errno && error.errno === 1062) {
            error.message = "Пользователь с таким email уже существует"
        }
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (closeError) {
                console.error('❌ Error closing connection:', closeError);
            }
        }
    }
}


export const loginUserBD = async (email: string, password: string): Promise<number> => {
    let connection: Connection;
    try {
        connection = await connectToDB();

        // Выполняем запрос для поиска пользователя по email
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);

        // Проверяем, если пользователя не найдено
        if (rows.length === 0) {
            throw new Error('Пользователь с таким email не найден');
        }

        // Получаем данные пользователя
        const user = rows[0];

        const passwordMatch = await isPasswordCorrect(password, user.password);

        if (!passwordMatch) {
            throw new Error('Неверный пароль');
        }

        return user.id; // Если пароль совпадает, возвращаем true
    } catch (error) {
        console.error('Ошибка при входе:', error.message);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.end(); // Закрываем соединение с БД
            } catch (closeError) {
                console.error('❌ Ошибка при закрытии соединения:', closeError);
            }
        }
    }
}
