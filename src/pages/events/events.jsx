import React,{useContext, useEffect} from 'react'
import { getAllEvents } from '../../api/api';
import { UserContext } from '../../App';

const Events = () => {

    const {setSectionName} = useContext(UserContext);
    useEffect(()=>{
        setSectionName("Events");
    },[])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllEvents();
            if (response.status === 200) {
                console.log(response.data)
            }
            else {
                console.log("Error", response);
            }
        }
        fetchData()
    }
    , []);

  return (
    <div>events</div>
  )
}

export default Events