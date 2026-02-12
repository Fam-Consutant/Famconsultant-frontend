import React from "react";

const DestinationLayout = ({ children }) => {
  return (
    <div className="destination-layout">
      <main className="destination-main">{children}</main>
    </div>
  );
};

export default DestinationLayout;
