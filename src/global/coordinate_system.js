import {Enum} from "enumify";

/**
 * SCREEN     : Screen coordinate system
 * CARTESIAN  : Cartesian coordinate system
 */
class COORDINATE_SYSTEM extends Enum {
}
COORDINATE_SYSTEM.initEnum(["SCREEN", "CARTESIAN"]);

export default COORDINATE_SYSTEM;
