// Types
import InstanceTemplateType from "@/core/types/entity/instanceTemplate/InstanceTemplateType";
// Redux
import { createEntityAdapter } from "@reduxjs/toolkit";

const instanceTemplatesAdapter = createEntityAdapter<InstanceTemplateType>();
export default instanceTemplatesAdapter;
