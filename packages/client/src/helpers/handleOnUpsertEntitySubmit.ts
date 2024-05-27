const handleOnUpsertEntitySubmit = (
  e: React.SyntheticEvent,
  interfaceType: "create" | "update",
  createEntityFunction: any,
  updateEntityFunction: any
) => {
  e.preventDefault();
  if (interfaceType === "create") {
    createEntityFunction();
  } else if (interfaceType === "update") {
    updateEntityFunction();
  }
};

export default handleOnUpsertEntitySubmit;
