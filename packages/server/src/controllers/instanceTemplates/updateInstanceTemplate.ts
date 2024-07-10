// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { InstanceTemplateClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const updateInstanceTemplate = async (req: Request, res: Response) => {
  const { instanceTemplateId } = req.params;
  const instanceTemplateBody = req.body;
  const { userId, updateInstanceTemplateSingle } = req.query;

  if (!instanceTemplateId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter an instance template id!",
      instanceTemplate: {},
    });
  }

  if (!instanceTemplateBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", instanceTemplate: {} });
  }

  if (instanceTemplateBody.user || userId) {
    instanceTemplateBody.user = {
      connect: { id: instanceTemplateBody?.user?.id || userId },
    };
    delete instanceTemplateBody?.userId;
  }

  if (instanceTemplateBody.macros) {
    instanceTemplateBody.macros = { update: instanceTemplateBody.macros };
    delete instanceTemplateBody?.macrosId;
  }

  if (updateInstanceTemplateSingle) {
    delete instanceTemplateBody?.ingredients;
    delete instanceTemplateBody?.utensils;
    delete instanceTemplateBody?.recipes;
    delete instanceTemplateBody?.mealPrepPlans;
    delete instanceTemplateBody?.mealPrepLogs;
  }

  const dayTemplates = instanceTemplateBody.dayTemplates as string[];

  const updatedInstanceTemplate = await InstanceTemplateClient.update({
    where: { id: instanceTemplateId },
    data: {
      ...instanceTemplateBody,
      dayTemplates: {
        connect: dayTemplates.map((dayTemplate) => ({ id: dayTemplate })),
      },
    },
    include: {
      macros: true,
      dayTemplates: true,
      mealPrepPlans: true,
      mealPrepLogs: true,
      user: true,
    },
  });

  if (!updatedInstanceTemplate) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not update instance template with id:${instanceTemplateId}...`,
      instanceTemplate: {},
    });
  }

  await handleCacheMutation(
    "instanceTemplates",
    userId as string,
    updatedInstanceTemplate.id
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated instance template with id:${instanceTemplateId}.`,
    instanceTemplate: updatedInstanceTemplate,
  });
};

export default updateInstanceTemplate;
