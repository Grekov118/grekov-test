import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Popup.module.css";
import useValue from "../contexts/ValueContext";

import MonthList from "./MonthList";

import close from "../images/close.svg";
import { useNavigate } from "react-router-dom";

function PopupFirst() {
  const [query, setQuery] = useState("");
  const { selectedValue } = useValue();
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [result, setResult] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [finalClick, setFinalClick] = useState(false);

  const [isYearSelected, setIsYearSelected] = useState(false);

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
        result = query / selectedValue; 
      }
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

  const navigate = useNavigate();



const popupRef = useRef(null);

const handleClose = useCallback(() => {
	navigate(-1);
 }, [navigate]); 

 useEffect(() => {
	const handleClickOutside = (event) => {
	  if (popupRef.current && !popupRef.current.contains(event.target)) {
		 handleClose(); 
	  }
	};

	document.addEventListener("mousedown", handleClickOutside);
	return () => {
	  document.removeEventListener("mousedown", handleClickOutside);
	};
 }, [handleClose]);



  return (
    <div className={styles.popup}>
      <div className={styles.popup__block} ref={popupRef}>
        <span className={styles.popup__close} onClick={handleClose}>
          <img className={styles.close_img} src={close} alt="close-btn" />
        </span>
        {!finalClick ? (
          <>
            <div className={styles.popup__info}>
              <h1 className={styles.popup__title}>Платежи по кредиту</h1>
              <p className={styles.popup__desc}>
                Введите сумму кредита и выберите срок, на который вы хотите его
                оформить. Мы автоматически рассчитаем для вас ежемесячный
                платеж, чтобы вы могли лучше спланировать свои финансы.
              </p>
            </div>

            <form className={`${styles.popup__form} ${styles.form}`} onSubmit={handleSubmit}>
              <label className={styles.form__label} htmlFor="data">
                Ваша сумма кредита
                <span className={styles.form__label_valute}> ( ₽ )</span>
              </label>
              <input
                id="data"
                className={styles.form__input}
                type="number"
                placeholder="Введите данные"
                name="data"
                autoComplete="off"
                required="required"
                value={query}
                onChange={handleInputChange} />

              <button
                onClick={handleButtonClick}
                className={styles.form__btn}
                disabled={isInputEmpty || isClicked || !query.trim()} >
                Рассчитать
              </button>
            </form>

            <div className={`${styles.popup__count} ${styles.count}`}>
              <p className={styles.count__name}>Количество месяцев?</p>

              <MonthList />
            </div>

            {isClicked && (
              <div className={styles.answer}>
                <h2 className={styles.answer__title}>
                  Итого ваш платеж по кредиту:
                </h2>
                <div className={styles.answer__options}>
                  <span
                    className={`${styles.answer__options_var} ${
                      isYearSelected ? styles.active : ""
                    }`}
                    onClick={handleYearClick}
                  >
                    в год
                  </span>
                  <span
                    className={`${styles.answer__options_var} ${
                      !isYearSelected ? styles.active : ""
                    }`}
                    onClick={handleMonthClick}
                  >
                    в месяц
                  </span>
                </div>
                {result !== null && (
                  <span className={styles.answer__total}>
                    {Number(result).toFixed(2)} ₽
                  </span>
                )}
              </div>
            )}
          </>
        ) : (
          <div className={styles.finalResult}>
            Cумма платежа составит
            <span className={styles.finalResult__sum}>{result} ₽</span>
          </div>
        )}

        <button
          className={styles.popup__btn}
          type="button"
          onClick={handleFinalClick}
          disabled={isInputEmpty || finalClick || !isClicked || !query.trim()}
        >
          {!finalClick ? "Добавить" : "Расчитано"}
        </button>
      </div>
    </div>
  );
}

export default PopupFirst;
