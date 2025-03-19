import { useCallback, useContext, useEffect, useRef } from "react";
import styles from "./Popup.module.css";

import close from "../images/close.svg";
import { useNavigate } from "react-router-dom";
import FinBtn from "./FinBtn";
import MonthBlock from "./MonthBlock";
import { ValueContext } from "../contexts/ValueContext";

function PopupFirst() {
  const {
    finalClick,
    isYearSelected,
    isClicked,
    handleMonthClick,
    handleYearClick,
    result,
  } = useContext(ValueContext);

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
              <MonthBlock />

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

          <FinBtn />
        </div>
      </div>
  );
}

export default PopupFirst;
