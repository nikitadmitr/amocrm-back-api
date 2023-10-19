import { Request, Response } from 'express';

import axiosInstance from '../utils/axiosInstance';
import tokenManager from '../utils/TokenManager';

const getLeads = async (req: Request, res: Response): Promise<void> => {
    try {
        const headers = {
            Authorization: `Bearer ${tokenManager.accessToken}`,
        };

        const response = await axiosInstance.get(`api/v4/leads`, {
            headers,
            params: {
                with: 'contacts',
            },
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
    }
};

export default { getLeads };
