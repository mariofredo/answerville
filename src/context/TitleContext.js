'use client';
const {useContext, createContext, useState} = require('react');

const TitleContext = createContext({
  currentTitle: null,
  setCurrentTitle: () => {},
});

export function TitleContextProvider({children}) {
  const [currentTitle, setCurrentTitle] = useState();

  return (
    <TitleContext.Provider value={{currentTitle, setCurrentTitle}}>
      {children}
    </TitleContext.Provider>
  );
}

export const useTitle = () => useContext(TitleContext);
