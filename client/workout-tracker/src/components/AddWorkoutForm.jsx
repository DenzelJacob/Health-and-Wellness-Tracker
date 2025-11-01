// AddWorkoutForm.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import '../css/workoutForm.css';
//import { response } from 'express';

export default function AddWorkoutForm() {
  const [form, setForm] = useState({
    name: '',
    repetitions: '',
    weight: '',
    duration: '',
  });

  const [isNew, setIsNew] = useState(true);
  const params = useParams();// here TODOOOooooooooooooooooooooooooooo
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);


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




  async function onSubmit(e) {
    e.preventDefault();
    const workout = { ...form };
    try {
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
    setForm({
      name: '',
      repetitions: '',
      weight: '',
      duration: '',
    });

    navigate('/');
  }
 }



  function updateFormFields(value){
    return setForm((prev) => {
      return{...prev, ...value};
    });
  }

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
  };

  

  // also title for workouts -- TODO
  return (

     <form onSubmit={onSubmit}>
      
      
      {!showButton && <button onClick={onStartWorkoutEvent}>Start Workout</button>}
      
      

      {showButton &&
      <div>
        <input
        type="text"
        placeholder="Workout Name"
        defaultValue={"test"}
        value={form.name}
        onChange={(e) => updateFormFields({name: e.target.value})}
        />

        <input
        type='number'
        placeholder="repetitions"
        defaultValue={60}
        value={form.repetitions}
        onChange={(e) => updateFormFields({repetitions: e.target.value})}
        />

        <input
        type = "number"
        placeholder="weight"
        defaultValue={60}
        value={form.weight}
        onChange={(e) => updateFormFields({weight: e.target.value})}
        />

        <input
        type="number"
        placeholder="Rest (seconds)"
        step={60}
        //default to 60  or 120 secs
        defaultValue={60}
        value={form.duration}
        onChange={(e) => updateFormFields({duration: e.target.value})}
        />

        <button type="submit" >Add Workout</button>
      </div> }

      {showButton && <h1>Added exercises</h1>}
    {
/* 

 <ul>
        {showButton && <p>number of movements: {form.length}</p> }
      {form.map((form) => (
        <li key={form.id}>
          {form.name} -- repetitions: {form.repetitions}  -- weight: {form.weight} lbs -- rest duration: {form.duration} seconds --- {form.id}
          <button onClick={() => deleteWorkout(form.id)} >Delete</button>
        </li>
        
      ))}


   { showButton && <button onClick={() => {endWorkout(workouts); handleEndButtonState(false);}}> End Workout </button> }
    </ul>

*/


    }  
     
      
    </form>
  );
};


