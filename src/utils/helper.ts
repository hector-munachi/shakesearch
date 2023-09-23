export const slugify = (url: string) => {
  return url?.toLowerCase().split(" ").join("_");
};
