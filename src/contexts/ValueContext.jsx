// ValueContext.js
import React, { createContext, useState, useContext } from "react";

// Создаем контекст
const ValueContext = createContext();

// Провайдер контекста для обертки приложения
export function ValueProvider({ children }) {
  const [selectedValue, setSelectedValue] = useState(12);

  // Метод для обновления selectedValue
  function updateValue(value) {
    setSelectedValue(value);
  }

  return (
    <ValueContext.Provider value={{ selectedValue, updateValue }}>
      {children}
    </ValueContext.Provider>
  );
}

// Хук для доступа к контексту
export default function useValue() {
  return useContext(ValueContext);
}
