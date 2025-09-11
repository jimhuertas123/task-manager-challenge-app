import './ListCard.style.css';
import { AccordingLists } from './AccordingLists';
// import type { GetAllTasksQuery } from '@/types/__generated__/graphql';
// { tasks }: { tasks: GetAllTasksQuery['tasks'] }
export const ListCards = () => {
  const listTitleStyle =
    'flex bg-neutro-4 pl-4 items-center font-normal text-nav-bar-m w-full tracking-[2px]';

  const listTitleGridStyle = `grid p-[1px] gap-x-[1px] grid-cols-[45%_15.1%_12.6%_14.3%_auto]
    rounded-[4px] text-lg font-bold tracking-wide bg-neutro-3 h-[56px]`;
  // tasks;
  return (
    <div className="bg-amber-950 w-full h-full pt-2 overflow-x-auto ">
      <div className="min-w-[745px] max-w-[1800px] mx-auto pt-[5%] sm:pt-[0]">
        <header className={listTitleGridStyle}>
          <div
            className={`${listTitleStyle} sm:tracking-[0.7px] rounded-tl-[4px] rounded-bl-[4px]`}
          >
            <h1 className="text-neutro-1"># Task Name</h1>
          </div>
          <div className={`${listTitleStyle} sm:tracking-[0.7px]`}>
            <h1 className="text-neutro-1">Task Tags</h1>
          </div>
          <div className={`${listTitleStyle} sm:tracking-[0.7px]`}>
            <h1 className="text-neutro-1">Estimate</h1>
          </div>
          <div className={`${listTitleStyle} sm:tracking-[0px]`}>
            <h1 className="text-neutro-1 whitespace-nowrap overflow-hidden text-ellipsis sm:whitespace-normal sm:overflow-visible sm:text-clip max-w-[120px]">
              Task Assign Name
            </h1>
          </div>
          <div
            className={`${listTitleStyle} sm:tracking-[0.7px] rounded-tr-[4px] rounded-br-[4px]`}
          >
            <h1 className="text-neutro-1">Due Date</h1>
          </div>
        </header>

        <AccordingLists listTitleStyle={listTitleStyle} />
        <AccordingLists listTitleStyle={listTitleStyle} />
        <AccordingLists listTitleStyle={listTitleStyle} />
        {/* <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger
                className={`AccordionTrigger ${listTitleStyle} h-[55px] border-neutro-3 border-[1px] rounded-t-[4px]`}
              >
                Item 1
                <ArrowIcon className="AccordionChevron fill-neutro-2" />
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
        </Accordion.Root> */}
      </div>
    </div>
  );
};
