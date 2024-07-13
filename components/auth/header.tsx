import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { MdOutlineLockPerson } from "react-icons/md";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className={cn("text-3xl font-semibold", font.className)}>
        <div className="relative px-4 py-3 flex items-center space-x-1">
          <MdOutlineLockPerson />
          <h1>Auth</h1>
        </div>
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
