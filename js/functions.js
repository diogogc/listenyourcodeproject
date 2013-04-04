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
function createCanvas(divName) {
            
        var div = document.getElementById(divName);
        var canvas = document.createElement('canvas');
        div.appendChild(canvas);
        if (typeof G_vmlCanvasManager != 'undefined') {
            canvas = G_vmlCanvasManager.initElement(canvas);
        }   
        var ctx = canvas.getContext("2d");
        return ctx;
}


function readSingleFile(evt) {
                    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) 
    {
        var r = new FileReader();
        r.onload = function(e) 
        { 
            var contents = e.target.result;
            var countLines = contents.split("\n");
//                            var contCharsOnLine = countLines[1];
            var newData = [];
            var cont = 0;
            for (var i=0; i<(countLines.length); i++)
            {
                for (var z = 0; z < (44100*0.015); z ++)
                {
                    var linha = countLines[i].replace(/\t/g, "   ");
                    newData[cont] = Math.round(128 + 127 * Math.sin((z * 2 * Math.PI * (linha.length+440)) /44100));
                    cont ++;
                }

            }
            
            var wave2 = new RIFFWAVE(newData);
            var audio2 = new Audio(wave2.dataURI);
            audio2.play();

            var ctx = createCanvas("graphDiv1");
        
            var graph = new BarGraph(ctx);
            graph.maxValue = 1000;
            graph.margin = 2;
            graph.colors = ["#49a0d8", "#d353a0", "#ffc527", "#df4c27"];
            graph.xAxisLabelArr = ["North", "East", "West", "South"];

            var count = 0;
            console.log(newData.length);
                updateGraph = function () {
                    
                console.log(count);
                    graph.update([newData[count], newData[count+1], newData[count+2], newData[count+3]]);
                    count++;
                };


            setInterval(updateGraph,0.001);

            // setInterval(function () 
            //             {
            //                 graph.update([Math.random() * 200, Math.random() * 200, Math.random() * 200, Math.random() * 200]);
            //     }, 1000);
 
        }
        r.readAsText(f);
    } 
    else 
    { 
        alert("Failed to load file");
     }   
}

