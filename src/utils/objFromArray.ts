// ----------------------------------------------------------------------

export default function objFromArray(array: any[], key = 'id') {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}
