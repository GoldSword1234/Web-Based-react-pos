import { Router } from 'express';
import StationsController from '../controllers/stations';

const router = Router();
const stationsController = new StationsController();

router.post('/', stationsController.addStation.bind(stationsController));
router.get('/', stationsController.getStations.bind(stationsController));

export default router;