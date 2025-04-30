// AddWorkoutForm.js
import React, { useState } from 'react';

function AddWorkoutForm({ addWorkout }) {
  const [name, setName] = useState('');
  //add reps , load, and change duration to rest time, add (RPE or rating)
  const [repetitions,setRepetitions] = useState('');
  const [weight, setWeight] = useState(''); 
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !duration) return; // add all param
    addWorkout({ name, repetitions, weight, duration, id: Date.now() }); // fix id of workouts LATER
    setName('');
    setRepetitions('');
    setWeight('');
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Workout Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input
        type='number'
        placeholder="repetitions"
        value={repetitions}
        onChange={(e) => setRepetitions(e.target.value)}
        />

        <input
        type = "number"
        placeholder="weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        />

        <input
        type="number"
        placeholder="Rest (seconds)"
        step={60}
        //default to 60  or 120 secs
        defaultValue={60}
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        />
        
        <button type="submit">Add Workout</button>

    </form>
  );
}

export default AddWorkoutForm;
