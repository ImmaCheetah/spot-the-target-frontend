import { useStopwatch } from 'react-timer-hook';

export default function Stopwatch() {
  const {
    seconds,
    minutes,
  } = useStopwatch({ autoStart: true });


  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '30px'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
