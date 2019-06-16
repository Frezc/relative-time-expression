import { InputExpression } from "./interface";

export default function encode(expression: InputExpression, options?: { displayOne?: boolean; }) {
  const display1 = options && options.displayOne;
  return 'now' + expression.body.map((manipulation) => {
    return manipulation.op +
      (manipulation.type === 'Offset' && display1 || manipulation.number !== 1
        ? manipulation.number : '') +
      manipulation.unit;
  }).join('');
}
