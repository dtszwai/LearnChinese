// Surface used by this project, verified against opencc-js 1.0.5's exports.
declare module 'opencc-js' {
  type Locale = 'cn' | 't' | 'hk' | 'tw' | 'twp' | 'jp';
  export function Converter(options: { from: Locale; to: Locale }): (text: string) => string;
}
