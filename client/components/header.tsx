interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  return (
    <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
  );
} 