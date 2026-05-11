interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "navy" | "white" | "green" | "red" | "yellow";
  className?: string;
}

export default function Badge({ children, variant = "gold", className = "" }: BadgeProps) {
  const variants = {
    gold: "gold-gradient-bg text-white",
    navy: "bg-gray-800 text-white",
    white: "bg-[#ffffff1a] text-[#B8BDC7]",
    green: "bg-emerald-500/20 text-emerald-400",
    red: "bg-red-500/20 text-red-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
