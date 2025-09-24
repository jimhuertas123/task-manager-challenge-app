import type { UserFieldsFragment } from '@/__generated__/graphql';
import { AvatarImage } from '@/assets/avatars/AvatarImage';
import { useUsers } from '@/hooks/useUsers';

export const CircleAvatar = ({
  userId,
  size,
  avatarSize = size,
}: {
  userId: string;
  size: number;
  avatarSize?: number;
}) => {
  const { data } = useUsers();
  const users = data?.users ?? [];
  const avatarCount = 5;

  let index = 0;

  if (userId) {
    const userIndex = (users as UserFieldsFragment[]).findIndex(
      (user: { id: string }) => user.id === userId
    );

    index =
      userIndex !== -1
        ? userIndex % avatarCount
        : userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
          avatarCount;
  }

  if (!userId) {
    return (
      <div
        style={{ width: size, height: size }}
        className="bg-neutro-2 rounded-full text-nav-bar-l flex items-center justify-center"
      >
        {' '}
        ?{' '}
      </div>
    );
  }

  return (
    <div
      role="img"
      className="border-[1px] border-neutro-1 bg-neutro-2 overflow-hidden rounded-full hover:scale-105 active:scale-95 transition-transform duration-200"
      style={{ width: size, height: size }}
    >
      <AvatarImage
        index={index}
        size={avatarSize}
        alt={`Avatar of ${userId}`}
      />
    </div>
  );
};
