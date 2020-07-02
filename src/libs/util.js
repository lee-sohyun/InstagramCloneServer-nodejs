'use strict';

exports.snakeCaseToCamelCase = function snakeCaseToCamelCase(word) {
  word = word.toLocaleLowerCase();
  const find = /_\w/g;
  const convert = matches => matches[1].toUpperCase();
  return word.replace(find, convert);
};

exports.dotCaseToCamelCase = function dotCaseToCamelCase(word) {
  word = word.toLocaleLowerCase();
  const find = /\.\w/g;
  const convert = matches => matches[1].toUpperCase();
  return word.replace(find, convert);
};
