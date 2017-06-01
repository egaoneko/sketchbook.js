import {Enum} from "enumify";

/**
 * CW     : clockwise
 * CCW    : counter clockwise
 */
class ORIENTATION extends Enum {
}
ORIENTATION.initEnum(["CW", "CCW"]);

export default ORIENTATION;
