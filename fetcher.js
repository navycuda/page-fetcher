/******

Launch
  $ node fetcher.js `url` `filePath`

  if (filePath.isNotValid)
    console.log()
    exit()

  if  (exists(filePath))
    > Overwrite File?
      no, exit()
      yes, continue

  if (url.isValid)
    download body
      save body
        console.log()
        exit()

  console.log
  exit()
  


******/



/* CLI arguments */
const args = process.argv.slice(2);
const url = args[0];
const savePath = args[1];
/* Required */
const request = require('request');
const fs = require(`fs`);
let readline = require(`readline`);
let rl = readline.createInterface(process.stdin,process.stdout);

/* Functions */
// used to exit the app and output the error
const exit = (sender, error) => {
  console.log(sender, error);
  rl.close();
};
// saves the body to a file
const saveBody = (body) => {
  // Save the file
  fs.writeFile(savePath, body, error => {
    if (error) exit(`writeFile()`, error);
  });
  // Get the file size
  const fileSize = fs.statSync(savePath).size;

  exit(`Downloaded and saved ${fileSize} bytes to ${savePath}`);
};

// Request the body from the url
const getBody = () => {
  request(url, (error, response, body) => {
    if (error) exit(`request()`, error);
    saveBody(body);
  });
};
  // Check to see file exists
fs.access(savePath, fs.constants.F_OK, (error) => {
  // If the file exists, check with user to see if it should be overwritten
  if (!error) {
    rl.question(`File Exists, would you like to overright? type yes `, (answer) => {
      if (answer !== 'yes') {
        exit(`user exited`, ` *exists`);
      }
    });
  }
  getBody();
});