export const name = [
  {
    required: true,
    whitespace: true,
    pattern: /^\w+$/,
    message: 'name only supports letters, numbers, underscores'
  }
];

export function host(required) {
  return [
    {
      required: required,
      whitespace: true
    }
  ];
}

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
