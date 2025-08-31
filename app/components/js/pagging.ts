const pagging = (data: unknown[], start: string, end: string): unknown[] => {
  const st = parseInt(start);
  const en = parseInt(end);
  const returnData: unknown[] = [];

  for (let i = st; i < data.length && i <= en; i++) {
    returnData.push(data[i]);
  }
  return returnData;
};
export default pagging;
