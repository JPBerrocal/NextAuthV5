const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center primaryBG">
      {children}
    </div>
  );
};

export default AuthLayout;
