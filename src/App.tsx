import analyzer from "./analyzer";
import Input from "./components/Input";

function App() {
    return (
        <>
            <Input
                onDataChange={(data) => {
                    const analyzedData = analyzer(data);

                    console.log(analyzedData);
                }}
            />
        </>
    );
}

export default App;
