// import React, { useState, useEffect } from "react";
// import MonthBtn from "./MonthBtn";
// import styles from "./Popup.module.css";
// import { useValue } from "../contexts/ValueContext";


// function MonthList() {
//   const [data, setData] = useState([]);
//   const { updateValue } = useValue();
  

//   useEffect(() => {
//     fetch("/data.json")
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data);
//       })
//       .catch((error) => {
//         console.error("Ошибка при загрузке данных:", error);
//       });
//   }, []);

//   function handleSelect(id, value) {
// 	setData((prevData) =>
// 	  prevData.map((btn) =>
// 		 btn.id === id ? { ...btn, isSelected: true } : { ...btn, isSelected: false }
// 	  )
// 	);
// 	updateValue(value); // Обновляем значение в глобальном контексте
//  }



//   return (
//     <div>
//       <ul className={styles.count__months}>
//         {data.map((btn) => (
//           <MonthBtn
//             key={btn.id}
//             value={btn.value}
//             isSelected={btn.isSelected}
//             onClick={() => handleSelect(btn.id, btn.value)}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MonthList;


import { useState, useEffect } from "react";
import MonthBtn from "./MonthBtn";
import styles from "./Popup.module.css";
import  useValue  from "../contexts/ValueContext"; // Импортируем хук для доступа к контексту

function MonthList() {
  const [data, setData] = useState([]);
  const { updateValue } = useValue(); // Доступ к функции обновления значения из контекста

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

  // Обработчик клика по кнопке
  function handleSelect(id, value) {
    setData((prevData) =>
      prevData.map((btn) =>
        btn.id === id ? { ...btn, isSelected: true } : { ...btn, isSelected: false }
      )
    );
    updateValue(value); // Обновляем значение в глобальном контексте
  }

  return (
  
      <ul className={styles.count__months}>
        {data.map((btn) => (
          <MonthBtn
            key={btn.id}
            value={btn.value}
            isSelected={btn.isSelected}
            onClick={() => handleSelect(btn.id, btn.value)} // Передаем value в обработчик
          />
        ))}
      </ul>
   
  );
}

export default MonthList;
