
import styles from "./Popup.module.css";

function MonthBtn({ value, isSelected, onClick }) {
  return (
    <button
      className={`${styles.count__months_item} ${isSelected ? styles.active : ""}`} onClick={onClick}>{value}</button>
  );
}

export default MonthBtn;
