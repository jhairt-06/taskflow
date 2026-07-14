import {type Request, type Response} from "express";
import {z} from 'zod';
import {prisma} from "../prisma.js";
import {type AuthenticatedRequest} from "../middleware/auth.js";


const boardSchema = z.object({
    title: z.string(),
    bgColor: z.string().startsWith('#').regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Must be a valid 3 or 6-character hex color code (e.g., #3b82f6)"
})
})

export const createBoard = async(req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId
        if (!userId) {

            res.status(401).json({ success: false, message: "Unauthorized. User ID missing." });
            return;
        }
        const validatedData = boardSchema.parse(req.body)
        const newBoard = await prisma.board.create({
            data: {
                title: validatedData.title,
                bgColor: validatedData.bgColor,
                userId: userId,
            }
        })
        res.status(201).json({success: true, message: "Board successfully created", data: newBoard});
    } catch (error) {
        res.status(500).json({success: false, error: error, message: 'Internal Server Error'})
    }
}

export const getUserBoards = async(req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId
        const userBoard = await prisma.board.findMany({
            where: {
                userId: userId
            }
        })
        res.status(200).json({success: true, message: "Boards found", data: userBoard});
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({success: false, message: error})
        }
        res.status(500).json({success: false, error: error, message: 'Internal Server Error'})
    }
}

export const deleteUserBoard = async(req: AuthenticatedRequest, res: Response) => {
    try {
        const boardId = req.params.id as string
        const userId = req.userId as string
        const existingBoard = await prisma.board.findUnique({
            where: {
                id: boardId
            }
        })

        if (!existingBoard) return res.status(404).json({success: false, message: 'Board not found.'})
        if (existingBoard.userId !== userId) return res.status(403).json({success: false, message: 'Error deleting board'})

        const deleteBoard = await prisma.board.delete({
            where: {
                id: boardId
            }
        })
        res.status(200).json({success: true, message: "Board deleted successfully"})
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({success: false, message: error})
        }
        res.status(500).json({success: false, error: error, message: 'Internal Server Error'})
    }
}