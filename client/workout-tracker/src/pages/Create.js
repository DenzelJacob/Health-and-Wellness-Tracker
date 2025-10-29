import React, { useState } from 'react';

import AddWorkoutForm from '../scripts/AddWorkoutForm.js';



// import react router and implement
function Create() {
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = (workout) => {
    setWorkouts([...workouts, workout]);
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
    
  };

  const endWorkout = (workouts) => {
    console.log("workout has ended")
    setWorkouts(workouts.filter((workout) => null));
    {/* make post request to mongodb */}
  }
 

// make exercise template make -- TODO 
/*
start workout ID - today
add exercise to current workout
add set to current exercise
set will have set # weight, reps, rest

*/
//make workout template maker  -- TODO
// add edit workout form here --->
  return (
       
    <div> 
      
      
     <br></br>

      <AddWorkoutForm addWorkout={ addWorkout} workouts =  {workouts} deleteWorkout = {deleteWorkout}  endWorkout = {endWorkout}/>
      
      
      <h2> Recent Workouts </h2>
      
    </div>
    
   
  );
}

export default Create;
