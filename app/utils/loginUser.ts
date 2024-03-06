interface IParams {
  email: string;
  password: string;
}
const loginUser = async ({ email, password }: IParams) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return data;
};

export default loginUser;
