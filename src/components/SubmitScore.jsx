export default function SubmitScore({finishedTime, scoreId}) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log(form, finishedTime)
    const name = form.get("name");

    console.log(name, finishedTime)
    submitScoreReq(scoreId, name, finishedTime);
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
    <form onSubmit={handleSubmit}>
      <p>You found all targets!</p>
      <p>Enter your name to submit your score</p>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" max={10} required/>
      <button type="submit">Submit</button>
    </form>
  );
}