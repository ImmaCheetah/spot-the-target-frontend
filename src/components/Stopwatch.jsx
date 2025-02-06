import { useState, useEffect, useRef } from 'react';

export default function Stopwatch({winCondition}) {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }, [])

  
  if (winCondition === 3) {
    clearInterval(intervalRef.current);
  }
  
  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime);
  }
  
  function formatTime() {
    let minutes = Math.floor(secondsPassed / (1000 * 60) % 60);
    let seconds = Math.floor(secondsPassed / (1000) % 60);
    let milliseconds = Math.floor(secondsPassed % (1000) / 10);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`
  }

  return (
    <>
      <h1>Time passed: {formatTime(secondsPassed)}</h1>
    </>
  );
}

