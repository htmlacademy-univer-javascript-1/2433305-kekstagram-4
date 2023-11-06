const polyndromCheck = (string) => (string.toLowerCase().replaceAll(' ', '') === string.toLowerCase().replaceAll(' ', '').reverse())

const lengthCheck = (string, length) => {return string.length >= length;};

const getWorkOver = (startJob, endJob, currentStart, actualJobTime) => {
  startJobMinutes = Number(startJob.split(':')[0])*60 + Number(startJob.split(':')[1]);
  endJobMinutes = Number(endJob.split(':')[0])*60 + Number(endJob.split(':')[1]);
  currentStartJob = Number(currentStart.split(':')[0]*60) + Number(currentStart.split(':')[1]);
  currentEndJob = currentStartJob + actualJobTime;

  return (endJobMinutes >= currentEndJob && currentEndJob >= startJobMinutes)
}
