const CountWordsOccurrence = require('count-words-occurrence').default

module.exports = class TermFrequencyCalculator {
  constructor () {
    return (terms, {minLength = 1}) => {
      const freqs = CountWordsOccurrence(
        terms instanceof Array ? terms.join(' ') : terms,
        {minLength: minLength - 1}
      )

      return Object.keys(freqs)
        .map(toArray(freqs))
        .sort(byFreq)
        .reverse()
    }
  }
}

const toArray = freqs => term => ({term, freq: freqs[term]})
const byFreq = ({freq: a}, {freq: b}) => a - b
