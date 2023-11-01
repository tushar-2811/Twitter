import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import IndexRouter from './Routes/routeIndex';
import cors from 'cors'


const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());


app.use('/' , IndexRouter);


app.listen(port , () => {
    console.log(`Server is listening on port : ${port}`);
})