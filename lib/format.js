const style = function(code, text) {
  return "\033[" + code + "m" + text + "\033[0m";
}

const bold = function(text) {
  return style(1, text);
}

const underline = function(text) {
  return style(4, text);
}

const yellow = function(text) {
  return style(33, text);
}

const red = function(text) {
  return style(31, text);
}

const green = function(text) {
  return style(32, text);
}

const newLine = function() {
  console.log();
}

const title = function(text) {
  newLine();
  console.log(underline(bold(text)));
}

exports.underline = underline;
exports.bold = bold;
exports.red = red;
exports.green = green;
exports.title = title;
