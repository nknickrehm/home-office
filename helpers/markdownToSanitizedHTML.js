const xss = require('xss');
const showdown  = require('showdown');

const Converter = new showdown.Converter();

module.exports = function (markdownString) {
  let htmlString = Converter.makeHtml(markdownString);

  // Convert all h1 to h2 and remove the id attribute
  htmlString = htmlString.replace(/<h1 id="[^>]*>/g, '<h2>');
  htmlString = htmlString.replace(/<h1>/g, '<h2>');
  htmlString = htmlString.replace(/<\/h1>/g, '</h2>');

  // Handle XSS attack vectors
  const xssOptions = {
    whiteList: {
      h2: [],
      a: ['href', 'target'],
      img: ['src', 'alt'],
      p: [],
      ol: [],
      ul: [],
      li: [],
      em: [],
      strong: []
    }
  };

  htmlString = xss(htmlString, xssOptions);

  return htmlString;
}
