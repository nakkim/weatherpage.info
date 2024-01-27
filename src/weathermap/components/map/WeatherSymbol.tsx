import React from 'react';

import Dark1 from '../../assets/smartsymbol/1.svg';
import Dark2 from '../../assets/smartsymbol/2.svg';
import Dark4 from '../../assets/smartsymbol/4.svg';
import Dark6 from '../../assets/smartsymbol/6.svg';
import Dark7 from '../../assets/smartsymbol/7.svg';
import Dark9 from '../../assets/smartsymbol/9.svg';
import Dark11 from '../../assets/smartsymbol/11.svg';
import Dark14 from '../../assets/smartsymbol/14.svg';
import Dark17 from '../../assets/smartsymbol/17.svg';
import Dark21 from '../../assets/smartsymbol/21.svg';
import Dark24 from '../../assets/smartsymbol/24.svg';
import Dark27 from '../../assets/smartsymbol/27.svg';
import Dark31 from '../../assets/smartsymbol/31.svg';
import Dark32 from '../../assets/smartsymbol/32.svg';
import Dark33 from '../../assets/smartsymbol/33.svg';
import Dark34 from '../../assets/smartsymbol/34.svg';
import Dark35 from '../../assets/smartsymbol/35.svg';
import Dark36 from '../../assets/smartsymbol/36.svg';
import Dark37 from '../../assets/smartsymbol/37.svg';
import Dark38 from '../../assets/smartsymbol/38.svg';
import Dark39 from '../../assets/smartsymbol/39.svg';
import Dark41 from '../../assets/smartsymbol/41.svg';
import Dark42 from '../../assets/smartsymbol/42.svg';
import Dark43 from '../../assets/smartsymbol/43.svg';
import Dark44 from '../../assets/smartsymbol/44.svg';
import Dark45 from '../../assets/smartsymbol/45.svg';
import Dark46 from '../../assets/smartsymbol/46.svg';
import Dark47 from '../../assets/smartsymbol/47.svg';
import Dark48 from '../../assets/smartsymbol/48.svg';
import Dark49 from '../../assets/smartsymbol/49.svg';
import Dark51 from '../../assets/smartsymbol/51.svg';
import Dark52 from '../../assets/smartsymbol/52.svg';
import Dark53 from '../../assets/smartsymbol/53.svg';
import Dark54 from '../../assets/smartsymbol/54.svg';
import Dark55 from '../../assets/smartsymbol/55.svg';
import Dark56 from '../../assets/smartsymbol/56.svg';
import Dark57 from '../../assets/smartsymbol/57.svg';
import Dark58 from '../../assets/smartsymbol/58.svg';
import Dark59 from '../../assets/smartsymbol/59.svg';
import Dark61 from '../../assets/smartsymbol/61.svg';
import Dark64 from '../../assets/smartsymbol/64.svg';
import Dark67 from '../../assets/smartsymbol/67.svg';
import Dark71 from '../../assets/smartsymbol/71.svg';
import Dark74 from '../../assets/smartsymbol/74.svg';
import Dark77 from '../../assets/smartsymbol/77.svg';
import Dark101 from '../../assets/smartsymbol/101.svg';
import Dark102 from '../../assets/smartsymbol/102.svg';
import Dark104 from '../../assets/smartsymbol/104.svg';
import Dark106 from '../../assets/smartsymbol/106.svg';
import Dark121 from '../../assets/smartsymbol/121.svg';
import Dark124 from '../../assets/smartsymbol/124.svg';
import Dark131 from '../../assets/smartsymbol/131.svg';
import Dark132 from '../../assets/smartsymbol/132.svg';
import Dark133 from '../../assets/smartsymbol/133.svg';
import Dark134 from '../../assets/smartsymbol/134.svg';
import Dark135 from '../../assets/smartsymbol/135.svg';
import Dark136 from '../../assets/smartsymbol/136.svg';
import Dark141 from '../../assets/smartsymbol/141.svg';
import Dark142 from '../../assets/smartsymbol/142.svg';
import Dark143 from '../../assets/smartsymbol/143.svg';
import Dark144 from '../../assets/smartsymbol/144.svg';
import Dark145 from '../../assets/smartsymbol/145.svg';
import Dark146 from '../../assets/smartsymbol/146.svg';
import Dark151 from '../../assets/smartsymbol/151.svg';
import Dark152 from '../../assets/smartsymbol/152.svg';
import Dark153 from '../../assets/smartsymbol/153.svg';
import Dark154 from '../../assets/smartsymbol/154.svg';
import Dark155 from '../../assets/smartsymbol/155.svg';
import Dark156 from '../../assets/smartsymbol/156.svg';
import Dark161 from '../../assets/smartsymbol/161.svg';
import Dark164 from '../../assets/smartsymbol/164.svg';
import Dark171 from '../../assets/smartsymbol/171.svg';
import Dark174 from '../../assets/smartsymbol/174.svg';

