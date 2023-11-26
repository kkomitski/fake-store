/**
 * Filters a string to return any part that matches the Regex provided
 *
 * @param string String to be filtered
 * @param regex Required regex filter
 *
 * @returns Matches if any or ```false```
 */
function regexMatch(string: string, regex: RegExp) {
  const matches = [];
  let match;

  while ((match = regex.exec(string)) !== null) {
    const paramName = match[1];
    const paramValue = match[2];
    matches.push({ name: paramName, value: paramValue });
  }

  if (matches) {
    return matches;
  } else {
    return false;
  }
}

export default regexMatch;
