import React from 'react';

const GenreContext = React.createContext();

export const GenreProvider = ({ value, children }) => (
  <GenreContext.Provider value={value}>{children}</GenreContext.Provider>
);

export default GenreContext;