type WeatherSymbolType = {
  [key: string]: {
    day: string;
    night: string;
  };
};

const symbols: WeatherSymbolType = {
  '1': {
    day: Dark1,
    night: Dark101,
  },
  '11': {
    day: Dark11,
    night: Dark11,
  },
  '14': {
    day: Dark14,
    night: Dark14,
  },
  '17': {
    day: Dark17,
    night: Dark17,
  },
  '2': {
    day: Dark2,
    night: Dark102,
  },
  '21': {
    day: Dark21,
    night: Dark121,
  },
  '24': {
    day: Dark24,
    night: Dark124,
  },
  '27': {
    day: Dark27,
    night: Dark27,
  },
  '31': {
    day: Dark31,
    night: Dark131,
  },
  '32': {
    day: Dark32,
    night: Dark132,
  },
  '33': {
    day: Dark33,
    night: Dark133,
  },
  '34': {
    day: Dark34,
    night: Dark134,
  },
  '35': {
    day: Dark35,
    night: Dark135,
  },
  '36': {
    day: Dark36,
    night: Dark136,
  },
  '37': {
    day: Dark37,
    night: Dark37,
  },
  '38': {
    day: Dark38,
    night: Dark38,
  },
  '39': {
    day: Dark39,
    night: Dark39,
  },
  '4': {
    day: Dark4,
    night: Dark104,
  },
  '41': {
    day: Dark41,
    night: Dark141,
  },
  '42': {
    day: Dark42,
    night: Dark142,
  },
  '43': {
    day: Dark43,
    night: Dark143,
  },
  '44': {
    day: Dark44,
    night: Dark144,
  },
  '45': {
    day: Dark45,
    night: Dark145,
  },
  '46': {
    day: Dark46,
    night: Dark146,
  },
  '47': {
    day: Dark47,
    night: Dark47,
  },
  '48': {
    day: Dark48,
    night: Dark48,
  },
  '49': {
    day: Dark49,
    night: Dark49,
  },
  '51': {
    day: Dark51,
    night: Dark151,
  },
  '52': {
    day: Dark52,
    night: Dark152,
  },
  '53': {
    day: Dark53,
    night: Dark153,
  },
  '54': {
    day: Dark54,
    night: Dark154,
  },
  '55': {
    day: Dark55,
    night: Dark155,
  },
  '56': {
    day: Dark56,
    night: Dark156,
  },
  '57': {
    day: Dark57,
    night: Dark57,
  },
  '58': {
    day: Dark58,
    night: Dark58,
  },
  '59': {
    day: Dark59,
    night: Dark59,
  },
  '6': {
    day: Dark6,
    night: Dark106,
  },
  '61': {
    day: Dark61,
    night: Dark161,
  },
  '64': {
    day: Dark64,
    night: Dark164,
  },
  '67': {
    day: Dark67,
    night: Dark67,
  },
  '7': {
    day: Dark7,
    night: Dark7,
  },
  '71': {
    day: Dark71,
    night: Dark171,
  },
  '74': {
    day: Dark74,
    night: Dark174,
  },
  '77': {
    day: Dark77,
    night: Dark77,
  },
  '9': {
    day: Dark9,
    night: Dark9,
  },
};

export interface IWeatherSymbolProps {
  altText?: string;
  dark?: boolean;
  sx?: React.CSSProperties;
  value: number;
}

const styles = {
  root: {
    height: '20px',
    width: '20px',
  },
};

export const WeatherSymbol: React.FC<IWeatherSymbolProps> = ({
  altText,
  sx,
  value,
}) => {
  const parsedValue = value > 100 ? value - 100 : value;
  //const symbol = dark ? symbolsDark[parsedValue] : symbolsLight[parsedValue];
  const symbol = symbols[parsedValue];

  if (!symbol) return null;

  return (
    <img
      style={{ ...styles.root, ...sx }}
      src={symbol[value < 100 ? 'day' : 'night']}
      alt={altText}
    ></img>
  );
};
