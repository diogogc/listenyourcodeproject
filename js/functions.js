/*global Audio, RIFFWAVE, document, FileReader, G_vmlCanvasManager, BarGraph, setInterval, alert */
(function () {
	'use strict';

	var ListenYourCode = {

			count: 0,

			play: function () {
				var data = [],
					wave,
					audio,
					i;

				for (i = 0; i < 10000; i += 1) {
					data.push(Math.round(255 * Math.random())); // fill data with random samples
				}

				wave = new RIFFWAVE(data); // create the wave file
				audio = new Audio(wave.dataURI); // create the HTML5 audio element

				audio.play();
			},

			createCanvas: function (divName) {
				var div = document.getElementById(divName),
					canvas = document.createElement('canvas'),
					ctx;

				div.appendChild(canvas);

				if (typeof G_vmlCanvasManager !== 'undefined') {
					canvas = G_vmlCanvasManager.initElement(canvas);
				}

				ctx = canvas.getContext("2d");
				return ctx;
			},

			readSingleFile: function (evt) {
				//Retrieve the first (and only!) File from the FileList object
				var self = this,
					file = evt.target.files[0],
					reader = new FileReader();

				if (file) {
					reader.onload = function (e) {
						var contents = e.target.result,
							countLines = contents.split("\n"),
							newData = [],
							graph,
							linha,
							wave2,
							audio2,
							count = 0,
							cont = 0,
							ctx,
							i,
							z;

						for (i = 0; i < (countLines.length); i += 1) {
							for (z = 0; z < (44100 * 0.015); z += 1) {
								linha = countLines[i].replace(/\t/g, "    ");
								newData[cont] = Math.round(128 + 127 * Math.sin((z * 2 * Math.PI * (linha.length + 440)) / 44100));
								cont += 1;
							}
						}

						wave2 = new RIFFWAVE(newData);
						audio2 = new Audio(wave2.dataURI);
						audio2.play();

						ctx = this.createCanvas("graphDiv1");

						graph = new BarGraph(ctx);
						graph.maxValue = 1000;
						graph.margin = 2;
						graph.colors = ["#49a0d8", "#d353a0", "#ffc527", "#df4c27"];
						graph.xAxisLabelArr = ["North", "East", "West", "South"];

						setInterval(function () {
							self.updateGraph(newData, graph);
						}, 0.025);
					};

					reader.readAsText(file);
				} else {
					alert("Failed to load file");
				}
			},

			updateGraph: function (data, graph) {
				var count = this.count;
				graph.update([data[count], data[count + 1], data[count + 2], data[count + 3]]);
				this.count += 1;
			}
		};
}());