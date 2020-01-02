const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/83752919a6472cbc6de5cc5c0ad378e0/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const temperature = body.currently.temperature;
      const precipProbability = body.currently.precipProbability;
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain. 
        The temperature high for today is ${body.daily.data[0].temperatureHigh} and the low ${body.daily.data[0].temperatureLow}.`
      );
    }
  });
};

module.exports = forecast;
