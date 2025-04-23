import React,{useEffect} from 'react'
import { getAllUsers } from '../../api/api';

const Users = () => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllUsers();
            if (response.status === 200) {
                console.log(response.data)
            }
            else {
                console.log("Error", response);
            }
        }
        fetchData()
    }, []);

  return (
    <div>users</div>
  )
}

export default Users