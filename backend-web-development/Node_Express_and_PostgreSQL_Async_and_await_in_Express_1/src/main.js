const {
  generateMessage,
  goodbye,
  generateSlogan,
} = require("../utils/slogan-generator");

async function getSlogan(request) {
  try {
    const response = await generateSlogan(request);
    console.log(`Your request was: ${request}`);
    console.log(`Your slogan is: ${response.slogan}`);
  } catch (error) {
    console.log(error.message);
  }
}

async function fullSession(request) {
  try {
    const welcomeMessage  = await generateMessage();
    console.log(welcomeMessage);
    await getSlogan(request);
    const goodByeMessage =  await goodbye();
    console.log(goodByeMessage);
  } catch (error) {
    console.log(error.message);
  }

}

module.exports = { getSlogan, fullSession };
