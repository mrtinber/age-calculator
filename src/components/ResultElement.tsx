interface ResultElementProps {
    data: number | null;
    unit: string;
}

export const ResultElement = ({ data, unit }: ResultElementProps) => {
    return (
        <h2 className="font-bold text-5xl lg:text-6xl italic">
            <span className="text-[#8151f9]">
                {data === null ? "--" : data}
            </span>{" "}
            {unit}
        </h2>
    );
};
