const chooseEntityStatPrefix = (essence: "usable" | "component" | "count") => {
  switch (essence) {
    case "usable":
      return "Used in ";
    case "component":
      return "Uses ";
    case "count":
      return "Number of ";
    default:
      return "Used in ";
  }
};

export default chooseEntityStatPrefix;
