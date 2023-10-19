import { Router } from 'express';

import checkToken from '../middleware/checkToken';
import LeadRoutes from './LeadRoutes';

const router: Router = Router();

router.use(checkToken);

router.use('/leads', LeadRoutes);

export default router;
