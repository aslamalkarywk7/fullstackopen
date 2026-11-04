import { Entry, Diagnosis, assertNever } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const descriptionFor = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? `${code} ${diagnosis.name}` : code;
  };

  const codes = (entry.diagnosisCodes || []).map((code) => (
    <li key={code}>{descriptionFor(code)}</li>
  ));

  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <p>
            {entry.date} <i>{entry.description}</i>
          </p>
          <ul>{codes}</ul>
          <p>
            discharge {entry.discharge.date}: {entry.discharge.criteria}
          </p>
          <p>specialist: {entry.specialist}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <p>
            {entry.date} <i>{entry.description}</i>
          </p>
          <ul>{codes}</ul>
          <p>employer: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>
              sick leave {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </p>
          )}
          <p>specialist: {entry.specialist}</p>
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <p>
            {entry.date} <i>{entry.description}</i>
          </p>
          <ul>{codes}</ul>
          <p>health rating: {entry.healthCheckRating}</p>
          <p>specialist: {entry.specialist}</p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
