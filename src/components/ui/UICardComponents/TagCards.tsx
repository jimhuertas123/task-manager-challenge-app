import type { TaskTag } from '@/__generated__/graphql';
import { Popover } from '../Popover/Popover';

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
      'flex rounded-md px-2 xl:px-4 py-1 w-fit text-nav-bar-s xl:text-nav-bar-m'
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
  const extraTags = tags.slice(limitShow);
  const extraCount = tags.length - limitShow;
  return (
    <div
      data-cy="tag-cards"
      id="tag-cards"
      data-testid={tags.length === 0 ? 'tag-cards-empty' : undefined}
      className="flex gap-x-2 items-center"
    >
      {visibleTags.map((tag, index) => (
        <TagCard key={index} tag={tag} />
      ))}
      {extraCount > 0 && (
        <Popover
          side="bottom"
          button={
            <div
              data-cy="tag-cards-extra-button"
              className="flex hover:cursor-pointer active:text-neutro-1 hover:text-neutro-1 text-nav-bar-s xl:text-nav-bar-m rounded-md px-2 xl:px-4 py-1 w-fit bg-neutro-3 text-neutro-2"
            >
              +{extraCount}
            </div>
          }
        >
          <div className="bg-neutro-5 p-2 rounded flex gap-x-1 mt-2">
            {extraTags.map((tag, index) => (
              <TagCard key={index} tag={tag} />
            ))}
          </div>
        </Popover>
      )}
    </div>
  );
};
