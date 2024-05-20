export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const defaultNotificationImageUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1716209021/VitalPrep/brandmark-design-256x256_zdzu6z.png";

export const notificationMessages = {
  dayReminder: {
    en: {
      default: (username: string) =>
        `${username}, you have a Meal Prep Session to complete today!`,
      serious: (username: string) =>
        `Hello ${username}, we are reminding you that you have a Meal Prep Session to complete today!`,
      motivating: (username: string) =>
        `Get up ${username}, you must complete your Meal Prep Session today, it's going to help you in the future! 💪💪`,
      menacing: (username: string) =>
        `${username}, the shadows whisper your name. A Meal Prep Session awaits you today... and there's no escape. 👁️`,
    },
    ro: {
      default: (username: string) =>
        `${username}, ai o sesiune de Meal Prep de completat azi!`,
      serious: (username: string) =>
        `Bună ziua ${username}, va reamintim că aveți o sesiune de pregătire a meselor în avans astăzi.`,
      motivating: (username: string) =>
        `Sculați-vă ${username}, trebuie să vă finalizați sesiunea de pregătire a meselor în avans astăzi, vă va ajuta pe viitor! 💪💪`,
      menacing: (username: string) =>
        `${username}, umbrele îți șoptesc numele. O sesiune de pregătire a meselor în avans te așteaptă astăzi... și nu există scăpare. 👁️`,
    },
  },
  preSessionReminder: {
    en: {
      default: (username: string, interval: number) =>
        `${username}, you have a Meal Prep Session to start in ${interval} hours!`,
      serious: (username: string, interval: number) =>
        `Hello ${username}, we are reminding you that you have a Meal Prep Session to start in ${interval} hours!`,
      motivating: (username: string, interval: number) =>
        `Get up ${username}, you must start your Meal Prep Session in ${interval} hours , it's going to help you in the future! 💪💪`,
      menacing: (username: string, interval: number) =>
        `${username}, you have a Meal Prep Session to start in ${interval} hours. Don't be late, or you'll regret it. 😠`,
    },
    ro: {
      default: (username: string, interval: number) =>
        `${username}, ai o sesiune de Meal Prep de început în ${interval} ore!`,
      serious: (username: string, interval: number) =>
        `Bună ziua ${username}, va reamintim că aveți o sesiune de pregătire a meselor în avans în ${interval} ore.`,
      motivating: (username: string, interval: number) =>
        `Sculați-vă ${username}, trebuie să vă începeți sesiunea de pregătire a meselor în avans în ${interval} ore, vă va ajuta pe viitor! 💪💪`,
      menacing: (username: string, interval: number) =>
        `${username}, ai o sesiune de pregătire a meselor în avans care începe în ${interval} ore. Nu întârzia, sau vei regreta. 😠`,
    },
  },
  postSessionReminder: {
    en: {
      default: (username: string) =>
        `${username}, did you complete your Meal Prep Session?`,
      serious: (username: string) =>
        `Hello ${username}, we just want to remind you of your Meal Prep Session Status. We hope you have completed it.`,
      motivating: (username: string) =>
        `${username}, i believe you have completed your Meal Prep Session. You do not want to disappoint me, right? 😞`,
      menacing: (username: string) =>
        `${username}, did you complete your Meal Prep Session, or should I start sharpening my knives? 😈`,
    },
    ro: {
      default: (username: string) =>
        `${username}, ți-ai completat sesiunea de Meal Prep?`,
      serious: (username: string) =>
        `Bună ziua ${username}, vrem doar să vă reamintim de starea sesiunii dvs. de pregătire a meselor în avans. Sperăm că v-ați completat sesiunea respectiva.`,
      motivating: (username: string) =>
        `${username}, cred că ai terminat sesiunea ta de pregătire a meselor în avans. Nu vrei să mă dezamăgești, nu-i așa? 😞`,
      menacing: (username: string) =>
        `${username}, ți-ai terminat sesiunea de pregătire a meselor în avans, sau ar trebui să încep să-mi ascuț cuțitele? 😈`,
    },
  },
};

export const everyHourReminderInterval = 3;
