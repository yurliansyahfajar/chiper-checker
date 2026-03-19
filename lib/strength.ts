export type StrengthLevel = "Weak" | "Moderate" | "Strong" | "Very Strong";

export function calculateEntropy(password: string): number {
  if (!password) return 0;

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  // Estimated character set size based on what appears in the password
  let charsetSize = 0;
  if (hasLower) charsetSize += 26;
  if (hasUpper) charsetSize += 26;
  if (hasNumber) charsetSize += 10;
  if (hasSymbol) charsetSize += 32; // rough bucket for common symbols

  if (charsetSize === 0) return 0;

  return password.length * Math.log2(charsetSize);
}

export function getStrength(entropy: number): StrengthLevel {
  if (!Number.isFinite(entropy) || entropy < 40) return "Weak";
  if (entropy <= 60) return "Moderate";
  if (entropy <= 80) return "Strong";
  return "Very Strong";
}

export function getEntropyAndStrength(password: string): { entropy: number; strength: StrengthLevel } {
  const entropy = calculateEntropy(password);
  const strength = getStrength(entropy);
  return { entropy, strength };
}

export function analyzePassword(password: string): string[] {
  const warnings: string[] = [];
  if (!password) return warnings;

  if (password.length < 8) warnings.push("Password is too short");
  if (!/[A-Z]/.test(password)) warnings.push("Add at least one uppercase letter");
  if (!/\d/.test(password)) warnings.push("Add at least one number");
  if (!/[^A-Za-z0-9]/.test(password)) warnings.push("Add at least one symbol");

  const lower = password.toLowerCase();
  if (lower.includes("123") || lower.includes("password") || lower.includes("qwerty")) {
    warnings.push('Avoid common patterns like "123", "password", or "qwerty"');
  }

  return warnings;
}

export function estimateCrackTime(entropy: number): string {
  const rate = 1_000_000_000; // guesses/second

  if (!Number.isFinite(entropy) || entropy <= 0) return "N/A";

  // Total combinations ≈ 2^entropy. Average time ≈ half the space.
  const avgGuesses = Math.pow(2, entropy - 1);

  // Guard against overflow for huge entropy
  if (!Number.isFinite(avgGuesses)) return "Astronomical (too large to estimate)";

  const seconds = avgGuesses / rate;

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const year = 365 * day;

  if (seconds < minute) return `${Math.round(seconds)} seconds`;
  if (seconds < hour) return `${Math.round(seconds / minute)} minutes`;
  if (seconds < day) return `${Math.round(seconds / hour)} hours`;
  if (seconds < year) return `${Math.round(seconds / day)} days`;

  const years = seconds / year;
  if (years < 1_000) return `~ ${Math.round(years)} years`;
  if (years < 1_000_000) return `~ ${Math.round(years / 1_000)} thousand years`;
  if (years < 1_000_000_000) return `~ ${Math.round(years / 1_000_000)} million years`;
  return "Astronomical (billions+ of years)";
}