// TODO: Should fetch this information from server

const ConfigMapping: any = {
  'donation': [{
    label: 'Minimum value',
    propKey: 'config.minValue',
    isCurrency: true,
  }],
  'guess': [{
    label: 'Ticket Price',
    propKey: 'config.ticketPrice',
    isCurrency: true,
  }, {
    label: 'Number to guess',
    propKey: 'config.numberToGuess',
  }],
  'lottery': [{
    label: 'Ticket Price',
    propKey: 'config.ticketPrice',
    isCurrency: true,
  }],
};

export default ConfigMapping;
