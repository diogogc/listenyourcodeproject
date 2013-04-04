/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function play()
{
    var data = []; // just an array
    for (var i=0; i<10000; i++)
    { 
        data[i] = Math.round(255 * Math.random()); // fill data with random samples
    }
    var wave = new RIFFWAVE(data); // create the wave file
    var audio = new Audio(wave.dataURI); // create the HTML5 audio element
    audio.play();
}
function readSingleFile(evt) {
                    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
        var r = new FileReader();
        r.onload = function(e) { 
                            var contents = e.target.result;
                            var countLines = contents.split("\n");
//                            var contCharsOnLine = countLines[1];
                            var newData = [];
                            var cont = 0;
                            for (var i=0; i<(countLines.length); i++)
                            {
                                for (var z = 0; z < (44100/12); z ++)
                                {
                                    newData[cont] = Math.round(128 + 127 * Math.sin((z * 2 * Math.PI * (countLines[i].length+440)) /44100));
                                    cont ++;
                                }
    
                            }
                            
//                            var contCharsOnLine = countLines[1];

                            // var sine = [];
                            // for (var i=0; i<countLines.length; i++)
                            // { 
                            //     sine[i] = 128+Math.round(127*Math.sin(countLines[i]/countLines.length));
                            // }
                            var wave2 = new RIFFWAVE(newData);
                            var audio2 = new Audio(wave2.dataURI);
                            audio2.play();
//                        alert( "Got the file.\n" 
//                            +" name: " + f.name + "\n"
//                            +" type: " + f.type + "\n"
//                            +" size: " + f.size + " bytes\n"
//                            + " starts with: " + contents.substr(1, contents.indexOf("\n"))+"\n"
//                            + " number : "+cont.length+"\n"
//                            +" count line: "+countLine.length
//                        );  
                    }
                    r.readAsText(f);
                    } else { 
                    alert("Failed to load file");
                    }   
}

