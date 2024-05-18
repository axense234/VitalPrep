"use client";
// Components
import EntityInfo from "@/components/page/entity/EntityInfo";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const RecipeInfo = () => {
  useAuthorization();
  return <EntityInfo />;
};

export default RecipeInfo;
