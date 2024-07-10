// Express
import { Response, Request } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { DayTemplateClient } from "../../db/postgres";
// Utils
import { handleCacheMutation } from "../../utils/redis";

const updateDayTemplate = async (req: Request, res: Response) => {
  const { dayTemplateId } = req.params;
  const dayTemplateBody = req.body;
  const { userId, updateDayTemplateSingle } = req.query;

  if (!dayTemplateId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a day template id!", dayTemplate: {} });
  }

  if (!dayTemplateBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a request body!", dayTemplate: {} });
  }

  if (dayTemplateBody.user || userId) {
    dayTemplateBody.user = {
      connect: { id: dayTemplateBody?.user?.id || userId },
    };
    delete dayTemplateBody?.userId;
  }

  if (dayTemplateBody.macros) {
    dayTemplateBody.macros = { update: dayTemplateBody.macros };
    delete dayTemplateBody?.macrosId;
  }

  if (updateDayTemplateSingle) {
    delete dayTemplateBody?.ingredients;
    delete dayTemplateBody?.utensils;
    delete dayTemplateBody?.instanceTemplates;
    delete dayTemplateBody?.mealPrepPlans;
    delete dayTemplateBody?.mealPrepLogs;
  }

  const recipes = dayTemplateBody.recipes as string[];

  const updatedDayTemplate = await DayTemplateClient.update({
    where: { id: dayTemplateId },
    data: {
      ...dayTemplateBody,
      recipes: {
        connect: recipes.map((recipe) => ({ id: recipe })),
      },
    },
    include: {
      macros: true,
      recipes: true,
      instanceTemplates: true,
      user: true,
    },
  });

  if (!updatedDayTemplate) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Could not update day template with id:${dayTemplateId}...`,
      dayTemplate: {},
    });
  }

  await handleCacheMutation(
    "dayTemplates",
    userId as string,
    updatedDayTemplate.id
  );

  return res.status(StatusCodes.OK).json({
    message: `Successfully updated day template with id:${dayTemplateId}.`,
    dayTemplate: updatedDayTemplate,
  });
};

export default updateDayTemplate;
