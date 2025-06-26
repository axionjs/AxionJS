import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] flex items-center justify-center ">
      {children}
    </div>
  );
};
export default AuthLayout;
