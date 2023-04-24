const style = function(code, text) {
  const formattedText = "\033[" + code + text + "\033[0m"; 
  return formattedText; 
}

const bold = function(text) {
  return style('1m', text);
}

const underline = function(text) {
  return style('4m', text);
}

const yellow = function(text) {
  return style('33m', text);
}

const red = function(text) {
  return style('31m', text);
}

const green = function(text) {
  return style('32m', text);
}

const newLine = function() {
  return '\n';
}

const title = function(text) {
  return newLine() + underline(bold(text));
}

const display = function(text) {
  console.log(text);
};

exports.underline = underline;
exports.bold = bold;
exports.red = red;
exports.yellow = yellow;
exports.green = green;
exports.title = title;
exports.display = display;
