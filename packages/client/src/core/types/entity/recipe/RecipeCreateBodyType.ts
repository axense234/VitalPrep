import RecipeTemplate from "./RecipeTemplate";

type RecipeCreateBodyType = {
  templateRecipe: RecipeTemplate;
  showVideoTutorialContent: boolean;
  showWrittenTutorialContent: boolean;
  userId: string;
};
export default RecipeCreateBodyType;
