// // SCSS
// import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
// import createLogContentStyles from "../../../scss/pages/CreateLog.module.scss";
// // Components
// import SelectFormControl from "@/components/shared/form/SelectFormControl";
// import TextFormControl from "@/components/shared/form/TextFormControl";
// import ImageFormControl from "@/components/shared/form/ImageFormControl";
// import PrimaryButton from "@/components/shared/PrimaryButton";
// import PopupModal from "@/components/shared/modals/PopupModal";
// // Data
// import {
//   defaultEntityQueryValues,
//   defaultInstanceTemplateImageUrl,
// } from "@/data";
// // Redux
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import {
//   changeShowFormModal,
//   changeShowGeneralModal,
//   createCloudinaryImage,
//   selectLoadingCloudinaryImage,
//   selectProfile,
//   selectTemplateImageUrl,
//   setTemplateModalMessage,
// } from "@/redux/slices/generalSlice";
// import {
//   getAllUserInstanceTemplates,
//   selectAllInstanceTemplatesIds,
//   selectLoadingGetUserInstanceTemplates,
// } from "@/redux/slices/instanceTemplatesSlice";
// import {
//   createMealPrepLog,
//   selectLoadingCreateMealPrepLog,
//   selectMealPrepLogFormModalErrorMessage,
//   selectTemplateMealPrepLog,
//   updateTemplateMealPrepLog,
// } from "@/redux/slices/mealPrepLogsSlice";
// import { updateLoadingCreateIngredient } from "@/redux/slices/ingredientsSlice";
// // React
// import { useEffect } from "react";

// const CreateLogContent = () => {
//   const dispatch = useAppDispatch();
//   const templateMealPrepLog = useAppSelector(selectTemplateMealPrepLog);
//   const loadingCreateMealPrepLog = useAppSelector(
//     selectLoadingCreateMealPrepLog
//   );
//   const mealPrepLogFormModalErrorMessage = useAppSelector(
//     selectMealPrepLogFormModalErrorMessage
//   );

//   const profile = useAppSelector(selectProfile);

//   const templateImageUrl = useAppSelector(selectTemplateImageUrl);
//   const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);

//   const loadingGetUserInstanceTemplates = useAppSelector(
//     selectLoadingGetUserInstanceTemplates
//   );
//   const instanceTemplateIds = useAppSelector(selectAllInstanceTemplatesIds);

//   useEffect(() => {
//     if (loadingCreateMealPrepLog === "SUCCEDED") {
//       dispatch(changeShowGeneralModal(true));
//       dispatch(
//         setTemplateModalMessage(
//           `Successfully added meal prep log: ${templateMealPrepLog.name}.`
//         )
//       );
//     } else if (loadingCreateMealPrepLog === "FAILED") {
//       dispatch(changeShowGeneralModal(false));
//       dispatch(changeShowFormModal(true));
//       dispatch(setTemplateModalMessage(mealPrepLogFormModalErrorMessage));
//     }
//     const timeout = setTimeout(() => {
//       dispatch(updateLoadingCreateIngredient("IDLE"));
//     }, 10);
//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [loadingCreateMealPrepLog]);

//   useEffect(() => {
//     if (loadingGetUserInstanceTemplates === "IDLE" && profile.id) {
//       dispatch(
//         getAllUserInstanceTemplates({
//           entityQueryValues: defaultEntityQueryValues,
//           userId: profile.id,
//         })
//       );
//     }
//   }, [loadingGetUserInstanceTemplates, profile.id]);

//   useEffect(() => {
//     if (loadingCloudinaryImage === "SUCCEDED") {
//       dispatch(
//         updateTemplateMealPrepLog({ key: "imageUrl", value: templateImageUrl })
//       );
//     }
//   }, [loadingCloudinaryImage]);

//   return (
//     <section className={createLogContentStyles.createLogContentContainer}>
//       <div className={createLogContentStyles.createLogContent}>
//         <PopupModal hasBorder={true} modalType="form" />
//         <h2>Add Log</h2>
//         <form className={createLogContentStyles.createLogContentForm}>
//           <SelectFormControl
//             labelColor="#120A06"
//             labelContent="Template Used:"
//             required={true}
//             entityPropertyOptions={instanceTemplateIds}
//             entityPropertyChosenOptions={
//               templateMealPrepLog.instanceTemplateId as string
//             }
//             onEntityPropertyValueChange={(instanceTemplateId) =>
//               dispatch(
//                 updateTemplateMealPrepLog({
//                   key: "instanceTemplateId",
//                   value: instanceTemplateId,
//                 })
//               )
//             }
//             entityTypeUsed="instanceTemplate"
//             labelFontSize={28}
//             areOptionsLoading={loadingGetUserInstanceTemplates === "PENDING"}
//             backgroundColor="#d2b48c"
//             canSelectMultipleEntities={false}
//             border="1.5px solid getColor(black-100-1)"
//           />
//           <TextFormControl
//             direction="row"
//             entityProperty={templateMealPrepLog.name}
//             labelColor="#DDD9D5"
//             labelContent="Meal Prep Log Name:"
//             onEntityPropertyValueChange={(e) =>
//               dispatch(
//                 updateTemplateMealPrepLog({
//                   key: "name",
//                   value: e.target.value,
//                 })
//               )
//             }
//             required={true}
//             type="text"
//             inputHeight={36}
//             labelFontSize={28}
//           />
//           <TextFormControl
//             direction="row"
//             entityProperty={templateMealPrepLog.date
//               ?.toISOString()
//               .slice(0, 16)}
//             labelColor="#DDD9D5"
//             labelContent="Meal Prep Log Date:"
//             onEntityPropertyValueChange={(e) => {
//               const dateValue = e.target.value;
//               const newDateValue = new Date(dateValue);

//               dispatch(
//                 updateTemplateMealPrepLog({
//                   key: "date",
//                   value: newDateValue,
//                 })
//               );
//             }}
//             required={true}
//             type="datetime-local"
//             inputHeight={36}
//             labelFontSize={28}
//           />
//           <CheckboxFormControl
//             direction="row"
//             labelColor="#DDD9D5"
//             labelContent="Completed Meal Prep?:"
//             entityProperty={String(templateMealPrepLog.completed)}
//             onEntityPropertyValueChange={(e) =>
//               dispatch(
//                 updateTemplateMealPrepLog({
//                   key: "completed",
//                   value: !Boolean(e.target.value),
//                 })
//               )
//             }
//             labelFontSize={28}
//           />
//           <TextFormControl
//             direction="row"
//             entityProperty={templateMealPrepLog.cookingDuration}
//             labelColor="#DDD9D5"
//             labelContent="Cooking Duration(in hours):"
//             onEntityPropertyValueChange={(e) =>
//               dispatch(
//                 updateTemplateMealPrepLog({
//                   key: "cookingDuration",
//                   value: e.target.valueAsNumber,
//                 })
//               )
//             }
//             required={true}
//             type="number"
//             inputHeight={36}
//             labelFontSize={28}
//           />
//           <ImageFormControl
//             labelColor="#DDD9D5"
//             labelContent="Meal Prep Log Image:"
//             direction="row"
//             defaultImageUsedUrl={defaultInstanceTemplateImageUrl}
//             entityPropertyLoadingStatus={loadingCloudinaryImage}
//             entityProperty={templateMealPrepLog.imageUrl as string}
//             onEntityPropertyValueChange={(e) => {
//               if (e.target.files) {
//                 dispatch(
//                   createCloudinaryImage({
//                     entity: "mealPrepLogs",
//                     imageFile: e.target.files[0],
//                   })
//                 );
//               }
//             }}
//             labelFontSize={28}
//           />
//           <PrimaryButton
//             backgroundColor="#d2b48c"
//             textColor="#120A06"
//             content="Add Meal Prep Log"
//             type="functional"
//             fontSize={24}
//             height={64}
//             width={560}
//             disabled={
//               loadingCreateMealPrepLog === "PENDING" ||
//               loadingCloudinaryImage === "PENDING"
//             }
//             onClickFunction={(e) => {
//               e.preventDefault();
//               dispatch(
//                 createMealPrepLog({
//                   templateMealPrepLog: templateMealPrepLog,
//                   userId: profile.id,
//                 })
//               );
//             }}
//           />
//         </form>
//       </div>
//     </section>
//   );
// };

// export default CreateLogContent;
