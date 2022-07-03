import _ from 'lodash';

const createGrouppedRegex = (regex: string) => {
  const matches = [...regex.matchAll(/\\(\d+)/g)].map((item) => Number(item[1])).sort((a, b) => b - a);
  let newRegex = regex;

  matches.forEach((number) => {
    newRegex = newRegex.replace(`\\${number}`, `\\${number + 1}`);
  });

  return new RegExp(`(${newRegex})`, 'gmi');
};

type CheckRegex = (
  data,
  inputValue: string,
) => { err?: Error; isMatch?: boolean; isSuccess?: boolean; grouppedRegex?: RegExp };

const checkRegex: CheckRegex = (data, inputValue) => {
  const isEmpty = _.isEmpty;
  const xor = _.xor;

  const isValidRegex = data.suggestedAnswer.includes(inputValue);

  try {
    const grouppedRegex = createGrouppedRegex(inputValue);
    let results = [...data.content.matchAll(grouppedRegex)].map((result) => result[0]).filter(Boolean);

    const isMatch = data.regexMatch?.length === results.length && isEmpty(xor(data.regexMatch, results));
    const isSuccess = isMatch && isValidRegex;

    return { isMatch, isSuccess, grouppedRegex };
  } catch (err) {
    return { err };
  }
};

export default checkRegex;
