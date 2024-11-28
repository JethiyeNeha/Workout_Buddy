import { useEffect} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/workoutForm'

const Home = () => {
    // const [workouts, setWorkouts]= useState(null)
    const { workouts, dispatch} = useWorkoutsContext()
    const { user }= useAuthContext()
    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch("http://localhost:4000//api/workouts",{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }) //replace with api/workouts if doesn't work
            const json = await response.json()
            if(response.ok){
                // setWorkouts(json)
                dispatch({type: "SET_WORKOUTS", payload: json})
            }
        }
        if(user){
            fetchWorkouts()
        }
    }, [dispatch, user])
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