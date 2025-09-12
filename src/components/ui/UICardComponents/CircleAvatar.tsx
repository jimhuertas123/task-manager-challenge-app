export const CircleAvatar = ({
  fullName,
  size,
}: {
  fullName: string;
  size: string;
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
      className={`flex items-center justify-center border-[0.5px] border-neutro-2 text-nav-bar-s font-normal rounded-full`}
      style={{
        backgroundColor: bgColorAvatar,
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        padding: '15px',
      }}
    >
      {getInitialsFromUrl(fullName)}
    </div>
  );
};
