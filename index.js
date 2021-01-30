const fs = require('fs');

const filenames = fs.readdirSync('./data');
let prevFileName = '';
let str = '';
let count = 0;
filenames.forEach(function (filename) {
  const content = fs.readFileSync('./data/' + filename, 'utf-8');
  console.log(filename);
  // console.log(filename);
  let dat = JSON.parse(content);
  dat.forEach((obj) => {
    const d = new Date(obj.dateTime);
    let time = (d.getTime() - 21600000) * 1000000;
    let bpm = obj.value.bpm;

    str = `${str}heart_rate,device=fitbit pulse_bpm=${bpm} ${time}\n`;
    prevFileName = `${filename.substr(11, 6)}-${Math.floor(count / 350000)}`;
    count++;
  });
  console.log(
    `${filename.substr(11, 6)}-${Math.floor(
      count / 350000
    )}    ${prevFileName}, ${count}`
  );
  fs.writeFileSync(
    `${filename.substr(11, 6)}-${Math.floor(count / 350000)}.txt`,
    str,
    {
      encoding: 'utf8',
      flag: 'a+',
      mode: 0o666,
    },
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
  str = '';
});
// readFiles(
//   'data/',
//   function (filename, content) {

//   },
//   function (err) {
//     throw err;
//   }
// );
