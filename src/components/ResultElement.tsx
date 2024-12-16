import { useSpring, animated } from "@react-spring/web";
interface ResultElementProps {
    data: number | null;
    unit: string;
}

export const ResultElement: React.FC<ResultElementProps> = ({ data, unit }) => {
    const [springProps] = useSpring(
        () => ({
            number: data ?? 0, // Anime vers la valeur cible, 0 par défaut
            from: { number: 0 }, // Point de départ à 0
            config: { duration: 750 }, // Durée de l'animation
        }),
        [data] // Dépendance pour réanimer si data change
    );

    return (
        <div className="flex gap-2">
            <h2 className="font-bold text-6xl italic">
                <animated.span className={`text-[#8151f9]`}>
                    {/* Affiche la valeur entière en animant */}
                    {data === null ? "--" : springProps.number.to((n) => Math.floor(n))}
                </animated.span>{" "}
                {unit}
            </h2>
        </div>
    );
};
