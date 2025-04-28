import React,{useContext, useEffect} from 'react'
import { getAllPyq } from '../../api/api';
import { UserContext } from '../../App';

const Pyq = () => {

  const {setSectionName} = useContext(UserContext);

  useEffect(()=>{
    setSectionName("PYQ's");
  },[])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPyq();
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
    <div>Pyq</div>
  )
}

export default Pyq