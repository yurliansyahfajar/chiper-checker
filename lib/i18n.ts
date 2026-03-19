export type Locale = "en" | "id";

export type I18nKey =
  | "badge"
  | "title"
  | "subtitle"
  | "generatorTitle"
  | "generatorSubtitle"
  | "length"
  | "between8and32"
  | "characterSets"
  | "uppercase"
  | "lowercase"
  | "numbers"
  | "symbols"
  | "selectAtLeastOneSet"
  | "tipSymbols"
  | "generate"
  | "copy"
  | "copied"
  | "copyFailed"
  | "generatedPassword"
  | "useInChecker"
  | "checkerTitle"
  | "checkerSubtitle"
  | "password"
  | "strength"
  | "entropy"
  | "bruteForceEstimate"
  | "securityWarnings"
  | "noIssues"
  | "privacyTitle"
  | "privacyText"
  | "themeDark"
  | "themeLight";

const STRINGS: Record<Locale, Record<I18nKey, string>> = {
  en: {
    badge: "Local-only password tools",
    title: "CipherCheck",
    subtitle: "Generate strong passwords and estimate password strength using simple, transparent heuristics.",
    generatorTitle: "Password Generator",
    generatorSubtitle: "Create a random password with your chosen character sets.",
    length: "Length",
    between8and32: "Choose between 8 and 32 characters.",
    characterSets: "Character sets",
    uppercase: "Uppercase",
    lowercase: "Lowercase",
    numbers: "Numbers",
    symbols: "Symbols",
    selectAtLeastOneSet: "Select at least one character set to generate a password.",
    tipSymbols: "Tip: enabling symbols improves entropy significantly.",
    generate: "Generate",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Copy failed",
    generatedPassword: "Generated password",
    useInChecker: "Use in checker",
    checkerTitle: "Password Strength Checker",
    checkerSubtitle: "Estimate entropy and get practical warnings.",
    password: "Password",
    strength: "Strength",
    entropy: "Entropy",
    bruteForceEstimate: "Brute force (est.)",
    securityWarnings: "Security warnings",
    noIssues: "No obvious issues detected.",
    privacyTitle: "Privacy",
    privacyText: "All processing happens locally in your browser. No password is stored or transmitted.",
    themeDark: "Dark",
    themeLight: "Light",
  },
  id: {
    badge: "Semua diproses lokal",
    title: "CipherCheck",
    subtitle: "Buat kata sandi kuat dan cek kekuatannya dengan heuristik yang sederhana dan transparan.",
    generatorTitle: "Generator Kata Sandi",
    generatorSubtitle: "Buat kata sandi acak sesuai pilihan karakter.",
    length: "Panjang",
    between8and32: "Pilih antara 8 sampai 32 karakter.",
    characterSets: "Set karakter",
    uppercase: "Huruf besar",
    lowercase: "Huruf kecil",
    numbers: "Angka",
    symbols: "Simbol",
    selectAtLeastOneSet: "Pilih minimal satu set karakter untuk membuat kata sandi.",
    tipSymbols: "Tips: menyalakan simbol meningkatkan entropi secara signifikan.",
    generate: "Buat",
    copy: "Salin",
    copied: "Tersalin",
    copyFailed: "Gagal salin",
    generatedPassword: "Kata sandi hasil",
    useInChecker: "Pakai di pengecek",
    checkerTitle: "Pengecek Kekuatan",
    checkerSubtitle: "Estimasi entropi dan tampilkan peringatan praktis.",
    password: "Kata sandi",
    strength: "Kekuatan",
    entropy: "Entropi",
    bruteForceEstimate: "Brute force (perkiraan)",
    securityWarnings: "Peringatan keamanan",
    noIssues: "Tidak ada masalah yang jelas terdeteksi.",
    privacyTitle: "Privasi",
    privacyText: "Semua diproses di browser Anda. Tidak ada kata sandi yang disimpan atau dikirim.",
    themeDark: "Gelap",
    themeLight: "Terang",
  },
};

export function t(locale: Locale, key: I18nKey): string {
  return STRINGS[locale]?.[key] ?? STRINGS.en[key] ?? key;
}

