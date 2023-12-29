export default (countryCode: string) : string=> { 
    const currencyMapping : {
     [key: string]: string;
    } = {
     AT: 'EUR',
     AU: 'AUD',
     BE: 'EUR',
     CA: 'CAD',
     CH: 'CHF',
     CZ: 'CZK',
     DA: 'DKK',
     DE: 'EUR',
     EE: 'EUR',
     ES: 'EUR',
     FI: 'EUR',
     FR: 'EUR',
     GB: 'GBP',
     GR: 'EUR',
     HU: 'HUF',
     IE: 'EUR',
     IT: 'EUR',
     JP: 'JPY',
     KR: 'KRW',
     LT: 'EUR',
     LU: 'EUR',
     LV: 'EUR',
     MX: 'MXN',
     NL: 'EUR',
     NO: 'NOK',
     NZ: 'NZD',
     PL: 'PLN',
     PT: 'EUR',
     RO: 'RON',
     SE: 'SEK',
     SI: 'EUR',
     SK: 'EUR',
     US: 'USD',
    }
 
    return currencyMapping[countryCode];
 
 }