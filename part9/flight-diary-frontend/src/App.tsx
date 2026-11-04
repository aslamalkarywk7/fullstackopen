import { useState, useEffect } from 'react';
import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';
import { weatherOptions, visibilityOptions } from './types';
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const notify = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = { date, weather, visibility, comment };
    createDiary(newEntry)
      .then((data) => {
        setDiaries(diaries.concat(data));
        setDate('');
        setComment('');
      })
      .catch((e: unknown) => {
        if (axios.isAxiosError(e)) {
          notify(
            e.response?.data && typeof e.response.data === 'string'
              ? e.response.data
              : 'Creation failed: ' + e.message
          );
        } else if (e instanceof Error) {
          notify(e.message);
        } else {
          notify('Unknown error');
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          weather
          {weatherOptions.map((option) => (
            <label key={option}>
              {option}
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
              />
            </label>
          ))}
        </div>
        <div>
          visibility
          {visibilityOptions.map((option) => (
            <label key={option}>
              {option}
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
            </label>
          ))}
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>
            weather: {diary.weather}, visibility: {diary.visibility}
          </p>
          <p>{diary.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
