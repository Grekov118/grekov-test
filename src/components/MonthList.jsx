import { useState, useContext} from "react";
import MonthBtn from "./MonthBtn";
import styles from "./Popup.module.css";
import { ValueContext } from "../contexts/ValueContext";

function MonthList() {
	const [data, setData] = useState([
		{ id: 0, isSelected: true, value: 12 },
		{ id: 1, isSelected: false, value: 24 },
		{ id: 2, isSelected: false, value: 36 },
		{ id: 3, isSelected: false, value: 48 },
	 ]);
  const { updateValue } = useContext(ValueContext);


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
