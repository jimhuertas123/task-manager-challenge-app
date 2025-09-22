import type { UserFieldsFragment } from '@/__generated__/graphql';
import { CircleXIcon } from '@/assets/icons';
import { CircleAvatar } from '@/components/ui/UICardComponents/CircleAvatar';
import { useUsers } from '@/hooks/useUsers';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { data, loading, error } = useUsers();
  const navigate = useNavigate();

  let user: UserFieldsFragment | undefined;
  if (data?.users) {
    user = (data?.users as UserFieldsFragment[]).find(
      (user) => user.id === '2c69a930-16ed-41c0-afb3-a7564471d307'
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="flex pt-10 bg-neutro-4 h-[100dvh] w-[100dvw] text-neutro-2">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="absolute p-2 top-4 right-10 text-neutro-2 text-[36px] w-13 h-13 flex justify-center items-center rounded-full hover:scale-105 active:scale-95 active:bg-white/10 hover:bg-white/10 hover:bg-opacity-80"
      >
        <CircleXIcon className="w-full h-full fill-neutro-2" />
      </button>
      <div className="flex flex-col items-center w-full">
        <CircleAvatar
          userId="2c69a930-16ed-41c0-afb3-a7564471d307"
          size={300}
        />

        <div className="mt-6 text-center">
          <h1 className="text-4xl font-bold text-neutro-1">{user.fullName}</h1>
          <p className="text-lg text-neutro-2">{user.email}</p>
          <div className="mt-4 flex flex-col gap-2 items-center text-neutro-2/50 text-sm bg-neutro-5/60 rounded-lg px-6 py-4 shadow-inner w-fit mx-auto">
            <p>
              Account Created:{' '}
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p>
              Last Updated:{' '}
              {new Date(user.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p>User Type: {user.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
