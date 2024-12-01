import { Line } from "../typings";
import parseFee, { FeeInfo } from "./parseFee";
import parseRental, { RentalInfo } from "./parseRental";

export type ParserResult = RentalInfo & FeeInfo;

export const parse = (line: Line): ParserResult => ({
    ...parseRental(line),
    ...parseFee(line),
});
