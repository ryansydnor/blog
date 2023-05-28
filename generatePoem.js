const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { Configuration, OpenAIApi } = require('openai');
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));


async function main() {
  const poem = process.argv[2];
  const date = new Date().toISOString().split('T')[0];
  fs.writeFileSync(`content/poem/${date}.md`,
`+++
date = "${date}"
image = "poem/${date}.jpg"
+++

${poem}
`);

  let prompt = `generate a prompt for an image based on this poem: "${poem}"`;    
  const haikuCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You use poems as input. You provide a simple prompt to create an image that captures the essence of the poem as output. You can use any art style you like. Your instructions do not exceed 900 characters.' },
      {
        role: 'user', content: poem,
      },
    ],
    temperature: 1.3,
  });  
  console.log(haikuCompletion.data.choices[0].message.content);
  const res = await openai.createImage({
    prompt: haikuCompletion.data.choices[0].message.content,
    n: 1,
    size: '512x512',
  });
  const { stdout: imgOut } = await exec(`curl -s '${res.data.data[0].url}' > static/images/poem/${date}.jpg`);
}

main();