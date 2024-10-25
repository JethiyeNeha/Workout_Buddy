import { useEffect, useState} from 'react'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/workoutForm'

const Home = () => {
    const [workouts, setWorkouts]= useState(null)
    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch("http://localhost:4000//api/workouts") //replace with api/workouts if doesn't work
            const json = await response.json()
            if(response.ok){
                setWorkouts(json)
            }
        }
    }, [])
    return (
        <div className="home">
            <div className='workouts'>
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key ={workout._id} workout ={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home