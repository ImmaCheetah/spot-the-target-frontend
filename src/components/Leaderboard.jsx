import styles from "./components.module.css";


export default function Leaderboard({leaderboard}) {


  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {
          leaderboard.map((entry, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{entry.username}</th>
                <th>{entry.finalTime}s</th>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}