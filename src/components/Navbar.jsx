import styles from "./components.module.css";
import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <header>
      <nav>
        <NavLink to='/' className={styles.navMainTitle}>Spot the Target</NavLink>
        <NavLink to='/leaderboard' className={styles.navLeaderboard}>Leaderboard</NavLink>
      </nav>
    </header>
  )
}