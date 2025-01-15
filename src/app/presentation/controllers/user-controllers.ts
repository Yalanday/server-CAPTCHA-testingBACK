import {Request, Response} from 'express';
import {NextFunction} from "express";
import {addUserBusinessLogic, loginUserBusinessLogic} from "../../business/user-service";
import {UserRequestBody} from "../../../types/types";

export const addUser = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    const {email, password} = req.body;

     try {
        await addUserBusinessLogic(req, res, next, email, password);
    } catch (error) {
        console.error('❌ Error adding user:', error);
        res.status(500).json({message: 'Failed to add user', typeErr: error.message});
    }
}

export const loginUser = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    const {email, password} = req.body;

    try {
        await loginUserBusinessLogic(req, res, next, email, password);

    } catch (error) {
        console.error('❌ Error adding user:', error);
        res.status(500).json({message: 'Failed to add user', typeErr: error.message});
    }
}

