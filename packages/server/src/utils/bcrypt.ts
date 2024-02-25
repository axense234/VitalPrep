import bcrypt from "bcryptjs";

const encryptPassword = async (pass: string) => {
  const salt = await bcrypt.genSalt(14);
  const encryptedPassword = await bcrypt.hash(pass, salt);
  return encryptedPassword;
};

const comparePasswords = async (pass: string, epass: string) => {
  const match = await bcrypt.compare(pass, epass);
  return match;
};

export { encryptPassword, comparePasswords };
