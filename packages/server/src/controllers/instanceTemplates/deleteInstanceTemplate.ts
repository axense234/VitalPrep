// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { InstanceTemplateClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const deleteInstanceTemplate = async (req: Request, res: Response) => {
  const { instanceTemplateId, userId } = req.params;

  if (!instanceTemplateId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter an instance template id!",
      instanceTemplate: {},
    });
  }

  const deletedInstanceTemplate = await InstanceTemplateClient.delete({
    where: { id: instanceTemplateId },
    include: {
      macros: true,
      dayTemplates: true,
      mealPrepPlans: true,
      mealPrepLogs: true,
      user: true,
    },
  });

  if (!deletedInstanceTemplate) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not delete instance template with id:${instanceTemplateId}...`,
      instanceTemplate: {},
    });
  }

  await handleCacheMutation(
    "instanceTemplates",
    userId as string,
    deletedInstanceTemplate.id
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully deleted instance template with id:${instanceTemplateId}.`,
    instanceTemplate: deletedInstanceTemplate,
  });
};

export default deleteInstanceTemplate;
