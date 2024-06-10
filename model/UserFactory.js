export const createUser = ({ email, nickname, name }) => {
  return {
    email,
    nickname,
    name,
    address: "",
    onOrder: false,
    role: "Customer",
    orders: [],
  };
};
