const { Translate } = require('googletrans');

async function translateMessage(message, targetLanguage) {
  try {
    const translator = new Translate();

    // Detect language
    const detectionResult = await translator.detect(message);
    const detectedLanguage = detectionResult.language;
    let translatedMessage = '';

    if (detectedLanguage !== targetLanguage) {
      // Translate message to the target language
      const translationResult = await translator.translate(message, {
        from: detectedLanguage,
        to: targetLanguage,
      });
      translatedMessage = translationResult.text;
    } else {
      translatedMessage = message;
    }

    return {
      detectedLanguage,
      translatedMessage,
    };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

module.exports = translateMessage;
