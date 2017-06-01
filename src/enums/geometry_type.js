import {Enum} from "enumify";

/**
 * POLYLINE   : polyline
 * POLYGON    : polygon
 */
class GEOMETRY_TYPE extends Enum {
}
GEOMETRY_TYPE.initEnum(["POLYLINE", "POLYGON"]);

export default GEOMETRY_TYPE;
