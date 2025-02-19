import { useRef, useEffect, useState } from "react";
import styles from "./components.module.css";
import { useNavigate, useParams } from "react-router-dom";

export default function SubmitScore({ finishedTime, scoreId, isModalOpen }) {
  const [error, setError] = useState("");
  const modalRef = useRef(null);
  let navigate = useNavigate();
  let { mapId } = useParams();

  useEffect(() => {
    // Grabbing a reference to the modal in question
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isModalOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isModalOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");

    submitScoreReq(scoreId, name, finishedTime);
  }

  async function submitScoreReq(scoreId, name, finishedTime) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leaderboard/${scoreId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name: name,
            finishedTime: finishedTime,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const res = await response.json();

      if (response.status === 200) {
        navigate(`/leaderboard/map/${mapId}`);
      } else {
        setError(res.errors[0].msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <dialog ref={modalRef} className={styles.formDialog} open>
      <form onSubmit={handleSubmit}>
        <p>You found all targets!</p>
        <p>Enter your name to submit your score</p>
        <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          maxLength={15}
          placeholder="Username"
          required
        />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>
    </dialog>
  );
}
