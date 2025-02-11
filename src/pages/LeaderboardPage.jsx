import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import MapSelect from "../components/MapSelect";


export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([{"username": 'bob'}]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let {mapId} = useParams();

  console.log(leaderboard)
  useEffect(() => {
      let controller = new AbortController();
      console.log(controller)
      const data = async () => {
        try {
          const response = await fetch(`http://localhost:8080/leaderboard/map/${mapId}`, {
            method: "GET",
          });
  
          if (response.status >= 400) {
            const errors = await response.json();
            console.log(errors);
            setError(errors);
          }
  
          if (response.status === 200) {
            const res = await response.json();
            console.log(res)
            setLeaderboard(res.leaderboard)
          }
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Fetch request was aborted');
          } else {
            console.log(error)
          }
        } finally {
          setLoading(false);
        }
      };
      data();
      return () => controller?.abort();
    }, [mapId]);

  return (
    <>
      <h1>Leaderboard page</h1>
      <MapSelect />
      <Leaderboard leaderboard={leaderboard} />
    </>
  )
}