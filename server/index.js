import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import todoRouter from './routes/todoRoutes.js';

const app = express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.json())

app.use('/auth', authRouter) 
app.use('/api/todos', todoRouter);

app.get('/', (req, res) => {
    console.log("req.body")
})

app.listen(process.env.PORT, () => {
    console.log("Server is Running")
})