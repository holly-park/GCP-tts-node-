const textToSppech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const client = new textToSppech.TextToSpeechClient();
console.log('client', client.synthesizeSpeech)
async function quickStart(){
    const text = 'hello, world!';
    const request = {
        input: {text: text},
        voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
        audioConfig: {audioEncoding: 'MP3'},
    };

    const [response] = await client.synthesizeSpeech(request);
    console.log('response', response)
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
}

quickStart()