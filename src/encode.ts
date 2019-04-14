import { InputExpression } from "./interface";

export default function encode(expression: InputExpression) {
  return 'now' + expression.body.map((manipulation) => {
    return manipulation.op +
      (manipulation.type === 'Offset' &&
        manipulation.number !== 1 ? manipulation.number : '') +
      manipulation.unit;
  }).join('');
}
