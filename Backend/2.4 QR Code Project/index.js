/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import * as qr from 'qr-image';
import * as fs from 'node:fs';

inquirer
  .prompt([
    {
        type: 'input',   // Input type question for free-text answers
        name: 'url',    // Key to store the answer in the answers object
        message: "Which url do you want to convert?",  // Question to ask the user
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    fs.writeFile('URL.txt', answers.url, function(err){
        if(err) throw err;
        console.log(`${answers.url} saved to file`);
    });
    var qr_png = qr.image(answers.url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('qr_img.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });