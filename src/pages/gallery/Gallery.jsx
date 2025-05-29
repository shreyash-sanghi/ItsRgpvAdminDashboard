import React, { useEffect } from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import Gallery from "../../components/gallery/Gallery"

const GalleryPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Gallery");
  }, []);

  return <Gallery />
}

export default GalleryPage;