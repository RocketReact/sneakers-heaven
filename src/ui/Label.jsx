

export function Label({ htmlFor, children }) {
    return <label htmlFor={htmlFor} className="block text-sm font-medium">{children}</label>;
}