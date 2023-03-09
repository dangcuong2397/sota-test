import React from "react";

interface ISceneViewerProps {
  src: string;
  translateX: number;
  onLoad: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

function SceneViewer({ translateX, src, onLoad }: ISceneViewerProps) {
  return (
    <img
      className="scene__img"
      src={src}
      alt="scene view"
      style={{
        transform: `translateX(${-translateX}px)`,
      }}
      onLoad={onLoad}
    />
  );
}

export default SceneViewer;
