import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode, forwardRef } from "react";
import { IconType } from "react-icons/lib";

type Props<T extends ReactNode> = {
  Icon: IconType;
  title: string;
  value: T;
  additionalContent?: JSX.Element | string | number | null;
  onAdditionalContentClick?: VoidFunction;
};

export const StatCard = forwardRef(
  <T extends ReactNode>({ Icon, title, value, additionalContent, onAdditionalContentClick }: Props<T>) => {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {additionalContent && (
            <button type="button" onClick={onAdditionalContentClick} className="mt-2.5 text-xs text-muted-foreground">
              {additionalContent}
            </button>
          )}
        </CardContent>
      </Card>
    );
  },
);
