export const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export const removeHyphen = (name) => {
  return name.replace(/-/g, " ");
}