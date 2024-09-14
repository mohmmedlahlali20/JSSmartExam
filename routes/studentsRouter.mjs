import express from 'express';
import Middleware from '../middleware/authMiddleware.mjs'; 
const router = express.Router();
const app = express();

app.use('/students', router);




router.get('/', Middleware.isAuthenticated, (req, res) => {
    res.render('dashboardStudnets/students', { title: 'Students Page' });
});

export default app;
