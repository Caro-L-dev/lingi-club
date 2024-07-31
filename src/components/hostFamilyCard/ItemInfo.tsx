

export default function ItemInfo({
  icon,
  nativeLanguage,
  region,
  price,
  children,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <div className="flex items-center gap-x-1">
      <span className="text-secondary">{icon}</span>
      <div>
        <p>{nativeLanguage}</p>
        <p>{region}</p>
        <p>{price}</p>
      </div>
      {children}
    </div>
  );
}
