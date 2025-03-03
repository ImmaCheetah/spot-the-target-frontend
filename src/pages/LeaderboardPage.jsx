import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import MapSelect from "../components/MapSelect";
import Error from "../components/Error";


export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([{}]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let { mapId } = useParams();

  useEffect(() => {
    let controller = new AbortController();
    console.log(controller);
    const data = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/leaderboard/map/${mapId}`,
          {
            method: "GET",
          },
        );

        if (response.status >= 400) {
          const errors = await response.json();
          console.log(errors);
          setError(errors);
        }

        if (response.status === 200) {
          const res = await response.json();
          setLeaderboard(res.leaderboard);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch request was aborted");
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
    data();
    return () => controller?.abort();
  }, [mapId]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <Error name={error.name} status={error.status} message={error.errorMsg} />
    );

  return (
    <>
      <h1
        style={{
          fontSize: "3rem",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        Leaderboards
      </h1>
      <MapSelect />
      <Leaderboard leaderboard={leaderboard} />
    </>
  );
}
