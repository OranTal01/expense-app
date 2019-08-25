const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toBe(7);
});

test('should generateGreeting', () => {
  const result = generateGreeting('oran');
  expect(result).toBe('Hello oran!');
});