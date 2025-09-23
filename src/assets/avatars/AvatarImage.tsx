import Avatar1 from './avatar-1.svg';
import Avatar2 from './avatar-2.svg';
import Avatar3 from './avatar-3.svg';
import Avatar4 from './avatar-4.svg';
import Avatar5 from './avatar-5.svg';

const avatarList = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5];

type AvatarImageProps = {
  index: number;
  className?: string;
  size?: number | string;
  alt?: string;
};

export const AvatarImage = ({
  index,
  className = '',
  size = 25,
  alt = 'User Avatar',
}: AvatarImageProps) => {
  const src = avatarList[index % avatarList.length] || avatarList[0];

  return (
    <img
      role="img"
      src={src}
      alt={alt}
      className={className}
      width={size}
      height={size}
      style={{ objectFit: 'cover', display: 'inline-block' }}
    />
  );
};
