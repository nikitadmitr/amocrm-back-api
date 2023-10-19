import jwt, { JwtPayload } from 'jsonwebtoken';

import axiosInstance from './axiosInstance';

type Token = string | null;

interface ExchangeTokensParams {
    client_id?: string;
    client_secret?: string;
    redirect_uri?: string;
    grant_type?: 'refresh_token' | 'authorization_code';
    refresh_token?: Token;
    code?: string;
}

class TokenManager {
    accessToken: Token;
    refreshToken: Token;

    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
    }

    isTokenExpired(token: string): boolean {
        const tokenData = jwt.decode(token, {
            complete: true,
        }) as JwtPayload | null;
        if (tokenData?.exp) {
            const exp = new Date(tokenData.exp * 1000);
            const now = new Date();
            return now >= exp;
        }
        return true;
    }

    async exchangeTokens(params: ExchangeTokensParams): Promise<void> {
        const data: ExchangeTokensParams = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            ...params,
        };

        try {
            const response = await axiosInstance.post(
                `oauth2/access_token`,
                data
            );

            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
        } catch (error) {
            console.log('Error:', error);
        }
    }

    async refreshTokens(): Promise<void> {
        const params: ExchangeTokensParams = {
            grant_type: 'refresh_token',
            refresh_token: this.refreshToken,
        };
        await this.exchangeTokens(params);
    }

    async initTokens(): Promise<void> {
        const params: ExchangeTokensParams = {
            grant_type: 'authorization_code',
            code: process.env.SECRET_CODE,
        };
        await this.exchangeTokens(params);
    }
}

const tokenManager = new TokenManager();

export default tokenManager;
