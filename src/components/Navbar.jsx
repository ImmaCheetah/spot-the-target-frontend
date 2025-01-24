import { NavLink } from "react-router-dom"


export default function Navbar() {

  return (
    <header>
      <nav>
        <NavLink to='/'>Spot the Target</NavLink>
        <p>Leaderboard</p>
      </nav>
    </header>
  )
}