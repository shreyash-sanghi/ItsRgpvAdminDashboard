import React,{useEffect} from 'react'
import { getAllUsers } from '../../api/api';
import { UserContext } from '../../App';
import { useContext } from 'react';

const Users = () => {

  // title name of header
  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Users");
  },[])
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