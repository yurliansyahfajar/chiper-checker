type PasswordOptions = {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
    requireEachSelectedSet?: boolean; // default true
  };
  
  const CHARSETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{};:,.<>?/~`|\\",
  } as const;
  
  function getCrypto(): Crypto {
    const c = globalThis.crypto;
    if (typeof c?.getRandomValues === "function") return c;
    throw new Error("Web Crypto API is not available in this environment.");
  }
  
  function secureRandomInt(maxExclusive: number): number {
    if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
      throw new Error("maxExclusive must be a positive integer.");
    }
  
    // Rejection sampling using uint32 range to reduce modulo bias.
    const c = getCrypto();
    const buf = new Uint32Array(1);
  
    const MAX_UINT32 = 0xffffffff;
    const limit = MAX_UINT32 - (MAX_UINT32 % maxExclusive);
  
    while (true) {
      c.getRandomValues(buf);
      const x = buf[0]!;
      if (x < limit) return x % maxExclusive;
    }
  }
  
  function securePickChar(charset: string): string {
    return charset[secureRandomInt(charset.length)]!;
  }
  
  function secureShuffle(arr: string[]): string[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = secureRandomInt(i + 1);
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
    return arr;
  }
  
  export function generateSecurePassword(length: number, options: PasswordOptions): string {
    const len = Math.floor(length);
    if (!Number.isFinite(len) || len <= 0) throw new Error("length must be a positive number.");
  
    const uppercase = options.uppercase ?? true;
    const lowercase = options.lowercase ?? true;
    const numbers = options.numbers ?? true;
    const symbols = options.symbols ?? false;
    const requireEach = options.requireEachSelectedSet ?? true;
  
    const selectedSets: string[] = [];
    if (uppercase) selectedSets.push(CHARSETS.uppercase);
    if (lowercase) selectedSets.push(CHARSETS.lowercase);
    if (numbers) selectedSets.push(CHARSETS.numbers);
    if (symbols) selectedSets.push(CHARSETS.symbols);
  
    if (selectedSets.length === 0) {
      throw new Error("At least one character set must be selected.");
    }
  
    const allChars = selectedSets.join("");
  
    // Optionally ensure at least one character from each selected set.
    const resultChars: string[] = [];
    if (requireEach) {
      if (len < selectedSets.length) {
        throw new Error(`length must be at least ${selectedSets.length} to include each selected set.`);
      }
      for (const set of selectedSets) resultChars.push(securePickChar(set));
    }
  
    while (resultChars.length < len) {
      resultChars.push(securePickChar(allChars));
    }
  
    // Shuffle so required chars aren't predictable at the front.
    secureShuffle(resultChars);
    return resultChars.join("");
  }