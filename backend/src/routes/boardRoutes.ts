

import express from 'express';
import {createBoard, getUserBoards} from "../controller/boardControllers.js";
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, createBoard);
router.get('/', requireAuth, getUserBoards);

export default router;