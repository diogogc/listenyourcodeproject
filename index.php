<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="js/html5-canvas-bar-graph.js"></script>
        <script type="text/javascript" src="js/riffwave.js"></script>
        <script type="text/javascript" src="js/functions.js"></script>
    </head>
    <body>
        <div>        
            <input type="file" id="fileinput" />
            <script type="text/javascript">
                document.getElementById('fileinput').addEventListener('change', ListenYourCode.readSingleFile, false);
            </script>
        </div>
        <div id="graphDiv1"></div>
    </body>
</html>