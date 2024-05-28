// Types
import DayTemplateType from "@/core/types/entity/dayTemplate/DayTemplateType";
// Redux
import { createEntityAdapter } from "@reduxjs/toolkit";

const dayTemplatesAdapter = createEntityAdapter<DayTemplateType>();
export default dayTemplatesAdapter;
