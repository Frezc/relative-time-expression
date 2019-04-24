export interface ExpError {
  expect?: string;
  actual?: string;
  start?: number;
  end?: number;
}

export function createError(err: ExpError): Error & ExpError {
  let message;
  if (!err.expect) {
    message = `unexpected token \`${err.actual}\` at (${err.start}, ${err.end})`;
  } else  if (!err.actual) {
    message = `expect ${err.expect} but get the end of input`;
  } else {
    message = `expect ${err.expect} but found \`${err.actual}\` at (${err.start}, ${err.end})`;
  }

  const error = new Error(message);
  Object.assign(error, err);
  return error;
}
