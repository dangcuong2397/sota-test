import { IonButton } from "@ionic/react";
import React, { useState } from "react";
import {
  detectGotoScenes,
  getPercentageScenes,
} from "../../services/position.service";
import { getScenesById } from "../../services/scene.service";
import {
  SCENES,
  TRANSLATE_SMOOTH,
  TRANSLATE_UNIT,
} from "../../variables/scenes";
import { ChevronLeftSolid, ChevronRightSolid } from "../Icons/SolidIcon";
import SceneViewer from "./ImageViewer";

export default function BellMountain() {
  const screenWidth = window.innerWidth || 0;
  const scenes = SCENES;
  const [currentScene, setCurrentScene] = useState(scenes[0]);
  const [maxTranslateX, setMaxTranslateX] = useState(0);
  const [sceneWidth, setSceneWidth] = useState(0);
  const [sceneHeight, setSceneHeight] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const [startDrag, setStartDrag] = useState(0);

  const handleTranslateLeft: React.MouseEventHandler<HTMLIonButtonElement> = (
    event
  ) => {
    event.stopPropagation();

    setTranslateX((x) => {
      const newPosition = x - TRANSLATE_UNIT;
      if (newPosition <= 0) return 0;
      return newPosition;
    });
  };

  const handleTranslateRight: React.MouseEventHandler<HTMLIonButtonElement> = (
    event
  ) => {
    event.stopPropagation();

    setTranslateX((x) => {
      const newPosition = x + TRANSLATE_UNIT;
      if (newPosition >= maxTranslateX) return maxTranslateX;
      return newPosition;
    });
  };

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    setStartDrag(event?.clientX || 0);
  };

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    const clientX = event?.clientX || 0;
    const deltaX = clientX - startDrag;
    // setStartDrag(clientX);
    setTranslateX((x) => {
      const newPosition = x - deltaX * TRANSLATE_SMOOTH;
      if (newPosition <= 0) return 0;
      if (newPosition >= maxTranslateX) return maxTranslateX;
      return newPosition;
    });
  };

  const handleLoadedImage = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const offsetWidth = event.currentTarget?.offsetWidth || 0;
    const offsetHeight = event.currentTarget?.offsetHeight || 0;
    const newMaxTranslateX = offsetWidth - screenWidth;
    setSceneWidth(offsetWidth);
    setSceneHeight(offsetHeight);
    setMaxTranslateX(newMaxTranslateX);
  };

  const handClickScene: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const offsetLeft = event?.clientX || 0;
    const offsetTop = event?.clientY || 0;
    const percentageXScenes = getPercentageScenes(
      offsetLeft,
      translateX,
      sceneWidth
    );
    const percentageYScenes = getPercentageScenes(offsetTop, 0, sceneHeight);
    const nextHitzone = detectGotoScenes(
      {
        percentageXScenes,
        percentageYScenes,
      },
      currentScene
    );
    if (!nextHitzone) return;

    const nextScene = getScenesById(nextHitzone.goto, SCENES);
    if (nextScene) {
      setCurrentScene(nextScene);
      setTranslateX(
        nextHitzone.defaultPosition || nextScene.defaultPosition || 0
      );
    }
  };

  return (
    <div
      className="scene"
      onClick={handClickScene}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
    >
      <SceneViewer
        translateX={translateX}
        src={currentScene.background_url}
        onLoad={handleLoadedImage}
      />

      <IonButton
        className="scene__direct-button"
        color="none"
        onClick={handleTranslateLeft}
        style={{
          left: "0",
        }}
      >
        <ChevronLeftSolid color="#262626" />
      </IonButton>
      <IonButton
        className="scene__direct-button"
        color="none"
        onClick={handleTranslateRight}
        style={{
          right: "0",
        }}
      >
        <ChevronRightSolid color="#262626" />
      </IonButton>
    </div>
  );
}
