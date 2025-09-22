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

  const userIndex = (users as UserFieldsFragment[]).findIndex(
    (user: { id: string }) => user.id === userId
  );

  const index =
    userIndex !== -1
      ? userIndex % avatarCount
      : userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        avatarCount;

  if (!userId) return <AvatarImage index={0} size={size} />;
  return (
    <div
      className="border-[1px] border-neutro-1 bg-neutro-2 overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <AvatarImage index={index} size={avatarSize} />
    </div>
  );
};
