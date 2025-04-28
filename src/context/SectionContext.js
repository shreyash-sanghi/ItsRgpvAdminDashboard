import { createContext } from 'react';

const   SectionContext = createContext({
  sectionName: '',
  setSectionName: () => {},
});

export default SectionContext;