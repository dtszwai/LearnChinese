import _ from 'lodash';

type CheckRegex = (data, inputValue: string) => { err?: Error; isMatch?: boolean; isSuccess?: boolean };

const checkRegex: CheckRegex = (data, inputValue) => {
  const isEmpty = _.isEmpty;
  const xor = _.xor;

  const isValidRegex = data.suggestedAnswer.includes(inputValue);

  try {
    let results = Array.from(data.content.matchAll(new RegExp(`(${inputValue})`, 'gmi')))
      .map((result) => result[0])
      .filter(Boolean);

    const isMatch = data.regexMatch?.length === results.length && isEmpty(xor(data.regexMatch, results));
    const isSuccess = isMatch && isValidRegex;

    return { isMatch, isSuccess };
  } catch (err) {
    return { err };
  }
};

export default checkRegex;
