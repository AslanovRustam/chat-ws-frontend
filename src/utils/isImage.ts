export const isImage = (fileUrl: string): boolean => {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".bmp",
    ".svg",
  ];
  return imageExtensions.some((ext) => fileUrl.toLowerCase().endsWith(ext));
};
