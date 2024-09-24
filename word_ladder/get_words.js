function generateLadder(start, end){

}

function getWords(filename){
    var hash = new Object();

    fetch(filename)
    .then((response) => response.text())
    .then(data => {
      const words = data.split('\n');
      console.log(words)
    }) 
}

document.onload = getWords('words05.txt');