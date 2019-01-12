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

export function delay(required) {
  return [
    {
      required: required,
      whitespace: true,
      validator: (rule, value, callback) => {
        if (required) {
          if (/^\d+$/.test(value)) {
            const val = Number(value);
            if (val >= 0 && val <= 300) {
              callback();
            } else {
              callback('delay must be between 0 and 300');
            }
          } else {
            callback('delay must be of type number and an integer');
          }
        } else {
          callback();
        }
      }
    }
  ];
}
