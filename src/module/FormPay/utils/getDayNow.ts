const getDayNow = (): Date => {
  const dayWithTime = new Date() 
  const day = new Date( dayWithTime.getFullYear(), dayWithTime.getMonth(), dayWithTime.getDate())
  return day
}

export default getDayNow