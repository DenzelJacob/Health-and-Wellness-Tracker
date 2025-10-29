// AddWorkoutForm.js
import React, { useState } from 'react';

import '../css/workoutForm.css';

function AddWorkoutForm({ addWorkout,workouts, deleteWorkout, endWorkout }) {
  const [name, setName] = useState('');
  //add reps , load, and change duration to rest time, add (RPE or rating)
  const [repetitions,setRepetitions] = useState('');
  const [weight, setWeight] = useState(''); 
  const [duration, setDuration] = useState('');
  const [showButton, setShowButton] = useState(false);


  const handleEndButtonState = (state) => {
    setShowButton(state);


    console.log("end was clicked " );
  };

  // make on click event -- TODO
  const onStartWorkoutEvent = event =>{
      
    console.log("Start worked was was clicked");
    handleEndButtonState(true);
    // Add exercise button -TODO
    // make forms for different types of workouts ex: cardio vs resistance  
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !duration) return; // add all param
    addWorkout({ name, repetitions, weight, duration, id: Date.now() }); // fix id of workouts LATER
    setName('');
    setRepetitions('');
    setWeight('');
    setDuration('');

  };

  // also title for workouts -- TODO
  return (

     <form onSubmit={handleSubmit}>
      
      <div>
        <button onClick={onStartWorkoutEvent}>Start Workout</button>
      </div>


      {showButton &&
      <div>
        <input
        type="text"
        placeholder="Workout Name"
        defaultValue={"test"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input
        type='number'
        placeholder="repetitions"
        defaultValue={60}
        value={repetitions}
        onChange={(e) => setRepetitions(e.target.value)}
        />

        <input
        type = "number"
        placeholder="weight"
        defaultValue={60}
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

        <button type="submit" >Add Workout</button>
      </div> }

      <h1>Added exercises</h1>

      <ul>
        {showButton && <p>number of movements: {workouts.length}</p> }
      {workouts.map((workout) => (
        <li key={workout.id}>
          {workout.name} -- repetitions: {workout.repetitions}  -- weight: {workout.weight} lbs -- rest duration: {workout.duration} seconds 
          <button onClick={() => deleteWorkout(workout.id)} >Delete</button>
        </li>
        
      ))}


   { showButton && <button onClick={() => {endWorkout(workouts); handleEndButtonState(false);}}> End Workout </button> }
    </ul>
      
    </form>
  );
}



export default AddWorkoutForm;
