import React, { createContext } from "react";
export const Context = createContext();
export default function ContextProvider({ children }){
    const [Data, setData] = React.useState([]);
    return (
        <Context.Provider>
          {children}
        </Context.Provider>
      );
}