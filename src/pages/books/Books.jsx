import React, { useEffect } from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react'
import Books from '../../components/books/Books'

const BooksPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Books");
  }, []);

  return <Books />
}

export default BooksPage