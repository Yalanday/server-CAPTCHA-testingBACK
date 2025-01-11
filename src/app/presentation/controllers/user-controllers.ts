import {Request, Response} from 'express';
import {NextFunction} from "express";
import {addUserBusinessLogic, loginUserBusinessLogic, updateUserBusinessLogic} from "../../business/user-service";
import {UserRequestBody} from "../../../types/types";

export const addUser = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    const {email, password} = req.body;
    req.session.sessionEmail = email;
    req.session.sessionPassword = password;

     try {
        await addUserBusinessLogic(req, res, next, email, password);
    } catch (error) {
        console.error('❌ Error adding user:', error);
        res.status(500).json({message: 'Failed to add user', typeErr: error.message});
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.params.id) {
        res.status(400).json({message: 'Id is required'});
        return;
    }

    try {
        await updateUserBusinessLogic(req.params.id, req.body.name, req.body.email);
        res.status(200).json({message: 'User updated successfully'});
    } catch (error) {
        console.error('❌ Error updating user:', error);
        res.status(500).json({message: 'Failed to update user'});
    }
}

export const loginUser = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    const {email, password} = req.body;
    req.session.sessionEmail = email;
    req.session.sessionPassword = password;
    req.session.isInLogin = true;

    try {
        await loginUserBusinessLogic(req, res, next, email, password);
    } catch (error) {
        console.error('❌ Error adding user:', error);
        res.status(500).json({message: 'Failed to add user', typeErr: error.message});
    }
}

