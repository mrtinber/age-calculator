import { FormEvent, useState } from "react";
import { Input } from "./Input";
import Arrow from "../assets/images/icon-arrow.svg";
import { Result } from "../App";

interface FormProps {
    setResult: React.Dispatch<React.SetStateAction<Result>>;
}

export const Form: React.FC<FormProps> = ({ setResult }) => {
    const [day, setDay] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");

    const [yearError, setYearError] = useState<string | null>("");
    const [monthError, setMonthError] = useState<string | null>("");
    const [dayError, setDayError] = useState<string | null>("");

    const isValidDate = (year: number, month: number, day: number): boolean => {
        month = month + 1;
        setDayError(null);

        if (month === 2) {
            const isLeapYear =
                year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
            if (day > (isLeapYear ? 29 : 28)) return false;
        }

        if (month === 4 || month === 6 || month === 9 || month === 11) {
            if (day > 30) {
                return false;
            }
        }

        return true;
    };

    const validateYear = (value: string) => {
        const now = new Date().getFullYear();
        const yearNum = parseInt(value, 10);
        if (value === "") {
            setYearError("This field is required");
        } else if (!/^\d+$/.test(value)) {
            setYearError("Must be a valid year");
        } else if (yearNum > now) {
            setYearError("Must be in the past");
        } else {
            setYearError(null);
        }
        setYear(value);
    };

    const validateMonth = (value: string) => {
        const monthNum = parseInt(value);
        if (value === "") {
            setMonthError("This field is required");
        } else if (monthNum > 12 || monthNum < 1) {
            setMonthError("Must be a valid month");
        } else {
            setMonthError(null);
        }
        setMonth(value);
    };

    const validateDay = (value: string) => {
        const dayNum = parseInt(value);

        if (value === "") {
            setDayError("This field is required");
        } else if (dayNum < 1 || dayNum > 31) {
            setDayError("Must be a valid day");
        } else {
            setDayError(null);
        }

        setDay(value);
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        let hasError = false;

        if (day === "") {
            setDayError("This field is required");
            hasError = true;
        }

        if (month === "") {
            setMonthError("This field is required");
            hasError = true;
        }

        if (year === "") {
            setYearError("This field is required");
            hasError = true;
        }

        if (day === "" || month === "" || year === "") {
            return;
        }

        const now = new Date();

        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10) - 1;
        const yearNum = parseInt(year, 10);

        const birthDate = new Date(yearNum, monthNum, dayNum);

        if (!isValidDate(yearNum, monthNum, dayNum)) {
            setDayError("Must be a valid date");
            return;
        }

        if (dayError || monthError || yearError) return;

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        setResult({
            years,
            months,
            days,
        });
    };

    return (
        <form
            onSubmit={onSubmit}
            className="flex gap-2 border-b-2 border-gray-300 pb-12 lg:pb-8 relative"
        >
            <Input
                id="day"
                placeholder="DD"
                value={day}
                onChange={(e) => validateDay(e.target.value)}
                error={dayError}
            />
            <Input
                id="month"
                placeholder="MM"
                value={month}
                onChange={(e) => validateMonth(e.target.value)}
                error={monthError}
            />
            <Input
                id="year"
                placeholder="YYYY"
                value={year}
                onChange={(e) => validateYear(e.target.value)}
                error={yearError}
            />

            <button
                type="submit"
                className="bg-[#8151F9] cursor-pointer hover:bg-black transition-colors duration-300 text-white rounded-full p-4 absolute bottom-0 translate-y-1/2 right-1/2 lg:right-5 xl:right-8 translate-x-1/2 "
            >
                <img
                    src={Arrow}
                    alt="Une flèche dans le bouton submit"
                    className="w-5 xl:w-8"
                />
            </button>
        </form>
    );
};
