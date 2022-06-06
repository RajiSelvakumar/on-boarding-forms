let xhtmlRequest = new XMLHttpRequest();
xhtmlRequest.open("POST","./php/model_profile.php");
xhtmlRequest.send();
xhtmlRequest.onreadystatechange = function() {
   if(xhtmlRequest.readyState === 4 && xhtmlRequest.status === 200){
      myObj = JSON.parse(xhtmlRequest.responseText);
   }
}
function onDownload() {
   function download(content, fileName, contentType) {
      const a = document.createElement("a");
      const file = new Blob([content], {
         type: contentType
      });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
   }
   download(JSON.stringify(myObj, undefined, 5), "json.json", "text/plain");
}