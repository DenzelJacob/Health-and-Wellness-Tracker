// WorkoutList.js
import React from 'react';

function WorkoutList({ workouts, deleteWorkout }) {
  return (
    <ul>
      {workouts.map((workout) => (
        <li key={workout.id}>
          {workout.name} - repetitions: {workout.repetitions}  - weight: {workout.weight} - rest duration: {workout.duration} mins
          <button onClick={() => deleteWorkout(workout.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default WorkoutList;
