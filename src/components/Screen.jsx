
import { Link } from "react-router-dom"
import styles from "./Screen.module.css"

function Screen() {

	return (
		<div className={styles.screen}>
			<Link to="/popup" className={styles.mainBtn} >Расчет платежей</Link>
		</div>
	)
}

export default Screen
