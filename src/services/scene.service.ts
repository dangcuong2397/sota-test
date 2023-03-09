export function getScenesById(
  sceneId: string | undefined,
  sceneList: ISceneNode[]
): ISceneNode | undefined {
  return sceneList.find((scene) => scene.id === sceneId);
}
