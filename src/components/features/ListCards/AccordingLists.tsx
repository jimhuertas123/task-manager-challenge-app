import { ArrowIcon } from '@/assets/icons';
import './ListCard.style.css';
import * as Accordion from '@radix-ui/react-accordion';
import type { ListTask } from './ListCards.types';

const tasksMock: ListTask[] = [
  {
    title: 'Design new homepage',
    taskTags: ['design', 'UI/UX'],
    estimate: 5,
    taskAssignName: 'Alice Johnson',
    dueDate: new Date('2023-10-15'),
  },
  {
    title: 'Implement authentication',
    taskTags: ['backend', 'security'],
    estimate: 8,
    taskAssignName: 'Bob Smith',
    dueDate: new Date('2023-10-20'),
  },
  {
    title: 'Set up database',
    taskTags: ['database', 'infrastructure'],
    estimate: 6,
    taskAssignName: 'Charlie Brown',
    dueDate: new Date('2023-10-18'),
  },
];

export const AccordingLists = ({
  listTitleStyle,
  tasks = tasksMock,
}: {
  listTitleStyle: string;
  tasks?: ListTask[];
}) => {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue="item-1"
      className="mt-2"
    >
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger
            className={`AccordionTrigger ${listTitleStyle} h-[55px] border-neutro-3 border-[1px] rounded-t-[4px]`}
          >
            <ArrowIcon className="AccordionChevron fill-neutro-2" />
            {tasks[0].title}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="AccordionContent">
          <div className="w-full bg-amber-100 max-h-[300px] overflow-y-auto">
            Content for item 1
          </div>
          <div className="w-full bg-amber-100 max-h-[300px] overflow-y-auto">
            Content for item 1
          </div>
          <div className="w-full bg-amber-100 max-h-[300px] overflow-y-auto">
            Content for item 1
          </div>
          <div className="w-full bg-amber-100 max-h-[300px] overflow-y-auto">
            Content for item 1
          </div>
          <div className="w-full bg-amber-100 max-h-[300px] overflow-y-auto">
            Content for item 1
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
