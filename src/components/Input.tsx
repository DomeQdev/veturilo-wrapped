import { useState } from "react";
import { Line } from "../typings";

type Props = {
    onDataChange: (data: Line[]) => void;
};

export default ({ onDataChange }: Props) => {
    const [brokenData, setBrokenData] = useState<boolean>(false);

    const onLocalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!e.target.value) return setBrokenData(false);

        let data: Line[];

        try {
            data = JSON.parse(e.target.value);

            if (!Array.isArray(data)) throw new Error();

            onDataChange(data);
        } catch (e) {
            setBrokenData(true);
        }
    };

    return (
        <>
            <textarea style={{}} placeholder="Paste your data here" onChange={onLocalChange} />

            {brokenData && <p style={{ color: "red" }}>Data is broken</p>}
        </>
    );
};
