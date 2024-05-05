import express from 'express';
import { getSongs, getSpecificSong, UpdateSpecificSong, DeleteSpecificSong,createSong } from '../controllers/SongController.js';


const router = express.Router();

// Define route handlers
router.post('/', createSong);
router.get('/', getSongs);
router.get('/:id', getSpecificSong);
router.delete('/:id', DeleteSpecificSong);
router.put('/:id', UpdateSpecificSong);

export default router;
