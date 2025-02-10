import { useRef, useEffect } from "react";
import styles from "./components.module.css";
import { useNavigate } from "react-router-dom";

export default function SubmitScore({finishedTime, scoreId, isModalOpen}) {
  const modalRef = useRef(null)
  let navigate = useNavigate();

  useEffect(() => {

    // Grabbing a reference to the modal in question
    const modalElement = modalRef.current;
    if (!modalElement) return;
  
    // Open modal when `isOpen` changes to true
    if (isModalOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isModalOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log(form, finishedTime)
    const name = form.get("name");

    console.log(name, finishedTime)
    submitScoreReq(scoreId, name, finishedTime);
    navigate('/leaderboard')

  }

  async function submitScoreReq(scoreId, name, finishedTime) {
    try {
      const response = await fetch(`http://localhost:8080/leaderboard/${scoreId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          finishedTime: finishedTime
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <dialog ref={modalRef} className={styles.formDialog} open>
      <form onSubmit={handleSubmit}>
        <p>You found all targets!</p>
        <p>Enter your name to submit your score</p>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" max={10} required/>
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
}