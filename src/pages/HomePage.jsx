import styles from "./pages.module.css";
import MapSelect from "../components/MapSelect";

export default function HomePage() {
  return (
    <>
      <h1 className={styles.gameIntroHeader}>Select map to play!</h1>
      <p className={styles.gameIntroText}>Goal: Try to find all 3 targets shown in the image</p>
      <MapSelect origin="home" />
    </>
  );
}
