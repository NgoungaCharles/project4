import express from 'express';
import { NLPService } from '../services/nlpService';

const router = express.Router();
const nlpService = new NLPService();

router.post('/', async (req, res, next) => {
  try {
    const { input } = req.body;
    const result = await nlpService.processQuery(input);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/suggestions', async (req, res, next) => {
  try {
    const { input } = req.query;
    const suggestions = await nlpService.generateSuggestions(input as string);
    res.json({ suggestions });
  } catch (error) {
    next(error);
  }
});

export const queryRouter = router;