import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return <div className="max-w-6xl mx-auto ">{children}</div>;
};

export default Container;
