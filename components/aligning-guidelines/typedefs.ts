import type { FabricObject, Point, TOriginX, TOriginY } from "@boardxus/canvasx-core";

export type LineProps = {
  origin: Point;
  target: Point;
};

export type PointMap = { [props: string]: Point };

export type OriginMap = { [props: string]: [TOriginX, TOriginY] };

export type AligningLineConfig = {
  /** At what distance from the shape does alignment begin? */
  margin: number;
  /** Aligning line dimensions */
  width: number;
  /** Aligning line color */
  color: string;
  /** Close Vertical line, default false. */
  closeVLine: boolean;
  /** Close horizontal line, default false. */
  closeHLine: boolean;
  /** Returns shapes that can draw aligning lines, default returns all shapes on the canvas excluding groups. */
  getObjectsByTarget?: (target: FabricObject) => Set<FabricObject>;
  /** When the user customizes the controller, this property is set to enable or disable automatic alignment through point scaling/resizing. */
  getPointMap?: (target: FabricObject) => PointMap;
  /** When the user customizes the controller, this property is used to enable or disable alignment positioning through points. */
  getContraryMap?: (target: FabricObject) => PointMap;
  /** Alignment method is required when customizing. */
  contraryOriginMap?: OriginMap;
};
