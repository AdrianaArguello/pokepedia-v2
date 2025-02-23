'use client'
import { FaceFrownIcon } from "@heroicons/react/16/solid";

interface EmptyStateProps {
    text: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ text }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-slate-500 text-center p-4 rounded-lg">
      <FaceFrownIcon className="h-16 w-16 text-slate-400 mb-4 animate-bounce" />
      <p className="text-lg font-semibold text-slate-500">{ text }</p>
    </div>
  );
};

export default EmptyState;
