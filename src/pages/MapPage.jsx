import styles from "./pages.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { standardCoords } from "../helper/normalizeCoords";
import { ToastContainer } from "react-toastify";
import Dropdown from "../components/Dropdown";
import TargetCircle from "../components/TargetCircle";
import TargetMarker from "../components/TargetMarker";
import Stopwatch from "../components/Stopwatch";
import SubmitScore from "../components/SubmitScore";
import getData from "../helper/data";
import TargetList from "../components/TargetList";
import Error from "../components/Error";

export default function MapPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickedPos, setClickedPos] = useState({ x: 0, y: 0 });
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({
    naturalWidth: 0,
    naturalHeight: 0,
    loadedWidth: 0,
    loadedHeight: 0,
  });
  const [targets, setTargets] = useState([]);
  const [foundTargetCoords, setFoundTargetCoords] = useState([]);
  const [map, setMap] = useState([]);
  const [currentScoreId, setCurrentScoreId] = useState(null);
  const [foundTargetCount, setFoundTargetCount] = useState(0);
  const [finishedTime, setFinishedTime] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let { mapId } = useParams();

  useEffect(() => {
    let controller = new AbortController();
    const data = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/map/${mapId}`, {
          method: "GET",
        });

        const timeResponse = await fetch(`${import.meta.env.VITE_API_URL}/map/${mapId}`, {
          method: "POST",
          signal: controller.signal,
        });

        if (response.status >= 400 || timeResponse.status >= 400) {
          const errors = await response.json();
          setError(errors);
        }

        if (response.status === 200) {
          const res = await response.json();
          const timeRes = await timeResponse.json();
          const mapName = res.map.name;
          const targets = res.map.targets;
          const mapData = getData();

          setCurrentScoreId(timeRes.startTime.id);
          setTargets(targets);

          if (mapName === "Carnisol") {
            setMap(mapData.carnisol);
          } else if (mapName === "Prehistoric") {
            setMap(mapData.prehistoric);
          } else {
            setMap(mapData.medieval);
          }
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
  }, []);

  // Create a new array that calculates the reverse normalized coordinates of each target
  // Set that in a state variable and update based on target or dimension change
  useEffect(() => {
    const foundTargetsList = targets.map((target) => {
      const { naturalWidth, naturalHeight, loadedWidth, loadedHeight } =
        dimensions;
      const { standardX, standardY } = standardCoords(
        target.coordinates.x,
        target.coordinates.y,
        naturalWidth,
        naturalHeight,
        loadedWidth,
        loadedHeight,
      );

      return { x: standardX, y: standardY, isFound: target.isFound };
    });

    setFoundTargetCoords(foundTargetsList);
  }, [targets, dimensions]);

  function handleClick() {
    setClickedPos(mousePosition);

    // Check if click is edge of screen
    if (mousePosition.x >= window.innerWidth - 100) {
      setClickedPos((prevPos) => {
        return {
          ...prevPos,
          x: mousePosition.x - 170,
        };
      });
    }
    if (mousePosition.y >= dimensions.loadedHeight - 100) {
      setClickedPos((prevPos) => {
        return {
          ...prevPos,
          y: mousePosition.y - 80,
        };
      });
    }

    setIsVisible(!isVisible);
    setCirclePos(mousePosition);
  }

  function handleMouseMove(e) {
    let rect = e.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  // This is to update dropdown state locally after finding a target instead of making a new request each time
  function handleTargets(targetId) {
    setTargets(
      targets.filter((target) => {
        return target.id !== targetId;
      }),
    );

    const newTargets = [...targets];
    const target = newTargets.find((t) => t.id === targetId);
    target.isFound = true;
    setTargets(newTargets);
    setIsVisible(false);
  }

  function handleImageLoad(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const { naturalHeight, naturalWidth } = e.target;

    setDimensions({
      naturalWidth,
      naturalHeight,
      loadedWidth: rect.width,
      loadedHeight: rect.height,
    });
  }

  async function getEndingTimeReq(currentScoreId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leaderboard/${currentScoreId}`,
        {
          method: "GET",
        },
      );

      const res = await response.json();

      const finalTime = Date.now() - res.startTime.startTime;
      setFinishedTime(finalTime / 1000);

      return finalTime;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (foundTargetCount === 3) {
      setModalOpen(true);
      getEndingTimeReq(currentScoreId);
    }
  }, [foundTargetCount]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <Error name={error.name} status={error.status} message={error.errorMsg} />
    );

  return (
    <div>
      <ToastContainer />
      <div className={styles.gameInfoDiv}>
        <TargetList targets={map.targets} />
        <Stopwatch winCondition={foundTargetCount} />
      </div>
      <div className={styles.imgContainer}>
        {isVisible && (
          <Dropdown
            coordinates={clickedPos}
            targets={targets}
            dimensions={dimensions}
            handleTargets={handleTargets}
            setFoundTargetCount={setFoundTargetCount}
          />
        )}
        {isVisible && <TargetCircle coordinates={circlePos} />}
        <TargetMarker targets={foundTargetCoords} />
        <img
          src={map.imgSrc}
          alt=""
          className={styles.mapImg}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onLoad={handleImageLoad}
        />
      </div>
      {foundTargetCount === 3 && (
        <SubmitScore
          finishedTime={finishedTime}
          scoreId={currentScoreId}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
}
