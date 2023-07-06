export const getGreetingMsg = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr >= 0 && curHr < 6) {
    return "Good Morning!";
  } else if (curHr >= 6 && curHr < 12) {
    return "Good Morning!";
  } else if (curHr >= 12 && curHr < 17) {
    return "Good Afternoon! ";
  } else {
    return "Good Evening!";
  }
};