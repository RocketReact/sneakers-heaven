
export function Input({ className, ...props }) {
    return <input className={`border rounded-md p-2 ${className}`} {...props} />;
}