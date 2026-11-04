import { z } from 'zod';
import { Gender, HealthCheckRating, NewPatient, EntryWithoutId } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  const parsed = NewPatientSchema.parse(object);
  return { ...parsed, entries: [] };
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown, field: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${field}`);
  }
  return value;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || isNaN(Date.parse(date))) {
    throw new Error(`Incorrect or missing date: ${String(date)}`);
  }
  return date;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    rating === null ||
    rating === undefined ||
    !Object.values(HealthCheckRating).includes(rating as HealthCheckRating)
  ) {
    throw new Error(`Incorrect health check rating: ${String(rating)}`);
  }
  return rating as HealthCheckRating;
};

const parseDiagnosisCodes = (object: unknown): Array<string> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [];
  }
  return object.diagnosisCodes as Array<string>;
};

interface DischargeInput {
  date: string;
  criteria: string;
}

const parseDischarge = (object: unknown): DischargeInput => {
  if (!object || typeof object !== 'object' || !('discharge' in object)) {
    throw new Error('Incorrect or missing discharge');
  }
  const discharge = object.discharge;
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect discharge');
  }
  if (!('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Incorrect discharge: date or criteria missing');
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria, 'criteria'),
  };
};

interface SickLeaveInput {
  startDate: string;
  endDate: string;
}

const parseSickLeave = (object: unknown): SickLeaveInput | undefined => {
  if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
    return undefined;
  }
  const sickLeave = object.sickLeave;
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect sick leave');
  }
  if (!('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    throw new Error('Incorrect sick leave: start or end date missing');
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    !('description' in object) ||
    !('date' in object) ||
    !('specialist' in object) ||
    !('type' in object)
  ) {
    throw new Error('Incorrect data: some fields are missing');
  }

  const description = parseString(object.description, 'description');
  const date = parseDate(object.date);
  const specialist = parseString(object.specialist, 'specialist');
  const diagnosisCodes = parseDiagnosisCodes(object);

  if (object.type === 'Hospital') {
    return {
      type: 'Hospital',
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: parseDischarge(object),
    };
  }

  if (object.type === 'OccupationalHealthcare') {
    if (!('employerName' in object)) {
      throw new Error('Incorrect data: employer name missing');
    }
    const sickLeave = parseSickLeave(object);
    return {
      type: 'OccupationalHealthcare',
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName: parseString(object.employerName, 'employerName'),
      ...(sickLeave ? { sickLeave } : {}),
    };
  }

  if (object.type === 'HealthCheck') {
    if (!('healthCheckRating' in object)) {
      throw new Error('Incorrect data: health check rating missing');
    }
    return {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
  }

  throw new Error(`Incorrect entry type: ${String(object.type)}`);
};
