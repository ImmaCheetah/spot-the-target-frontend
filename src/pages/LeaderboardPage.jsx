import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let {mapId} = useParams();

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
            setLeaderboard(res)
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
    }, []);

  return (
    <>
      <h1>Leaderboard page</h1>

    </>
  )
}