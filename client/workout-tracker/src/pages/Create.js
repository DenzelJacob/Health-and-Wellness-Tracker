import React, { useState } from 'react';


import AddWorkoutForm from '../components/AddWorkoutForm.jsx';
import PullWorkoutEntries from '../components/PullWorkoutEntries.jsx';


// import react router and implement
function Create() {

  return (
       
    <div> 
      
     <br></br>

      <AddWorkoutForm/>
      
      
      <h2> Recent Workouts </h2>

      <PullWorkoutEntries/>

    </div>
    
   
  );
}

export default Create;
