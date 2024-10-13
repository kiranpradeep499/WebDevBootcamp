const fs = require('node:fs');
// fs.writeFile('./message2.txt', "Hi from Kiran", (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   });

fs.readFile('./message.txt', 'utf-8', function(err, data){
if (err) throw err;
console.log(data);
});