export const VALIDATION = {
  MID_NAME: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 20,
  },

  EMAIL: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 50,
    PATTERN: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },

  PASSWORD: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 40,
  },

  SEARCH: {
    MAX_LENGTH: 100,
  },

  ALLOWED_CHARS_PATTERNS: {
    BASIC_NAME_INPUT: '[a-zA-Z0-9%-_.:; ]',
  },
};
