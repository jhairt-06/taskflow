import {type Request, type Response} from "express";
import {z} from 'zod';
import {prisma} from "../prisma.js";
import {type AuthenticatedRequest} from "../middleware/auth.js";


const boardSchema = z.object({
    title: z.string(),
    bgColor: z.string().startsWith('#'),
})

export const createBoard = async(req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId
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

export const getUserBoards = async(req: Request, res: Response) => {
    try {
        const userId:string = req.userId
        const userBoard = await prisma.board.findMany({
            where: {
                userId: userId
            }
        })
        res.status(200).json({success: true, message: "Boards found", data: userBoard});
    } catch (error) {
        res.status(500).json({success: false, error: error, message: 'Internal Server Error'})
    }
}