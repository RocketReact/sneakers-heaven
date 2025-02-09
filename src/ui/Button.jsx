export function Button({ children, className, ...props }) {
    return (
        <button
            className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}