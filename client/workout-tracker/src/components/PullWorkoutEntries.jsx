import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../css/pullworkoutentries.css';

export default function PullWorkoutEntries() {
    let loadData = true; // controls data fetching  from backend on component mount/repol
    
    const [exerciseList, setExerciseList] = useState([]);// may change to data type

// fetch recent workout entries from backend -- TODO
    

    useEffect(() => {
    // Fetch workout entries from the backend API

        async function fetchWorkoutEntries() {
            try {
                
                const response = await fetch('http://localhost:5050/workouts/');
                const data = await response.json();
                console.log("Fetching workout entries from backend", data);
                setExerciseList(data);
            } catch (error) {
                console.error('Error fetching workout entries:', error);
            } finally {
               
                // set a timeout to allow re-fetching after some time -- TODO
                
            }
        }


       if(loadData){

        loadData = false;

        fetchWorkoutEntries();

       } 
       

    },[loadData]);


    /* 
    
    {exerciseList.map((entry) => (
                <div key={entry._id}>
                    <h3>{entry.workout.exerciseName}</h3>
                    <p>Sets: {entry.workout.sets}</p>
                    <p>Reps: {entry.workout.reps}</p>
                    <p>Weight: {entry.workout.weight}</p>
                    <p>Duration: {entry.workout.duration}</p>
                </div>
                ))}
    */
    
    return (
        // Display the fetched workout entries starting from the most recent
        <div>
            
                {exerciseList.reverse().map((entry) => { //Big O(n^2) // maybe fix realistaically not an issue for small datasets

                    // Convert the numeric-keyed object into an array
                    const exercises = Object.values(entry.workout);
                    console.log("Rendering workout entry:", entry);
                    return (
                        <div key={entry._id} className="workout-card">
                        <h3>Workout: {entry.workout[0].date}</h3>

                        {exercises.map((ex) => (
                            <div key={ex.id} className="exercise-item">
                            <p><strong>{ex.exerciseName}</strong> </p>
                            <p>Sets: {ex.sets} Reps: {ex.reps} Weight: {ex.weight} Duration: {ex.duration}</p>
                            
                            </div>
                        ))}
                        </div>
                    );
                    })}



        </div>
        
    );

};