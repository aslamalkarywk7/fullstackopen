export interface ExerciseValues {
  target: number;
  hours: number[];
}

export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const hours = args.slice(3).map(Number);

  if (isNaN(target) || hours.some(isNaN)) {
    throw new Error('Provided values were not numbers!');
  }

  return { target, hours };
};

export const calculateExercises = (
  hours: number[],
  target: number
): ExerciseResult => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((h) => h > 0).length;
  const average = hours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= target;

  const ratio = target === 0 ? 1 : average / target;

  let rating: number;
  let ratingDescription: string;
  if (ratio >= 1) {
    rating = 3;
    ratingDescription = 'great job, target reached';
  } else if (ratio >= 0.8) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad, you should train more';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { target, hours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
