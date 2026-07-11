import "dotenv/config"

import express, {type Request, type Response} from "express";
import jwt from 'jsonwebtoken'
import {z} from 'zod'
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import {hashPassword, verifyPassword} from "../utils/hashPassword.js";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "asdafagajgpaijgpa2^%@#%"
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});
const prisma = new PrismaClient({ adapter });

//zod schemas
const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
})

const logInSchema = z.object({
    email: z.email(),
    password: z.string()
})

export const signUpUser = async (req: Request, res: Response) => {
    try {
        const validatedData = signUpSchema.parse(req.body)
        const existingUser = await prisma.user.findUnique({
            where: {email: validatedData.email},
        })
        if (existingUser) return res.status(409).json({success: false, message: 'User already exists'})


        const hashedPassword = await hashPassword(validatedData.password)

        if (!hashedPassword) return res.status(400).json({success: false, message: 'Error hashing password'})

        const newUser = await prisma.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                name: validatedData.name,
            }
        })

        const {password, ...newUserData}= newUser

        return res.json({success: true, message: "Signup successful", data: newUserData})
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({success: false, error: error})
        }
        res.status(500).json({success: false, error: error, message: 'Internal Server Error'})
    }
}

export const logInUser = async (req: Request, res: Response) => {
    try {
        const validatedData = logInSchema.parse(req.body)
        const existingUser = await prisma.user.findUnique({
            where: {email: validatedData.email}
        })
        if (!existingUser) return res.status(401).json({success: false, message: 'User does not exist.'})
        const isMatch = await verifyPassword(existingUser.password, validatedData.password )
        if (isMatch === null) {
            return res.status(400).json({success: false, message: 'Error validating password'})
        } else if (isMatch === false) {
            return res.status(401).json({success: false, message: 'Invalid credentials.'})
        }

        const token = jwt.sign({
            userId: existingUser.id
        }, JWT_SECRET, {expiresIn: '1d'})

        const {password, ...userData} = existingUser
        res.status(200).json({success: true, message: 'Login successful', token: token, userData})

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({success: false, error: error})
        }
        res.status(500).json({success: false, error: error, message: 'Internal Server Error'})
    }
}

