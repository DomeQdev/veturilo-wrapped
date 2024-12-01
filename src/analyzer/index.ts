import { parse } from "../parser";
import { Line } from "../typings";

export default (lines: Line[]) => {
    let skippedRentals = 0;

    for (const line of lines) {
        const parsedLine = parse(line);

        const rental = parsedLine.rental;
        const fee = parsedLine.fee;

        if (rental) {
            if (!rental.route) {
                skippedRentals++;
                continue;
            }
        } else if (fee) {
            console.log(fee);
        }
    }
};
