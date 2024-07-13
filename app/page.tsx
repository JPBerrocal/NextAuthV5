import { MdOutlineLockPerson } from "react-icons/md";
import { cn } from "@/lib/utils";

import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <div
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          <div className="relative px-4 py-3 flex items-center space-x-1">
            <MdOutlineLockPerson />
            <span className="-mr-1">Auth</span>
          </div>
        </div>
        <p className="text-white text-lg">A simple authentication service</p>
        <Button variant="secondary" size="lg">
          Sign In
        </Button>
      </div>
    </main>
  );
}
