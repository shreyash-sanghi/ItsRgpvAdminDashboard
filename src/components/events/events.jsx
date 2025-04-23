import React,{useEffect} from 'react'
import { getAllEvents } from '../../api/api';

const Events = () => {
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