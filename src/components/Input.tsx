interface InputProps {
    id: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string | null;
}

export const Input = ({
    id,
    placeholder,
    value,
    onChange,
    error,
}: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className={`font-bold text-xs text-zinc-600 ${
                    error && "text-red-600"
                }`}
            >
                {id.toUpperCase()}
            </label>
            <input
                type="text"
                id={id}
                placeholder={placeholder}
                className={`border-[1px] cursor-pointer ${
                    error ? "border-red-400" : "border-gray-300"
                } focus-visible:border-[#8151f9] focus:outline-none rounded-md py-1 px-3 font-bold text-sm sm:text-lg lg:text-xl w-full xl:w-32`}
                value={value}
                onChange={onChange}
            />
            {error && <span className="text-xs text-red-400 flex-wrap">{error}</span>}
        </div>
    );
};
