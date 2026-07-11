import "dotenv/config"

import express from 'express'
import cors from 'cors'
import {z} from 'zod'
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import {hashPassword} from "./utils/hashPassword.js";

const app = express()
const PORT = process.env.PORT || 5000
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});
const prisma = new PrismaClient({ adapter });

app.use(cors())
app.use(express.json())

const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
})

app.post('/signup', async (req, res) => {
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

        return res.json({success: true, message: "Signup successful"})
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).json({success: false, error: e})
        }
        res.status(500).json({success: false, error: e, message: 'Internal Server Error'})
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})