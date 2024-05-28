// Types
import UtensilType from "@/core/types/entity/utensil/UtensilType";
// Redux
import { createEntityAdapter } from "@reduxjs/toolkit";

const utensilsAdapter = createEntityAdapter<UtensilType>();
export default utensilsAdapter;
