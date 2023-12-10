export const snakeCaseToHuman = (snakeCaseString) => {
  // Split the snake case string by underscores
  var words = snakeCaseString.split("_");

  // Capitalize the first letter of each word
  var capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  var humanizedString = capitalizedWords.join(" ");

  return humanizedString;
};
