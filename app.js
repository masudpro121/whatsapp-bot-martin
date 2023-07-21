const { Client, LocalAuth, MessageMedia, Chat } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const generateAvatarVoice = require("./utils/generateAvatarVoice");
const generateChat = require("./utils/generateChat");
const fs = require('fs')
const path = require('path')
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
}
});



client.on('authenticated', (session) => {    
 console.log(session);
});

client.on('qr', (qr) => {
  qrcode.generate(qr, {small: true});
});

client.on('message', async message => {
  const chatResult = await generateChat(message.body) 
 console.log(chatResult, 'chat');
  generateAvatarVoice(chatResult)
  .then(async result=>{
    fs.writeFileSync('video2.mp4', result, 'binary')
    const media = await MessageMedia.fromFilePath(path.join(__dirname,'video2.mp4'))
    await message.reply(media)
  })
  .catch(err=>{
    console.log(err);
  })
  // const avatarVoice = await generateAvatarVoice()
  // const media = await MessageMedia.fromUrl('https://i.ibb.co/k3jG4hV/demo-avatar.png')
  // message.reply(chatResult)
});
 
client.on('ready', () => {
    console.log('ready')
});

client.initialize();

