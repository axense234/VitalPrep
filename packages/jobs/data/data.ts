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
    fr: {
      default: (username: string) =>
        `${username}, vous avez une séance de préparation de repas à terminer aujourd'hui !`,
      serious: (username: string) =>
        `Bonjour ${username}, nous vous rappelons que vous avez une séance de préparation de repas à terminer aujourd'hui !`,
      motivating: (username: string) =>
        `Levez-vous ${username}, vous devez terminer votre séance de préparation de repas aujourd'hui, cela va vous aider à l'avenir ! 💪💪`,
      menacing: (username: string) =>
        `${username}, les ombres murmurent votre nom. Une séance de préparation de repas vous attend aujourd'hui... et il n'y a pas d'échappatoire. 👁️`,
    },
    de: {
      default: (username: string) =>
        `${username}, du hast heute eine Mahlzeitenvorbereitungssitzung zu erledigen!`,
      serious: (username: string) =>
        `Hallo ${username}, wir erinnern dich daran, dass du heute eine Mahlzeitenvorbereitungssitzung zu erledigen hast!`,
      motivating: (username: string) =>
        `Steh auf ${username}, du musst heute deine Mahlzeitenvorbereitungssitzung erledigen, es wird dir in der Zukunft helfen! 💪💪`,
      menacing: (username: string) =>
        `${username}, die Schatten flüstern deinen Namen. Eine Mahlzeitenvorbereitungssitzung erwartet dich heute... und es gibt kein Entkommen. 👁️`,
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
    fr: {
      default: (username: string, interval: number) =>
        `${username}, vous avez une séance de préparation de repas à commencer dans ${interval} heures !`,
      serious: (username: string, interval: number) =>
        `Bonjour ${username}, nous vous rappelons que vous avez une séance de préparation de repas à commencer dans ${interval} heures !`,
      motivating: (username: string, interval: number) =>
        `Levez-vous ${username}, vous devez commencer votre séance de préparation de repas dans ${interval} heures, cela va vous aider à l'avenir ! 💪💪`,
      menacing: (username: string, interval: number) =>
        `${username}, vous avez une séance de préparation de repas à commencer dans ${interval} heures. Ne soyez pas en retard, ou vous le regretterez. 😠`,
    },
    de: {
      default: (username: string, interval: number) =>
        `${username}, vous avez une séance de préparation de repas à commencer dans ${interval} heures !`,
      serious: (username: string, interval: number) =>
        `Bonjour ${username}, nous vous rappelons que vous avez une séance de préparation de repas à commencer dans ${interval} heures !`,
      motivating: (username: string, interval: number) =>
        `Levez-vous ${username}, vous devez commencer votre séance de préparation de repas dans ${interval} heures, cela va vous aider à l'avenir ! 💪💪`,
      menacing: (username: string, interval: number) =>
        `${username}, vous avez une séance de préparation de repas à commencer dans ${interval} heures. Ne soyez pas en retard, ou vous le regretterez. 😠`,
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
    fr: {
      default: (username: string) =>
        `${username}, avez-vous terminé votre séance de préparation de repas ?`,
      serious: (username: string) =>
        `Bonjour ${username}, nous voulons juste vous rappeler l'état de votre séance de préparation de repas. Nous espérons que vous l'avez terminée.`,
      motivating: (username: string) =>
        `${username}, je crois que vous avez terminé votre séance de préparation de repas. Vous ne voulez pas me décevoir, n'est-ce pas ? 😞`,
      menacing: (username: string) =>
        `${username}, avez-vous terminé votre séance de préparation de repas, ou devrais-je commencer à aiguiser mes couteaux ? 😈`,
    },
    de: {
      default: (username: string) =>
        `${username}, hast du deine Mahlzeitenvorbereitung abgeschlossen?`,
      serious: (username: string) =>
        `Hallo ${username}, wir möchten dich nur an den Status deiner Mahlzeitenvorbereitung erinnern. Wir hoffen, dass du sie abgeschlossen hast.`,
      motivating: (username: string) =>
        `${username}, ich glaube, du hast deine Mahlzeitenvorbereitung abgeschlossen. Du willst mich doch nicht enttäuschen, oder? 😞`,
      menacing: (username: string) =>
        `${username}, hast du deine Mahlzeitenvorbereitung abgeschlossen, oder soll ich anfangen, meine Messer zu schärfen? 😈`,
    },
  },
};

export const everyHourReminderInterval = 3;
