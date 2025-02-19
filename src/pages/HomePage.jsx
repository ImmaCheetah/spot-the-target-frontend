import styles from "./pages.module.css";
import MapSelect from "../components/MapSelect";

export default function HomePage() {
  return (
    <>
      <h1 className={styles.gameIntroHeader}>Select map to play!</h1>
      <MapSelect origin="home" />
    </>
  );
}
