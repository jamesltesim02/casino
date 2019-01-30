import Vue from 'vue'

export default {
  install () {
    Vue.filter('moneyFormat', (source) => {
      if (parseInt(source) < 1000) {
        return source
      }
      const [numInt, numDeci] = String(source).split('.')
      const intLen = numInt.length

      return numInt.split('').map((c, i) => {
        if ((intLen - i - 1) % 3 === 0 && (intLen - i) > 3) {
          return `${c},`
        }
        return c
      }).join('') + (numDeci || '')
    })
  }
}
