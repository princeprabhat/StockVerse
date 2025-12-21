import bcrypt from "bcrypt";
const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (
  dbPassword: string,
  givenPassword: string
): Promise<boolean> => {
  const verifyPassword = await bcrypt.compare(givenPassword, dbPassword);
  return verifyPassword;
};

export { hashPassword, comparePassword };
