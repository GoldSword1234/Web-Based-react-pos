import { Request, Response } from 'express';
import Station from '../models/Station';

class StationsController {
    async addStation(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const newStation = await Station.create({ name });
            res.status(201).json(newStation);
        } catch (error) {
            res.status(500).json({ message: 'Error adding station', error });
        }
    }

    async getStations(req: Request, res: Response) {
        try {
            const stations = await Station.findAll();
            res.status(200).json(stations);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving stations', error });
        }
    }
}

export default new StationsController();