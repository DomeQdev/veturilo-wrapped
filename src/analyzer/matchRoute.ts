import { PossibleRoute } from "../parser/parseRental";
import importedStations from "./stations.json";

const stations = new Map<string, [number, number]>(importedStations as any);

type Station = {
    name: string;
    coords?: [number, number];
};

export type Route = {
    start: Station;
    end: Station;
};

export default (possibleRoutes: PossibleRoute[]): Route | undefined => {
    for (const [start, end] of possibleRoutes) {
        let startStation: Station;
        let endStation: Station;

        const endExists = !!end;
        const isStartFreestanding = start.startsWith("BIKE");
        const isEndFreestanding = endExists && end.startsWith("BIKE");

        if (isStartFreestanding) {
            startStation = {
                name: "Freestanding",
            };
        } else {
            const startCoords = stations.get(start);
            if (!startCoords) continue;

            startStation = {
                name: start,
                coords: startCoords,
            };
        }

        if (isEndFreestanding) {
            endStation = {
                name: "Freestanding",
            };
        } else if (endExists) {
            const endCoords = stations.get(end);
            if (!endCoords) continue;

            endStation = {
                name: end,
                coords: endCoords,
            };
        } else {
            endStation = startStation;
        }

        return {
            start: startStation,
            end: endStation,
        };
    }
};
