export const verifyToken = async (token: string) => {
    return token === process.env.VALIDTOKEN;
}