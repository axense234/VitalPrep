import { Utensil } from "@prisma/client";

type OptionalUtensil<T> = {
  [K in keyof T]?: T[K];
};

type UtensilTemplate = OptionalUtensil<Utensil>;

export default UtensilTemplate;
