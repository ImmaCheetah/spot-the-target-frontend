export default function SubmitScore() {

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
  }

  async function submitNameReq(mapId, name) {
    try {
      const response = await fetch(`http://localhost:8080/leaderboard/${mapId}`, {
        method: "GET",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" max={10} required/>
      <button type="submit">Submit</button>
    </form>
  );
}