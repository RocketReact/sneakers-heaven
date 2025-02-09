export function Card({ children, className }) {
    return <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
    return <div className="font-semibold text-xl">{children}</div>;
}

export function CardContent({ children }) {
    return <div>{children}</div>;
}

export function CardTitle({ children }) {
    return <h2 className="text-lg font-bold">{children}</h2>;
}