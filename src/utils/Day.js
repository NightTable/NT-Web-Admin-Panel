import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const CurrentDate = dayjs().format('YYYY-MM-DD');
const currentDateinISO5601 = dayjs().format('YYYY-MM-DDTHH:MM');
export const getCurrentDate = ( ) =>CurrentDate;

export const AddMonthIntoCurrentDate = (months) =>dayjs().add(months,'month');


export const convertToTimeStamp = async (CurrentDate) => 
   dayjs(CurrentDate).unix() //
;

export const timeStampToDate = async (Date) => {
  const parsingDate = parseInt(Date);
  return dayjs.unix(parsingDate).format('YYYY-MM-DD');
};

export const SameDayCheck = async (date) => dayjs().isSame(date, 'days');