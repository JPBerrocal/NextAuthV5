import { Navbar } from "./_components/navbar";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  return (
    <main className="primaryBG h-full w-full flex flex-col gap-y-10 justify-center items-center">
      <Navbar />
      {children}
    </main>
  );
};

export default ProtectedLayout;
