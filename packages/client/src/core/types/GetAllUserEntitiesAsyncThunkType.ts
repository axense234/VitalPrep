import { AsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import EntityQueryValues from "./entity/EntityQueryValues";
import DayTemplateType from "./entity/dayTemplate/DayTemplateType";
import IngredientType from "./entity/ingredient/IngredientType";
import InstanceTemplateType from "./entity/instanceTemplate/InstanceTemplateType";
import RecipeType from "./entity/recipe/RecipeType";
import UtensilType from "./entity/utensil/UtensilType";

type GetAllUserEntitiesAsyncThunkType =
  | AsyncThunk<
      AxiosError<unknown, any> | IngredientType[],
      { userId: string; entityQueryValues: EntityQueryValues },
      {}
    >
  | AsyncThunk<
      AxiosError<unknown, any> | UtensilType[],
      { userId: string; entityQueryValues: EntityQueryValues },
      {}
    >
  | AsyncThunk<
      AxiosError<unknown, any> | RecipeType[],
      { userId: string; entityQueryValues: EntityQueryValues },
      {}
    >
  | AsyncThunk<
      AxiosError<unknown, any> | DayTemplateType[],
      { userId: string; entityQueryValues: EntityQueryValues },
      {}
    >
  | AsyncThunk<
      AxiosError<unknown, any> | InstanceTemplateType[],
      { userId: string; entityQueryValues: EntityQueryValues },
      {}
    >;

export default GetAllUserEntitiesAsyncThunkType;
