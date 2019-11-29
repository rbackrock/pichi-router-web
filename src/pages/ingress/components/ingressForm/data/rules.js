export const name = [
  {
    required: true,
    whitespace: true,
    pattern: /^\w+$/,
    message: 'name only supports letters, numbers, underscores'
  }
];

export const bind = [
  {
    required: true,
    whitespace: true
  }
];

export const port = [
  {
    required: true,
    type: 'integer',
    whitespace: true,
    min: 1,
    max: 65535
  }
];

export const password = [
  {
    required: true,
    whitespace: true
  }
];

export const method = [
  {
    required: true
  }
];

export const destinations = [
  {
    required: true,
    type: 'integer',
    whitespace: true
  }
];

export const balance = [
  {
    required: true
  }
];

export const cert_file = [
  {
    required: true
  }
];

export const key_file = [
  {
    required: true
  }
];
