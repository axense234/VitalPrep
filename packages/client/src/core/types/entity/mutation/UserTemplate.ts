import { User } from "@prisma/client";

type OptionalUser<T> = {
  [K in keyof T]?: T[K];
};

type UserTemplate = OptionalUser<User>;

export default UserTemplate;
