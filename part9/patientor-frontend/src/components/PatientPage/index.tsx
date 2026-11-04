import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { Patient, Diagnosis, Gender, EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

const genderIcon = (gender: Gender) => {
  if (gender === Gender.Male) return <MaleIcon />;
  if (gender === Gender.Female) return <FemaleIcon />;
  return <QuestionMarkIcon />;
};

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetched = await patientService.getById(id);
        setPatient(fetched);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>loading...</div>;
  }

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          setError(e.response.data.replace("Something went wrong. Error: ", ""));
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h2>
        {patient.name} {genderIcon(patient.gender)}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <div key={entry.id} style={{ border: "solid", padding: 10, marginBottom: 10 }}>
          <EntryDetails entry={entry} diagnoses={diagnoses} />
        </div>
      ))}
      <AddEntryForm diagnoses={diagnoses} onSubmit={submitEntry} error={error} />
    </div>
  );
};

export default PatientPage;
