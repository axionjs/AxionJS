interface HeaderProps {
  mainLabel: string;
  subLabel: string;
}

export const Header = ({ mainLabel, subLabel }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-bold">{mainLabel}</h1>
      <p className="text-muted-foreground text-sm">{subLabel}</p>
    </div>
  );
};
