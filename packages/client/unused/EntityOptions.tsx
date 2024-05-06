// // SCSS
// import entityOptionsStyles from "../../../scss/components/shared/EntityOptions.module.scss";
// // Data
// import { createToolOptions as entityOptions } from "@/data";
// // Redux
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import {
//   selectSelectedEntityOption,
//   setSelectedEntityOption,
// } from "@/redux/slices/generalSlice";

// const EntityOptions = () => {
//   const dispatch = useAppDispatch();
//   const selectedEntityOption = useAppSelector(selectSelectedEntityOption);

//   return (
//     <ul className={entityOptionsStyles.entityOptions}>
//       {entityOptions.map((entityOption) => {
//         return (
//           <li
//             key={entityOption.id as number}
//             title={`Select ${entityOption.label}`}
//             aria-label={`Select ${entityOption.label}`}
//           >
//             <button
//               className={entityOptionsStyles.entityOption}
//               onClick={() =>
//                 dispatch(setSelectedEntityOption(entityOption.optionValue))
//               }
//               style={{
//                 backgroundColor:
//                   selectedEntityOption === entityOption.optionValue
//                     ? entityOption.associatedColor
//                     : "#DDD9D5",
//                 color:
//                   selectedEntityOption === entityOption.optionValue
//                     ? entityOption.associatedTextColor
//                     : "#120A06",
//               }}
//             >
//               {entityOption.label}
//             </button>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default EntityOptions;
