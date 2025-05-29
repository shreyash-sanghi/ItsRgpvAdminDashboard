import React, { useEffect } from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import AddGallery from "../../components/gallery/AddGallery"

const AddGalleryPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Add Gallery");
  }, []);

  return <AddGallery />
}

export default AddGalleryPage
