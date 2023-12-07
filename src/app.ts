//importing dependencies
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import http from 'http';
import { config } from './config/main.config';
import router from './routes/index';
//initialize express
const app = express();
const server = http.createServer(app);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(cors({
    credentials: true,
}))

//routes
app.use('/api', router());


//database
config.database();

server.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${config.server.port}`);
});