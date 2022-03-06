const { exec } = require("child_process");
const { readdirSync } = require('fs')
const fs = require('fs');
const { slice } = require("lodash");
const _ = require('lodash');

var json = JSON.parse(fs.readFileSync('sounds.json', 'utf8'));

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
	

const getFiles = source => 
  readdirSync(source, { withFileTypes: true })
  .filter(dirent => !dirent.isDirectory())
  .map(dirent => dirent.name)


let arr = getDirectories('.')


function find(obj, item) {
  for(var key in obj) {
      if(obj[key] && typeof obj[key] === "object") {
          var result = find(obj[key], item);
          if(result) {
              result.unshift(key);
              return result;
          }
      } else if(obj[key] === item) {
          return [key];
      }
  }
}

function findFormatted(obj, item) {
  var path = find(obj, item);
  if(path == null) {
      return "";
  }
  return 'json["' + path.join('"]["') + '"]';
}
// console.log("find(myObj, \"needle\"):          " + JSON.stringify(find(json, "/01_areas/0x1C528EF2")));
//console.log("findFormatted(myObj, \"needle\"): " + findFormatted(json, "/01_areas/0x1C528EF2"));
 

for (let i = 0; i < arr.length; i++) {

  //console.log(getFiles(arr[i]))
 // exec("cd .")
 let filenames = getFiles(arr[i])

 for (let j = 0; j < filenames.length; j++) {

  let path = arr[i] + '/' + filenames[j]
  let filestring = filenames[j].slice(0, -4)
  let pathstring = '/' + arr[i] + '/' + filestring
  let time = ''
  let pathtojson = find(json, pathstring)
  let finalpath
  //console.log(pathtojson)
  //console.log(filenames[j])
  if (pathtojson != null ) {
    exec("ffprobe -i " + path + ' -show_entries format=duration  -v quiet -of csv="p=0"', (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      //console.log(`stdout: ${stdout}`);
      time = stdout.slice(0,-2) * 1000
      console.log(pathtojson[2])
      if (pathtojson[2] != null){

        json[pathtojson[0]][pathtojson[1]][pathtojson[2]] = {
        'file' : pathstring,
        'time' : time
      }
      } else 
      {
        //console.log(finalpath)
        json[pathtojson[0]][pathtojson[1]] = {
          'file' : pathstring,
          'time' : time
        }
        //console.log(finalpath)
        
      }
   
             
//console.log(json)
let output = JSON.stringify(json)
fs.writeFileSync('./output.json', output);
     
    })
  }
}
  

}


//console.log(output)
