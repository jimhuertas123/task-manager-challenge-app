import { ArrowIcon } from '@/assets/icons';
import './ListCard.style.css';
import * as Accordion from '@radix-ui/react-accordion';
import { ListTaskCard } from './ListTaskCard';
import type { GetAllTasksQuery } from '@/types/__generated__/graphql';

export const AccordingLists = ({
  listTitleStyle,
  title,
  tasks,
}: {
  listTitleStyle: string;
  title: string;
  tasks?: GetAllTasksQuery['tasks'];
}) => {
  if (!tasks) {
    return <div className="bg-neutro-4 w-full h-full pt-2">No Tasks</div>;
  }

  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue="item-1"
      className="mt-4"
    >
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger
            className={`AccordionTrigger ${listTitleStyle} h-[56px] border-neutro-3 border-x-[1px] border-y-[1px] rounded-t-[4px]`}
          >
            <ArrowIcon className="AccordionChevron w-2.8 h-2.8 fill-neutro-2 ml-1 mr-4" />
            <h2 className="text-nav-bar-l font-semibold tracking-[0.4px]">
              {title.charAt(0) + title.slice(1).toLowerCase().replace('_', ' ')}
            </h2>
            <h2 className="ml-1 text-nav-bar-l font-normal text-neutro-2">
              {`(0${tasks.filter((task) => task.status === title).length})`}
            </h2>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="AccordionContent">
          {tasks?.map((task, index) => (
            <ListTaskCard key={task.id} task={task} index={index} />
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
