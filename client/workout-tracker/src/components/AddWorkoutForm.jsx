// AddWorkoutForm.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import '../css/workoutForm.css';



export default function AddWorkoutForm() {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState(''); //todo fix /// MAKE EVERYTHING SIMPLE and straightFORWARD

  const [exerciseList, setExerciseList] = useState([]);// may change to data type
  const [isNew, setIsNew] = useState(true);
  const params = useParams()
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  function deleteWorkout(id) {
    setExerciseList((prevList) => prevList.filter((workout) => workout.id !== id));
  }
  
  function endWorkout(form) {
    console.log("workout has ended");
    console.log(exerciseList);
    //use async function to post to backend
    onSubmit(form);
    
    setExerciseList([]); // clear list after submission
  }




   const handleChange = (e) => {
     // fix this 
      e.preventDefault();
    
    
  };
  
  
  
  
    const handleSubmit = (e) => {
    e.preventDefault();
    //const newWorkout = { , id: Date.now() }; // unique key /fix this
    console.log("Adding workout:", exerciseName, sets, reps, weight, duration);
    const newWorkout = { exerciseName, sets, reps, weight, duration, id: Date.now() }; // unique key 
    
    // Update the exercise list state
    setExerciseList((prevList) => [...prevList, newWorkout]);
    

    // Clear inputs after submission
    setExerciseName('');
    setSets('');
    setReps('');
    setWeight('');
    setDuration('');


    // fix not showing amoutn of exercises added
    console.log("Current exercise list:", exerciseList); 


  };

    // make on click event -- TODO
  const onStartWorkoutEvent = (event) =>{
      
    console.log("Start worked was was clicked");
    handleEndButtonState(true);
    // Add exercise button -TODO
    // make forms for different types of workouts ex: cardio vs resistance  
  };


  const handleEndButtonState = (state) => {
    setShowButton(state);
  };



/*
  useEffect(() => {
    async function fetchData() {
      console.log(params.id);
      const id = params.id.toString() || undefined; // here TODOOOooooooooooooooooooooooooooo
      
      if (!id) return;
      setIsNew(false);

      const response = await fetch(`http://localhost:5050/workouts/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }


      const workout = await response.json();

      if (!workout ){
        console.error(`Record with id ${id} not found`);
        navigate('/');
        return;
      }
      setForm(workout);
    }
      fetchData();
      return;
    }, [params.id, navigate]);
*/


  async function onSubmit() {
    
    const workout = { ...exerciseList };
    try {
      console.log("updating existing workout POST:", workout);
      let response; 
      if (isNew) {
        response = await fetch('http://localhost:5050/workouts/', {
          method: 'POST',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(workout),

        });
      } else {
        console.log("updating existing workout PATCH");
        response = await fetch(`http://localhost:5050/workouts/${params.id.toString()}`, {
          method: 'PATCH',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
 
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
  } catch (error) {
    console.error(`A problen occurred with your fetch operation: ${error.message}`);

  } finally {
    setExerciseName('');
    setSets('');
    setReps('');
    setWeight('');
    setDuration('');

    //navigate('/');
  }
 }


  // also title for workouts -- TODO
  return (

     <form onSubmit={handleSubmit}> {/* prevent empty post*/}
      
      
      {!showButton && <button onClick={onStartWorkoutEvent}>Start Workout</button>}
      
      

      {showButton &&
      <div>
        <input
        type="text"
        placeholder="Workout Name"
        defaultValue={""}
        value={exerciseName}
        onChange={e => setExerciseName(e.target.value)}
        />

        
        <input
        type="number"
        placeholder="sets"
        defaultValue={1}
        value={sets}
        onChange={e => setSets(e.target.value)}
        />


        <input
        type='number'
        placeholder="repetitions"
        defaultValue={60}
        value={reps}
        onChange={e => setReps(e.target.value)}        

        />

        <input
        type = "number"
        placeholder="weight"
        defaultValue={60}
        value={weight}
        onChange={e => setWeight(e.target.value)}
        />

        <input
        type="number"
        placeholder="Rest (seconds)"
        step={60}
        //default to 60  or 120 secs
        defaultValue={60}
        value={duration}
        onChange={e => setDuration(e.target.value)}
        />

        <button type="submit" >Add Workout</button>
      </div> }

      {showButton && <h1>Added exercises</h1>}
    

    {showButton && exerciseList.length >0 && <p>Total exercises: {exerciseList.length}</p>}

    <ul>
            
      {exerciseList.map((movement) => (
        <li key = {movement.id}>
          {movement.exerciseName} -- sets: {movement.sets}--- repetitions: {movement.reps}  -- weight: {movement.weight} lbs -- rest duration: {movement.duration} seconds 
          <button onClick={() => deleteWorkout(movement.id)} >Delete</button>
        </li>
        
      ))} 

      {showButton && exerciseList.length === 0 && <p>No exercises added yet.</p>}
      
      { (showButton && exerciseList.length > 0) && <button onClick={() => {endWorkout(exerciseList); handleEndButtonState(false);}}> End Workout </button> }

    </ul>
    

    
   
      
    </form>
  );
};


