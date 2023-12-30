const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const readline = require('readline');


async function main() {
  const poem = process.argv[2];
  const date = process.argv[3] || new Date().toISOString().split('T')[0];
  console.log(poem, poem.split('\n').join('\n\n'))
  fs.writeFileSync(`content/poem/${date}.md`,
`+++
date = "${date}"
image = "poem/${date}.jpg"
+++

${poem.split('\n').join('\n\n')}
`);

  let answer = null;
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });  

  while (answer !== 'Y' && answer !== 'y') {
    let prompt = `generate a prompt for an image based on this poem: "${poem}"`;    
    const haikuCompletion = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [
        { role: 'system', content: 'You use poems as input. You provide a concise, short, simple prompt to create an image in an art style of your choosing to captures the essence of the poem as output.' },
        {
          role: 'user', content: poem,
        },
      ],
      temperature: 1.25,
    });  
    console.log(haikuCompletion.choices[0].message.content);
    const res = await openai.images.generate({
      model: 'dall-e-3',
      prompt: haikuCompletion.choices[0].message.content,
      n: 1,
      size: '1024x1024',
      response_format: 'url',
    })
    await exec(`curl -s '${res.data[0].url}' > /tmp/1.jpg`);
    // await exec(`curl -s '${res.data.data[1].url}' > /tmp/2.jpg`);
    // await exec(`curl -s '${res.data.data[2].url}' > /tmp/3.jpg`);
    // await exec(`curl -s '${res.data.data[3].url}' > /tmp/4.jpg`);
    await exec(`open /tmp/1.jpg`);

    answer = await new Promise(resolve => {
      rl.question("do you want to use this image? [Y/N]", resolve)
    });
    console.log(answer)
  }

  await exec(`mv /tmp/1.jpg static/images/poem/${date}.jpg`);
  process.exit(0);
}

main();