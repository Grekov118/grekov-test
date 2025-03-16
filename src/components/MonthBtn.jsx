import React from "react";
import styles from "./Popup.module.css";

function MonthBtn({ value, isSelected, onClick }) {
  return (
    <button
      className={`${styles.count__months_item} ${isSelected ? styles.active : ""}`} onClick={onClick}>{value}</button>
  );
}

export default MonthBtn;
// "homepage": "https://Grekov118.github.io/#/grekov-test/",