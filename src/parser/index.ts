import { Line } from "../typings";
import parseRental from "./parseRental";

export default (line: Line) => {
    if (line.action.includes("Rental")) return parseRental(line);
};
