import express from 'express';
const router = express.Router();
import { isAuthenticated } from '../middleware/authMiddleware.mjs';
const app = express();

app.use('/students', router);

router.get('/', (req, res) => {
    res.send('List of students');
});

export default app;
