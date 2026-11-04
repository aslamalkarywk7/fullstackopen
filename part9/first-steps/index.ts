import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  res.send({
    weight: weightNum,
    height: heightNum,
    bmi: calculateBmi(heightNum, weightNum),
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  const targetNum = Number(target);
  const hours = Array.isArray(daily_exercises)
    ? daily_exercises.map(Number)
    : [];

  if (
    isNaN(targetNum) ||
    !Array.isArray(daily_exercises) ||
    hours.some(isNaN)
  ) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  res.send(calculateExercises(hours, targetNum));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
