import { ErrorAlertIcon } from '@/assets/icons';

export const ErrorPage = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col items-center h-[100dvh] bg-neutro-4">
      <ErrorAlertIcon className="w-[20%] pt-[15%]" />
      <h1 className=" text-primary-4 text-4xl font-bold mb-8">
        Unexpected Error
      </h1>
      <div className="text-center text-neutro-2">
        <p className="text-nav-bar-m">
          An unexpected error has occurred, tell your developer:
        </p>
        <p className="text-nav-bar-xl">{error}</p>
      </div>
    </div>
  );
};
