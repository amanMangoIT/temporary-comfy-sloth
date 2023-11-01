export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let unique = data.flat().map((item) => item[type]);

  // Flatten the unique array if it is an array of arrays.
  if (Array.isArray(unique)) {
    unique = unique.flat();
  }

  return ["all", ...new Set(unique)];
};
