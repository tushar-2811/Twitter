import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import IndexRouter from './Routes/routeIndex';
import cors from 'cors'
// import rawBody from 'raw-body'


const port = process.env.PORT;
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


// Middleware to increase payload size limit
// app.use((req, res, next) => {
//     rawBody(req, {
//       length: req.headers['content-length'],
//       limit: '10mb', // Set the payload size limit to 10 megabytes, adjust as needed.
//     }, (err, string) => {
//       if (err) return next(err);
  
//       req.body = string; // Now, the request body is available as req.body
  
//       next();
//     });
//   });


app.use(express.json());




app.use('/' , IndexRouter);



app.listen(port , () => {
    console.log(`Server is listening on port : ${port}`);
})