export const getGreetingMsg = () => {
  const today = new Date();
  const curHr = today.getHours();

  if (curHr >= 0 && curHr < 6) {
    return 'Good Morning!';
  } if (curHr >= 6 && curHr < 12) {
    return 'Good Morning!';
  } if (curHr >= 12 && curHr < 17) {
    return 'Good Afternoon! ';
  } 
    return 'Good Evening!';
  
};