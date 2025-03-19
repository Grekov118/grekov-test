import styles from "./Popup.module.css";
import MonthList from "./MonthList";
import { useContext } from "react";
import { ValueContext } from "../contexts/ValueContext";

function MonthBlock() {
	const {handleSubmit,query,handleInputChange,handleButtonClick,isClicked,isInputEmpty} = useContext(ValueContext);
  return (
    <>
      <div className={styles.popup__info}>
        <h1 className={styles.popup__title}>Платежи по кредиту</h1>
        <p className={styles.popup__desc}>
          Введите сумму кредита и выберите срок, на который вы хотите его
          оформить. Мы автоматически рассчитаем для вас ежемесячный платеж,
          чтобы вы могли лучше спланировать свои финансы.
        </p>
      </div>

      <form
        className={`${styles.popup__form} ${styles.form}`}
        onSubmit={handleSubmit}
      >
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
          onChange={handleInputChange}
        />

        <button
          onClick={handleButtonClick}
          className={styles.form__btn}
          disabled={isInputEmpty || isClicked || !query.trim()}
        >
          Рассчитать
        </button>
      </form>

      <div className={`${styles.popup__count} ${styles.count}`}>
        <p className={styles.count__name}>Количество месяцев?</p>

        <MonthList />
      </div>
    </>
  );
}

export default MonthBlock;
