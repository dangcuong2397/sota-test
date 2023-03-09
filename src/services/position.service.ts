export function getPercentageScenes(
  positionClick: number,
  translate: number,
  sizeScenes: number
): number {
  const percentage = ((positionClick + translate) / sizeScenes) * 100;
  return Math.floor(percentage);
}

interface PositionEvent {
  percentageXScenes: number;
  percentageYScenes: number;
}
export function detectGotoScenes(
  { percentageXScenes, percentageYScenes }: PositionEvent,
  scenes: ISceneNode
): IHitzones | undefined {
  const hitzoneList = scenes.hitzones || [];
  for (const hitzone of hitzoneList) {
    // debugger;
    const IsSatisfactionX = IsSatisfactionBetween(
      percentageXScenes,
      hitzone.minX,
      hitzone.maxX
    );
    const IsSatisfactionY = IsSatisfactionBetween(
      percentageYScenes,
      hitzone.minY,
      hitzone.maxY
    );
    if (IsSatisfactionX && IsSatisfactionY) return hitzone;
  }
  return undefined;
}

export function IsSatisfactionBetween(
  pointer: number,
  minpercentage: string = "",
  maxpercentage: string = ""
): boolean {
  const minConverted = Number(minpercentage.replace("%", ""));
  const min = isNaN(minConverted) ? 0 : minConverted;
  const maxConverted = Number(maxpercentage.replace("%", ""));
  const max = isNaN(maxConverted) ? 0 : maxConverted;
  return pointer >= min && pointer <= max;
}
