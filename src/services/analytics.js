const getAnalyticsData = (startDate, endDate) => {
  return Fliplet.Organizations.Analytics.get({ startDate, endDate });
};

export const calculateDynamic = (currentValue, previousValue = 0) => {
  if (currentValue === previousValue) {
    return 0 + '%';
  }

  if (previousValue === 0) {
    return currentValue;
  }

  if (currentValue > previousValue) {
    return Math.round((( currentValue - previousValue ) / previousValue) * 100) + '%';
  }

  return Math.round((( previousValue - currentValue ) / previousValue) * 100) + '%';
};

export const handleSessions = (startDate, endDate, sessions) => {
  let result = [];

  for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const hasSessions = sessions.some(item => item.day === formattedDate);

    if (!hasSessions) {
      result.push({ day: formattedDate, count: 0 });
    }
  }

  return orderSessions([...result, ...sessions]);
};

const orderSessions = sessions => {
  return sessions.sort((a, b) => {
    const dateA = new Date(a.day);
    const dateB = new Date(b.day);

    return dateA - dateB;
  });
};

export default getAnalyticsData;
