import { Line } from "../typings";

export type FeeInfo = {
    fee:
        | {
              date: number;
              bikeNumber: string;
              rentalStart: number;
              reason: string;
              cost: number;
          }
        | undefined;
};

const REGEX = /.*?(\d+)\s(\d{2}\.\d{2}\.)\s(\d{2}:\d{2}:\d{2})\s\[([^\]]+)\]/gm;

const year = new Date().getFullYear();

export default (line: Line): FeeInfo => {
    const matches = REGEX.exec(line.action);
    if (!matches) return { fee: undefined };

    const [, bikeNumber, date, time, reason] = matches;

    const rentalStart = new Date(`${year}-${date.slice(3, 5)}-${date.slice(0, 2)} ${time}`);

    return {
        fee: {
            date: line.date,
            bikeNumber,
            rentalStart: rentalStart.getTime(),
            reason,
            cost: line.cost,
        },
    };
};
