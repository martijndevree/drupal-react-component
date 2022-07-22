const formatMoney = (amount = 0): string => {
  const options = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  };

  const formatter = new Intl.NumberFormat('nl-NL', options);

  let formattedAmount = formatter.format(amount / 100);

  if (formattedAmount.endsWith('00')) {
    formattedAmount = formattedAmount.replace(/00$/, '–');
  }

  // Divide by 100 because prices are in cents.
  return formattedAmount;
};

export default formatMoney;
