import { IonPage } from "@ionic/react";
import BellMountain from "../components/BellMountain/BellMountain";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage className="page-view">
      <BellMountain />
    </IonPage>
  );
};

export default Home;
