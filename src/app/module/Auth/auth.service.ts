type ILoginPayload = {
  email: string;
  password: string;
const loginUserIntoDB = async (payload: ILoginPayload) => {
  console.log(`logging in user`);
};

export const AuthService = {
  loginUserIntoDB,
};
