import "dotenv/config"

import express from 'express'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";

const app = express()
const PORT = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

app.use('/', authRoutes)
app.use('/boards', boardRoutes)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})