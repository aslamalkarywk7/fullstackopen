import { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis, EntryFormValues } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

const AddEntryForm = ({ diagnoses, onSubmit, error }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState("0");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const handleCodesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const base = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    if (type === "Hospital") {
      onSubmit({
        ...base,
        type,
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
      });
    } else if (type === "OccupationalHealthcare") {
      onSubmit({
        ...base,
        type,
        employerName,
        ...(sickLeaveStart && sickLeaveEnd
          ? { sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd } }
          : {}),
      });
    } else {
      onSubmit({
        ...base,
        type,
        healthCheckRating: Number(healthCheckRating),
      });
    }
  };

  return (
    <div>
      <h3>New entry</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={submit}>
        <FormControl fullWidth sx={{ marginBottom: "0.5em" }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={(event) =>
              setType(event.target.value as EntryType)
            }
          >
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational healthcare
            </MenuItem>
            <MenuItem value="HealthCheck">Health check</MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField
            label="description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          <TextField
            label="date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <TextField
            label="specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>
        <FormControl fullWidth sx={{ marginY: "0.5em" }}>
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            label="Diagnosis codes"
            onChange={handleCodesChange}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {type === "HealthCheck" && (
          <div>
            <TextField
              label="health check rating"
              type="number"
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
            />
          </div>
        )}
        {type === "Hospital" && (
          <>
            <div>
              <TextField
                label="discharge date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
            </div>
            <div>
              <TextField
                label="discharge criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </div>
          </>
        )}
        {type === "OccupationalHealthcare" && (
          <>
            <div>
              <TextField
                label="employer"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            </div>
            <div>
              <TextField
                label="sick leave start"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={sickLeaveStart}
                onChange={({ target }) => setSickLeaveStart(target.value)}
              />
            </div>
            <div>
              <TextField
                label="sick leave end"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={sickLeaveEnd}
                onChange={({ target }) => setSickLeaveEnd(target.value)}
              />
            </div>
          </>
        )}
        <Button
          sx={{ marginTop: "0.5em" }}
          variant="contained"
          type="submit"
        >
          add
        </Button>
      </form>
    </div>
  );
};

export default AddEntryForm;
