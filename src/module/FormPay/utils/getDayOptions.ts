const getDayOptions = (year: number, month: number) => {
  return [...Array(33 - new Date(year, month-1, 33).getDate())].map((_, index)=>({
    value: index+1, label: index+1
  }));
}

export default getDayOptions