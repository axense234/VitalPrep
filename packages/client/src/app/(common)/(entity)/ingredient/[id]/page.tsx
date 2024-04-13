"use client";
// Components
import EntityInfo from "@/components/page/entity/EntityInfo";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const IngredientInfo = () => {
  useAuthorization();
  return <EntityInfo />;
};

export default IngredientInfo;
