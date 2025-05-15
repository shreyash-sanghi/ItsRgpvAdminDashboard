import React, { useEffect } from "react";
import { UserContext } from "../../App";
import { useContext } from "react";
import AddBook from "../../components/books/AddBook";

const AddBookPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Add Book");
  }, []);

  return <AddBook />;
};

export default AddBookPage;
