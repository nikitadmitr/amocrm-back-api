import { Router } from 'express';

import LeadController from '../controllers/LeadController';

const router: Router = Router();

router.get('/', LeadController.getLeads);

export default router;
