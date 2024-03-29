"use client";

import { HTMLAttributes } from "react";
import { MainNav } from "../dashboard/MainNav";

type Props = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

// export const metadata = {
//   title: "Page",
// };

export const Page = ({ children, ...props }: Props) => {
  return (
    <div {...props} className={`px-8 pt-8 ${props.className}`}>
      <MainNav />

      {children}
    </div>
  );
};
