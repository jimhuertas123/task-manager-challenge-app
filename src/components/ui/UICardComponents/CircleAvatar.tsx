export const CircleAvatar = ({
  fullName,
  size,
}: {
  fullName: string;
  size: number;
}) => {
  const colorBGAvatar = [
    '#8B0000',
    '#2C3E50',
    '#4B0082',
    '#006400',
    '#483D8B',
    '#800000',
    '#191970',
    '#2F4F4F',
    '#3B3B3B',
    '#5D1451',
  ];
  const getInitialsFromUrl = (name: string) => {
    return name
      .split(' ')
      .map((n) => n.charAt(0).toUpperCase())
      .join('');
  };
  const bgColorAvatar =
    colorBGAvatar[Math.floor(Math.random() * colorBGAvatar.length)];

  return (
    <div
      className={`w-${size} h-${size} p-1 rounded-[50%] flex align border-[0.5px] border-neutro-2 text-nav-bar-s font-normal justify-center items-center`}
      style={{ backgroundColor: bgColorAvatar }}
    >
      {getInitialsFromUrl(fullName)}
    </div>
  );
};
