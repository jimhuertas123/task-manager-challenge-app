import { ArrowIcon } from '@/assets/icons';
import './ListCard.style.css';
import * as Accordion from '@radix-ui/react-accordion';
import type { ListTask } from './ListCards.types';
// import { TaskCard } from './ListTaskCard';

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
      className="mt-4"
    >
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger
            className={`AccordionTrigger ${listTitleStyle} h-[56px] border-neutro-3 border-x-[1px] border-y-[1px] rounded-t-[4px]`}
          >
            <ArrowIcon className="AccordionChevron fill-neutro-2" />
            {tasks[0].title}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="AccordionContent">
          {/* <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard /> */}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
