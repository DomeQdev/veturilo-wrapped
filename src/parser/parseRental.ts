import { Line } from "../typings";

interface RentalInfo {
    id: string;
    bikeType: string;
    bikeNumber: string;
    start: number;
    end: number;
    possibleRoutes: [string, string][];
    notes: string[];
}

const REGEX = /^\[Rental #(\d+)\]\s+(.*?)\s+(\d+)\s+until\s+(\d{2}:\d{2}:\d{2})\s+\((.*?)\)/gm;
const NOTES_REGEX = /\((.*?)\)/g;

export default function parseLine(line: Line): RentalInfo | undefined {
    const matches = REGEX.exec(line.action);

    if (!matches) return;

    const [, rentalId, bikeType, bikeNumber, rentalEnd, route] = matches;

    const start = new Date(line.date);
    const [hours, minutes, seconds] = rentalEnd.split(":").map(Number);

    const end = new Date(start);
    end.setHours(hours, minutes, seconds, 0);

    if (end < start) end.setDate(end.getDate() + 1);

    return {
        id: rentalId,
        bikeType,
        bikeNumber,
        start: start.getTime(),
        end: end.getTime(),
        possibleRoutes: possibleRoutes(route),
        notes: line.action.match(NOTES_REGEX) || [],
    };
}

const possibleRoutes = (route: string): [string, string][] => {
    const splits: [string, string][] = [];
    let index = -1;

    while ((index = route.indexOf(" - ", index + 1)) !== -1) {
        const start = route.substring(0, index);
        const end = route.substring(index + 3);
        splits.push([start, end]);
    }

    return splits;
};
