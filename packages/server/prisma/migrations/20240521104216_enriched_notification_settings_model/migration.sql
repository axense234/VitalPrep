-- AlterTable
ALTER TABLE "NotificationSettings" ADD COLUMN     "allowAutomaticCreationOfLogs" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowDayReminderNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowPostSessionReminderNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowPreSessionReminderNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "reminderIntervalInHours" INTEGER NOT NULL DEFAULT 3,
ALTER COLUMN "notificationStyle" SET DEFAULT 'default';
