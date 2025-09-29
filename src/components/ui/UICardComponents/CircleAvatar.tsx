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
  const users: UserFieldsFragment[] =
    (data?.users as UserFieldsFragment[]) ?? [];
  const avatarCount = 5;

  let index = 0;

  if (userId) {
    const userIndex = users.findIndex(
      (user: { id: string }) => user.id === userId
    );

    index =
      userIndex !== -1
        ? userIndex % avatarCount
        : userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
          avatarCount;
  }

  const userName = users.find((user) => user.id === userId)?.fullName || 'User';

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
      id={`user-avatar-${userId}`}
      aria-label={`Avatar of ${userName}`}
      role="img"
      className="border-[1px] border-neutro-1 bg-neutro-2 overflow-hidden rounded-full hover:scale-105 active:scale-95 transition-transform duration-200"
      style={{ width: size, height: size }}
    >
      <AvatarImage
        index={index}
        size={avatarSize}
        alt={`Avatar of ${userName}`}
      />
    </div>
  );
};
