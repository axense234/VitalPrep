// // React
// import { FC } from "react";
// // SCSS
// import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// // Types
// import EntityType from "@/core/types/entity/users/EntityType";
// import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
// import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";
// import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
// import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
// import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
// import UtensilTemplate from "@/core/types/entity/utensil/UtensilTemplate";
// // Components
// import EntityCard from "../src/components/shared/entity/EntityCard";
// // Next
// import { Link } from "@/navigation";

// const EntityInfoDetailsComposedSection: FC<{
//   entityType: EntityType;
//   entities:
//     | IngredientTemplate[]
//     | UtensilTemplate[]
//     | RecipeTemplate[]
//     | DayTemplateTemplate[]
//     | InstanceTemplateTemplate[]
//     | MealPrepPlanTemplate[];
// }> = ({ entities, entityType }) => {
//   let entityInfoDetailsComposedSectionTitle = null;

//   const buildEntityLinkDestination = (entityId: string) => {
//     return `/${entityType}/${entityId}`;
//   };

//   switch (entityType) {
//     case "ingredient":
//       entityInfoDetailsComposedSectionTitle = "Ingredients Used";
//       break;
//     case "utensil":
//       entityInfoDetailsComposedSectionTitle = "Utensils Used";
//       break;
//     case "recipe":
//       entityInfoDetailsComposedSectionTitle = "Recipes Used";
//       break;
//     case "dayTemplate":
//       entityInfoDetailsComposedSectionTitle = "Day Templates Used";
//       break;
//     case "instanceTemplate":
//       entityInfoDetailsComposedSectionTitle = "Instance Templates Used";
//       break;
//     case "mealPrepPlan":
//       entityInfoDetailsComposedSectionTitle = "Meal Prep Plans Used";
//       break;
//     default:
//       break;
//   }

//   return (
//     <div className={entityInfoStyles.entityInfoDetailsComposedSectionContainer}>
//       <h3>{entityInfoDetailsComposedSectionTitle}</h3>
//       <ul className={entityInfoStyles.entityInfoDetailsComposedSectionEntities}>
//         {entities?.map((entity) => {
//           return (
//             <li key={entity.id}>
//               <Link
//                 href={buildEntityLinkDestination(entity.id as string) as any}
//                 title="View More"
//                 aria-label="View More"
//               >
//                 <EntityCard
//                   entity={entity}
//                   entityType={entityType}
//                   isALink={false}
//                   size="medium"
//                 />
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default EntityInfoDetailsComposedSection;
