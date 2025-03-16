import React, { useState, useEffect } from "react";
import MonthBtn from "./MonthBtn";
import styles from "./Popup.module.css";
import  useValue  from "../contexts/ValueContext";

function MonthList() {
  const [data, setData] = useState([]);
  const { updateValue } = useValue(); 

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
  }, []);

 
  function handleSelect(id, value) {
    setData((prevData) =>
      prevData.map((btn) =>
        btn.id === id ? { ...btn, isSelected: true } : { ...btn, isSelected: false }
      )
    );
    updateValue(value); 
  }

  return (
  
      <ul className={styles.count__months}>
        {data.map((btn) => (
          <MonthBtn
            key={btn.id}
            value={btn.value}
            isSelected={btn.isSelected}
            onClick={() => handleSelect(btn.id, btn.value)} 
          />
        ))}
      </ul>
   
  );
}

export default MonthList;
