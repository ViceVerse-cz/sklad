import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

type Props<T extends ReactNode> = {
  Icon: IconType;
  title: string;
  value: T;
  additionalText?: string;
};

export const StatCard = <T extends ReactNode>({
  Icon,
  title,
  value,
  additionalText,
}: Props<T>) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{additionalText}</p>
      </CardContent>
    </Card>
  );
};
