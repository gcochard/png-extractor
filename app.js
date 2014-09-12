var fs = require('fs')
  , path = require('path')
  , yargs = require('yargs')
  ;
/*jslint stupid:true*/
var data = fs.readFileSync(path.resolve(__dirname,'images.rcc'),{encoding:'binary'});
var start = 0;
var end = 0;
var index = 0;
var name = '';
var chunk;
//png header
var startMatch = ['\x89','P','N','G'].join('');
//png footer
var endMatch = ['I','E','N','D','\xAE','B','`'].join('');
require('buffertools').extend();
while(start !== -1){
    start = data.indexOf(startMatch,start);
    end = data.indexOf(endMatch,start);
    //if we can't find a start OR end, break
    if(start === -1 || end === -1){
        break;
    }
    //grab just that image
    chunk = data.slice(start,end);
    name = index;
    //massage the filename...
    if(index < 100){
        name = '0'+name;
    }
    if(index < 10){
        name = '0'+name;
    }
    console.log('img %d start %d end %d length %d',index,start,end,end-start);
    //write out the image
    fs.writeFileSync(path.resolve(__dirname,'img'+name+'.png'),chunk,{encoding:'binary'});
    index++;
    start = end;
    if(index > 999) { break; }
}
