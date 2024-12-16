import { ResultElement } from "./components/ResultElement";
import { Form } from "./components/Form";
import { useState } from "react";

export type Result = {
    years: null | number;
    months: null | number;
    days: null | number;
};

function App() {
    const [result, setResult] = useState<Result>({
        years: null,
        months: null,
        days: null,
    });

    return (
        <div className="w-full h-screen flex items-center font-poppins">
            <div className="bg-white rounded-3xl rounded-br-[150px] mx-4 lg:mx-auto lg:w-2/5 p-8">
                <Form setResult={setResult} />
                <div className="pt-12 md:pt-8">
                    <ResultElement data={result.years} unit="years" />
                    <ResultElement data={result.months} unit="months" />
                    <ResultElement data={result.days} unit="days" />
                </div>
            </div>
        </div>
    );
}

export default App;
