import tokenManager from '../utils/TokenManager';
import { Request, Response, NextFunction } from 'express';

const checkToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (!tokenManager.accessToken) {
        await tokenManager.initTokens();
    } else {
        if (tokenManager.isTokenExpired(tokenManager.accessToken)) {
            await tokenManager.refreshTokens();
        }
    }
    next();
};

export default checkToken;
