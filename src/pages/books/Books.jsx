import React,{useContext, useEffect} from 'react'
import { getAllBooks } from '../../api/api';
import { UserContext } from '../../App';

const Books = () => {

  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Books");
  },[])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllBooks();
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
    <div>Books</div>
  )
}

export default Books