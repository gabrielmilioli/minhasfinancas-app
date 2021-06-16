import CurrencyFormatter from 'currency-formatter';

class NumberUtils {

  static format(number, synbol) {
    const options = {
      symbol: synbol || '',
      locale: 'pt-BR'
    };

    return CurrencyFormatter.format(number, options);
  };

}

export default NumberUtils;