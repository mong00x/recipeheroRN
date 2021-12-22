import React, { useState, createContext, useEffect, useMemo } from "react";

export const AppContext = createContext({
  Data: {},

  setData: () => {},
});
// export const AppContextProvider = ({ children }) => {
//   return (
//     <AppContext.Provider value={(data, setData)}>
//       {children}
//     </AppContext.Provider>
//   );
// };
