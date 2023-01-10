import express from 'express';
import cors from 'cors';
import movies from './api/movies.route.js';

const app = express();
//creates server

app.use(cors());
app.use(express.json());
//allowing the app to use cors and express.json middleware

app.use("/api/v1/movies", movies);
app.use('*',(req,res) => {
    res.status(404).json({error:"not found"})
});
//return 404 for non existing routes


export default app;