const CountWordsOccurrence = require('count-words-occurrence').default

module.exports = class TermFrequencyCalculator {
  constructor () {
    return (terms, {minLength = 1}) => {
      const freqs = CountWordsOccurrence(
        terms instanceof Array ? terms.join(' ') : terms,
        {minLength: minLength - 1}
      )

      return Object.keys(freqs)
        .map(toArray)
        .sort(byFreq)
        .reverse()
    }
  }
}

const toArray = (term, _, freqs) => ({term, freqs: freqs[term]})
const byFreq = ({freq: a}, {freq: b}) => a - b
