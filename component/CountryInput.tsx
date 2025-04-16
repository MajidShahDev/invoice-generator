'use client';
import { useState } from 'react';

const countryList = {
  AED: 'AE',
  AFN: 'AF',
  XCD: 'AG',
  ALL: 'AL',
  AMD: 'AM',
  ANG: 'AN',
  AOA: 'AO',
  AQD: 'AQ',
  ARS: 'AR',
  AUD: 'AU',
  AZN: 'AZ',
  BAM: 'BA',
  BBD: 'BB',
  BDT: 'BD',
  XOF: 'BE',
  BGN: 'BG',
  BHD: 'BH',
  BIF: 'BI',
  BMD: 'BM',
  BND: 'BN',
  BOB: 'BO',
  BRL: 'BR',
  BSD: 'BS',
  NOK: 'BV',
  BWP: 'BW',
  BYR: 'BY',
  BZD: 'BZ',
  CAD: 'CA',
  CDF: 'CD',
  XAF: 'CF',
  CHF: 'CH',
  CLP: 'CL',
  CNY: 'CN',
  COP: 'CO',
  CRC: 'CR',
  CUP: 'CU',
  CVE: 'CV',
  CYP: 'CY',
  CZK: 'CZ',
  DJF: 'DJ',
  DKK: 'DK',
  DOP: 'DO',
  DZD: 'DZ',
  ECS: 'EC',
  EEK: 'EE',
  EGP: 'EG',
  ETB: 'ET',
  EUR: 'FR',
  FJD: 'FJ',
  FKP: 'FK',
  GBP: 'GB',
  GEL: 'GE',
  GGP: 'GG',
  GHS: 'GH',
  GIP: 'GI',
  GMD: 'GM',
  GNF: 'GN',
  GTQ: 'GT',
  GYD: 'GY',
  HKD: 'HK',
  HNL: 'HN',
  HRK: 'HR',
  HTG: 'HT',
  HUF: 'HU',
  IDR: 'ID',
  ILS: 'IL',
  INR: 'IN',
  IQD: 'IQ',
  IRR: 'IR',
  ISK: 'IS',
  JMD: 'JM',
  JOD: 'JO',
  JPY: 'JP',
  KES: 'KE',
  KGS: 'KG',
  KHR: 'KH',
  KMF: 'KM',
  KPW: 'KP',
  KRW: 'KR',
  KWD: 'KW',
  KYD: 'KY',
  KZT: 'KZ',
  LAK: 'LA',
  LBP: 'LB',
  LKR: 'LK',
  LRD: 'LR',
  LSL: 'LS',
  LTL: 'LT',
  LVL: 'LV',
  LYD: 'LY',
  MAD: 'MA',
  MDL: 'MD',
  MGA: 'MG',
  MKD: 'MK',
  MMK: 'MM',
  MNT: 'MN',
  MOP: 'MO',
  MRO: 'MR',
  MTL: 'MT',
  MUR: 'MU',
  MVR: 'MV',
  MWK: 'MW',
  MXN: 'MX',
  MYR: 'MY',
  MZN: 'MZ',
  NAD: 'NA',
  XPF: 'NC',
  NGN: 'NG',
  NIO: 'NI',
  NPR: 'NP',
  NZD: 'NZ',
  OMR: 'OM',
  PAB: 'PA',
  PEN: 'PE',
  PGK: 'PG',
  PHP: 'PH',
  PKR: 'PK',
  PLN: 'PL',
  PYG: 'PY',
  QAR: 'QA',
  RON: 'RO',
  RSD: 'RS',
  RUB: 'RU',
  RWF: 'RW',
  SAR: 'SA',
  SBD: 'SB',
  SCR: 'SC',
  SDG: 'SD',
  SEK: 'SE',
  SGD: 'SG',
  SKK: 'SK',
  SLL: 'SL',
  SOS: 'SO',
  SRD: 'SR',
  STD: 'ST',
  SVC: 'SV',
  SYP: 'SY',
  SZL: 'SZ',
  THB: 'TH',
  TJS: 'TJ',
  TMT: 'TM',
  TND: 'TN',
  TOP: 'TO',
  TRY: 'TR',
  TTD: 'TT',
  TWD: 'TW',
  TZS: 'TZ',
  UAH: 'UA',
  UGX: 'UG',
  USD: 'US',
  UYU: 'UY',
  UZS: 'UZ',
  VEF: 'VE',
  VND: 'VN',
  VUV: 'VU',
  YER: 'YE',
  ZAR: 'ZA',
  ZMK: 'ZM',
  ZWD: 'ZW',
};

export default function CountryInput() {
  const [currency, setCurrency] = useState('USD'); // Default currency

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  return (
    <>
      <label htmlFor="currency">Currency:</label>
      <select
        id="currency"
        className="w-24 p-[11px] border border-gray-300 rounded outline-gray-400 text-center ml-4 text-sm"
        value={currency} // Set value to the state
        onChange={handleCurrencyChange} // Handle change event
      >
        {Object.entries(countryList).map(([currencyCodeKey, _], idx) => (
          <option key={idx} value={currencyCodeKey}>
            {currencyCodeKey}
          </option>
        ))}
      </select>
    </>
  );
}


// Object.entries(countryList) will return an array like this:
// [
//   ["USD", "United States"], 
//   ["EUR", "Eurozone"], 
//   ["JPY", "Japan"]
// ]

// .map(([currencyCode, countryCode]) => (...))
// This loops over each key value pair in the array, first is key, second is value.
//([key, _])  if we need only key
//([, value])  if we need only value


// Use Object.keys() when you only care about the keys.
// Use Object.values() when you only care about the values.
// Use Object.entries() when you need both keys and values.