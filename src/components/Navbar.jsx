import styles from "./components.module.css";
import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <header>
      <nav>
        <NavLink to='/' className={styles.navMainTitle}>Spot the Target</NavLink>
        <NavLink to='/leaderboard/map/e856e9ab-d110-4456-96eb-ccfe54176954' className={styles.navLeaderboard}>Leaderboard</NavLink>
      </nav>
    </header>
  )
}