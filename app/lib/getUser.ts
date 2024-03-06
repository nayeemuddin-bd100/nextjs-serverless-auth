import { cookies } from "next/headers";

const getUser = () => {
  let userData;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const result = cookieStore.get("userData")?.value;
  if (result) {
    userData = JSON.parse(result);
  }

  return {
    token,
    userData,
  };
};

export default getUser;
