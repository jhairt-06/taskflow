

import express from 'express';
import {createBoard, getUserBoards, deleteUserBoard} from "../controller/boardControllers.js";
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, createBoard);
router.get('/', requireAuth, getUserBoards);
router.delete('/:id', requireAuth, deleteUserBoard);

export default router;