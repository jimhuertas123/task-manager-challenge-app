// import { PlusMinusIcon } from '@/assets/icons';
// import * as NavigationMenu from '@radix-ui/react-navigation-menu';
// import './NavigationForm.style.css';
// import type { useForm } from 'react-hook-form';
// import type { NewTaskData } from '@/schema/schemaNewTask';

// export const NavigationForm = ({
//   titles,
//   register,
// }: {
//   titles: [string, string, string, string];
//   register: ReturnType<typeof useForm<NewTaskData>>['register'];
// }) => {
//   return (
//     <NavigationMenu.Root className="NavigationMenuRoot relative w-full">
//       <NavigationMenu.List className="grid grid-cols-[24%_24%_24%_24%] w-full">
//         <NavigationMenu.Item
//           className="flex w-[100%] text-neutro-1"
//           style={{ backgroundColor: 'rgba(148, 151, 154, 0.1)' }}
//         >
//           <NavigationMenu.Trigger className="  NavigationMenuTrigger">
//             <PlusMinusIcon className="fill-neutro-1" />
//             <span>{titles[0]}</span>
//           </NavigationMenu.Trigger>
//           <NavigationMenu.Content className="NavigationMenuContent">
//             <h2>gaaaaa</h2>
//           </NavigationMenu.Content>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item>
//           <NavigationMenu.Trigger className="NavigationMenuTrigger">
//             <span>{titles[1]}</span>
//           </NavigationMenu.Trigger>
//           <NavigationMenu.Content className="NavigationMenuContent">
//             <ul className="List two">
//               <h2>gaaaaa</h2>
//             </ul>
//           </NavigationMenu.Content>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item>
//           <NavigationMenu.Trigger className="NavigationMenuTrigger">
//             <span>{titles[2]}</span>
//           </NavigationMenu.Trigger>
//           <NavigationMenu.Content className="NavigationMenuContent">
//             <ul className="List two">
//               <h2>gaaaaa</h2>
//             </ul>
//           </NavigationMenu.Content>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item>
//           <NavigationMenu.Trigger className="NavigationMenuTrigger">
//             <span>{titles[3]}</span>
//           </NavigationMenu.Trigger>
//           <NavigationMenu.Content className="NavigationMenuContent">
//             <ul className="List two">
//               <h2>gaaaaa</h2>
//             </ul>
//           </NavigationMenu.Content>
//         </NavigationMenu.Item>

//         <NavigationMenu.Indicator className="NavigationMenuIndicator">
//           <div className="Arrow" />
//         </NavigationMenu.Indicator>
//       </NavigationMenu.List>

//       <div className="ViewportPosition">
//         <NavigationMenu.Viewport className="NavigationMenuViewport" />
//       </div>
//     </NavigationMenu.Root>
//   );
// };
