import {addUserToDB, loginUserBD, updateUserData} from "../repositories/userRepositories";
import {Validation} from "./business-helpers/validation";

const validateUserCredentials = (email: string, password: string): void => {
    if (!email || !password) {
        throw new Error('Email и пароль обязательны');
    }

    if (!Validation.email(email)) {
        throw new Error('Неверный формат email');
    }

    if (!Validation.password(password)) {
        throw new Error('Неверный формат пароля');
    }
};

export const addUserBusinessLogic = async (email: string, password: string): Promise<number> => {
    validateUserCredentials(email, password)
    return await addUserToDB(email, password);
}

export const loginUserBusinessLogic = async (email: string, password: string): Promise<number> => {
    validateUserCredentials(email, password)
    return await loginUserBD(email, password);
}

export const updateUserBusinessLogic = async (id: string, name: string, email: string): Promise<void> => {
    await updateUserData(id, email);
}

