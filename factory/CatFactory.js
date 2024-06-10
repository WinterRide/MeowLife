export const createCat = async ({
  species,
  breed,
  age,
  userInfo,
  price,
  description,
  level,
  photos,
  vaccine,
  status = "In Review",
}) => {
  if (isNaN(Number(age))) {
    throw new Error("Age should be a number");
  }

  if (isNaN(Number(price))) {
    throw new Error("Price should be a number");
  }

  return {
    species,
    breed,
    age: Number(age),
    owner: userInfo.nickname,
    ownerEmail: userInfo.email,
    price: Number(price),
    description,
    level,
    photos,
    vaccine,
    status,
    type: "cat",
  };
};
