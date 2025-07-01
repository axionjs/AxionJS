import React from "react";

const SimpleAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center pt-10">
      {children}
    </div>
  );
};
export default SimpleAuthLayout;
