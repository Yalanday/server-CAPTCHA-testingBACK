import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
export const isPasswordCorrect = async (enteredPassword: string, storedHashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(enteredPassword, storedHashedPassword);
};

