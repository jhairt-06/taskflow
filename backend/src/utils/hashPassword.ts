import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (password: string) => {
    try {
        return await bcrypt.hash(password, saltRounds);

    } catch (error) {
        console.error('Error hashing password', error)
        return null;
    }
}

export const verifyPassword = async (storedPassword: string, password: string) => {
    try {
        return await bcrypt.compare(password, storedPassword)

    } catch (error) {
        console.error('Error verifying password', error)
        return null;
    }
}
