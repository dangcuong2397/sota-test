interface IHitzones {
  minX: string;
  maxX: string;
  minY: string;
  maxY: string;
  goto: string;
  defaultPosition?: number;
}
interface ISceneNode {
  id: string;
  background_url: string;
  defaultPosition?: number;
  hitzones: IHitzones[];
}
