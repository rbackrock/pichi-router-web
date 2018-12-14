export const name = [
  {
    required: true,
    whitespace: true,
    pattern: /^\w+$/,
    message: 'name only supports letters, numbers, underscores'
  }
];

export const host = [
  {
    required: true,
    whitespace: true
  }
];

export const port = [
  {
    required: true,
    type: 'integer',
    whitespace: true
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
