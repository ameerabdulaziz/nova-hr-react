function toArabicDigits(str) {
  if (!str) {
    return '';
  }

  const id = '٠١٢٣٤٥٦٧٨٩';
  return str.toString().replace(/\d/g, (w) => id[+w]);
}

export { toArabicDigits };
