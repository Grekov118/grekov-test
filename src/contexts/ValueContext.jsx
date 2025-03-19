// ValueContext.js
import React, { createContext, useState, useCallback, useEffect } from "react";

const ValueContext = createContext();

function ValueProvider({children}) {
  const [selectedValue,setSelectedValue] = useState(12);

  const [query, setQuery] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [result, setResult] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [finalClick, setFinalClick] = useState(false);

  const [isYearSelected, setIsYearSelected] = useState(false);

  function updateValue(value) {
	setSelectedValue(value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
  }

  const calculate = useCallback(() => {
    if (selectedValue !== null) {
      let result;
      if (isYearSelected) {
        result = (query / selectedValue) * 12; 
      } else {
        result = query / selectedValue;       }
      setResult(result); 
    } else {
      console.log("Упс, что-то пошло не так...");
    }
  }, [query, selectedValue, isYearSelected]); 

  const handleYearClick = () => {
    setIsYearSelected(true);
  };

  const handleMonthClick = () => {
    setIsYearSelected(false);
  };

  useEffect(() => {
    calculate();
  }, [calculate]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsInputEmpty(value.trim() === "");
  };

  const handleButtonClick = () => {
    if (!query.trim()) {
      setIsInputEmpty(true);
      return;
    }
    calculate();
    setIsClicked((prevClicked) => !prevClicked);
  };
  const handleFinalClick = () => {
    if (!query.trim()) {
      setIsInputEmpty(true);
      return;
    }
    calculate();
    setFinalClick((prevClicked) => !prevClicked);
  };

  return (
    <ValueContext.Provider
      value={{
        handleFinalClick,
        query,
        isInputEmpty,
        finalClick,
        isClicked,
        result,
        handleInputChange,
        handleButtonClick,
        handleMonthClick,
        handleYearClick,
        handleSubmit,
		  updateValue
      }}
    >
      {children}
    </ValueContext.Provider>
  );
}

export { ValueContext, ValueProvider };
