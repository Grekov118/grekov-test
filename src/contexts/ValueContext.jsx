import { createContext, useState, useContext } from "react";

const ValueContext = createContext();

export function ValueProvider({ children }) {
  const [selectedValue, setSelectedValue] = useState(12);

  function updateValue(value) {
    setSelectedValue(value);
  }

  return (
    <ValueContext.Provider value={{ selectedValue, updateValue }}>
      {children}
    </ValueContext.Provider>
  );
}


export default function useValue() {
  return useContext(ValueContext);
}
