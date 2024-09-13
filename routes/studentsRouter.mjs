import express from 'express';
const router = express.Router();
import { isAuthenticated } from '../middleware/authMiddleware.mjs';
const app = express();

app.use('/students', router);


router.get('/', isAuthenticated, (req, res) => {
    res.render('dashboardStudnets/students', { title: 'Students Page' });
})
export default app;
