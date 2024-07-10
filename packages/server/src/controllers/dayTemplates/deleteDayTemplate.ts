// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { DayTemplateClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const deleteDayTemplate = async (req: Request, res: Response) => {
  const { dayTemplateId } = req.params;
  const { userId } = req.params;

  if (!dayTemplateId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a day template id!", dayTemplate: {} });
  }

  const deletedDayTemplate = await DayTemplateClient.delete({
    where: { id: dayTemplateId },
    include: {
      macros: true,
      recipes: true,
      instanceTemplates: true,
      user: true,
    },
  });

  if (!deletedDayTemplate) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not delete day template with id:${dayTemplateId}...`,
      dayTemplate: {},
    });
  }

  await handleCacheMutation(
    "dayTemplates",
    userId as string,
    deletedDayTemplate.id
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted day template with id:${dayTemplateId}.`,
    dayTemplate: deletedDayTemplate,
  });
};

export default deleteDayTemplate;
