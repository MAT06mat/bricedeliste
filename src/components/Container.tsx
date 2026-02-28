export default function Container({
    children,
    className = "",
    ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`max-w-5xl md:px-4 mx-auto text-center space-y-12 animate-in fade-in zoom-in duration-700 mb-0 md:mb-8 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
