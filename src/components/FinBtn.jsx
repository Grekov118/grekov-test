import { useContext } from "react"
import styles from "./Popup.module.css";
import { ValueContext } from "../contexts/ValueContext";

function FinBtn() {
	const {handleFinalClick,query,isInputEmpty,finalClick,isClicked} = useContext(ValueContext);
	return (
		<button className={styles.popup__btn} type="button" onClick={handleFinalClick} 
		disabled={isInputEmpty || finalClick || !isClicked || !query.trim()}> {!finalClick ? "Добавить" : "Расчитано"}
	 </button>
	)
}

export default FinBtn
