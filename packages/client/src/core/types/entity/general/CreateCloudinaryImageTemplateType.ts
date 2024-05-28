import EntitiesType from "../EntitiesType";

type CreateCloudinaryImageTemplateType = {
  imageFile: File;
  entity: EntitiesType | "users";
  type?: "general" | "notifications";
};

export default CreateCloudinaryImageTemplateType;
