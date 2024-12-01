import matchRoute, { Route } from "../analyzer/matchRoute";
import { Line } from "../typings";

export type PossibleRoute = [string, string | undefined];

export type RentalInfo = {
    rental:
        | {
              id: string;
              bikeType: string;
              bikeNumber: string;
              start: number;
              end: number;
              route?: Route;
              notes: string[];
              serviceFee?: number;
              bonusFee?: number;
          }
        | undefined;
};

const REGEX = /^\[Rental #(\d+)\]\s+(.*?)\s+(\d+)\s+until\s+(\d{2}:\d{2}:\d{2})\s+\((.*?)\)(.*)/gm;
const NOTES_REGEX = /\((.*?)\)/g;
const FEE_REGEX = /\(service fee: PLN (\d+\.\d{2})\)/;
const BONUS_REGEX = /\(Service bonus: PLN (\d+\.\d{2})\)/;

export default (line: Line): RentalInfo => {
    const matches = REGEX.exec(line.action);
    if (!matches) return { rental: undefined };

    const [, rentalId, bikeType, bikeNumber, rentalEnd, route, notes] = matches;

    const start = new Date(line.date);
    const [hours, minutes, seconds] = rentalEnd.split(":").map(Number);

    const end = new Date(start);
    end.setHours(hours, minutes, seconds, 0);

    if (end < start) end.setDate(end.getDate() + 1);

    const rentalNotes = notes.match(NOTES_REGEX)?.map((note) => note.slice(1, -1)) || [];
    const serviceFee = FEE_REGEX.exec(notes)?.[1];
    const bonusFee = BONUS_REGEX.exec(notes)?.[1];

    const matchedRoute = matchRoute(possibleRoutes(route));

    return {
        rental: {
            id: rentalId,
            bikeType,
            bikeNumber,
            start: start.getTime(),
            end: end.getTime(),
            route: matchedRoute,
            notes: rentalNotes,
            serviceFee: serviceFee ? parseFloat(serviceFee) : undefined,
            bonusFee: bonusFee ? parseFloat(bonusFee) : undefined,
        },
    };
};

const possibleRoutes = (route: string): PossibleRoute[] => {
    const splits: [string, string][] = [];
    let index = -1;

    while ((index = route.indexOf(" - ", index + 1)) !== -1) {
        const start = route.substring(0, index);
        const end = route.substring(index + 3);
        splits.push([parseStationName(start), parseStationName(end)]);
    }

    return [...splits, [parseStationName(route), undefined]];
};

const parseStationName = (station: string) => station.replace(/–/g, "-").trim();
