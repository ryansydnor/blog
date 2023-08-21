const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { Configuration, OpenAIApi } = require('openai');
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));
const readline = require('readline');


async function main() {
  const poem = process.argv[2];
  const date = process.argv[3] || new Date().toISOString().split('T')[0];
  fs.writeFileSync(`content/poem/${date}.md`,
`+++
date = "${date}"
image = "poem/${date}.jpg"
+++

${poem.split('\n').join('\n\n')}
`);

  let prompt = `generate a prompt for an image based on this poem: "${poem}"`;    
  const haikuCompletion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You use poems as input. You provide a concise, short, simple prompt to create an image in an art style of your choosing to captures the essence of the poem as output.' },
      {
        role: 'user', content: poem,
      },
    ],
    temperature: 1.25,
  });  
  console.log(haikuCompletion.data.choices[0].message.content);
  const res = await openai.createImage({
    prompt: haikuCompletion.data.choices[0].message.content,
    n: 4,
    size: '512x512',
  });

  await exec(`curl -s '${res.data.data[0].url}' > /tmp/1.jpg`);
  await exec(`curl -s '${res.data.data[1].url}' > /tmp/2.jpg`);
  await exec(`curl -s '${res.data.data[2].url}' > /tmp/3.jpg`);
  await exec(`curl -s '${res.data.data[3].url}' > /tmp/4.jpg`);
  await exec(`open /tmp/1.jpg /tmp/2.jpg /tmp/3.jpg /tmp/4.jpg`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const answer = await new Promise(resolve => {
    rl.question("Which image do you want to use [1-4]? ", resolve)
  });

  await exec(`mv /tmp/${answer}.jpg static/images/poem/${date}.jpg`);
  process.exit(0);
}

main();