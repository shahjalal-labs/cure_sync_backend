//

const pick = <T ext, K>(obj: Record<string, unknown>, keys: string[]) => {
  const finalObj: any = {};
  for (const key of keys) {
    if (Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};
