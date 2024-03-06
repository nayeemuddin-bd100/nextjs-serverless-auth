interface IParams {
  name: string;
  email: string;
  password: string;
}
const registerUser = async ({ name, email, password }: IParams) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  return data;
};

export default registerUser;
