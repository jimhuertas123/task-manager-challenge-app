import type { TaskTag } from '@/types/__generated__/graphql';

const tagColors: { [key in TaskTag]: { color: string; bg: string } } = {
  RAILS: { color: '#FFFFFF', bg: 'rgba(148, 151, 154, 0.1)' },
  IOS: { color: '#70B252', bg: 'rgba(112, 178, 82, 0.1)' },
  NODE_JS: { color: '#2F61BF', bg: 'rgba(47, 97, 191, 0.1)' },
  ANDROID: { color: '#E5B454', bg: 'rgba(229, 180, 84, 0.1)' },
  REACT: { color: '#DA584B', bg: 'rgba(218, 88, 75, 0.1)' },
};

const TagCard = ({ tag }: { tag: TaskTag }) => (
  <div
    className={
      'flex rounded-md px-2 lg:px-4 py-1 w-fit text-nav-bar-s lg:text-nav-bar-m'
    }
    style={{
      color: tagColors[tag].color,
      backgroundColor: tagColors[tag].bg,
    }}
  >
    {tag}
  </div>
);

export const TagCards = ({
  tags,
  limitShow = 2,
}: {
  tags: TaskTag[];
  limitShow?: number;
}) => {
  const visibleTags = tags.slice(0, limitShow);
  const extraCount = tags.length - limitShow;
  return (
    <div className="flex gap-x-2 items-center">
      {visibleTags.map((tag, index) => (
        <TagCard key={index} tag={tag} />
      ))}
      {extraCount > 0 && (
        <div className="flex text-nav-bar-s lg:text-nav-bar-m rounded-md px-2 lg:px-4 py-1 w-fit bg-neutro-3 text-neutro-2">
          +{extraCount}
        </div>
      )}
    </div>
  );
};
