export function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}
