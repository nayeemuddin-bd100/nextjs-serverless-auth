const logoutUser = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "GET",
  });

  return res.json();
};

export default logoutUser;
