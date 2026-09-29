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
  | "bulkCount"
  | "bulkCountHint"
  | "passphraseMode"
  | "passphraseHint"
  | "wordCount"
  | "passphraseCapitalize"
  | "passphraseAppendNumber"
  | "generatedPasswords"
  | "copyAll"
  | "checkerTitle"
  | "checkerSubtitle"
  | "password"
  | "strength"
  | "entropy"
  | "bruteForceEstimate"
  | "securityWarnings"
  | "warningTooShort"
  | "warningAddUppercase"
  | "warningAddNumber"
  | "warningAddSymbol"
  | "warningAvoidCommonPatterns"
  | "noIssues"
  | "bulkCheckTitle"
  | "bulkCheckHint"
  | "csvUpload"
  | "downloadResults"
  | "passwordsChecked"
  | "noPasswordsFound"
  | "csvError"
  | "csvHeaderPassword"
  | "csvHeaderStrength"
  | "csvHeaderEntropy"
  | "csvHeaderCrackTime"
  | "csvHeaderWarnings"
  | "moreRows"
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
    bulkCount: "How many",
    bulkCountHint: "Generate between 1 and 100 passwords at once.",
    passphraseMode: "Passphrase mode",
    passphraseHint: "Join random words into a memorable passphrase instead of random characters.",
    wordCount: "Words",
    passphraseCapitalize: "Capitalize words",
    passphraseAppendNumber: "Append a number",
    generatedPasswords: "Generated passwords",
    copyAll: "Copy all",
    checkerTitle: "Password Strength Checker",
    checkerSubtitle: "Estimate entropy and get practical warnings.",
    password: "Password",
    strength: "Strength",
    entropy: "Entropy",
    bruteForceEstimate: "Brute force (est.)",
    securityWarnings: "Security warnings",
    warningTooShort: "Password is too short",
    warningAddUppercase: "Add at least one uppercase letter",
    warningAddNumber: "Add at least one number",
    warningAddSymbol: "Add at least one symbol",
    warningAvoidCommonPatterns: 'Avoid common patterns like "123", "password", or "qwerty"',
    noIssues: "No obvious issues detected.",
    bulkCheckTitle: "Bulk check (CSV)",
    bulkCheckHint: "Upload a .csv file. Use a column named password, or the first column.",
    csvUpload: "Choose CSV file",
    downloadResults: "Download results CSV",
    passwordsChecked: "passwords checked",
    noPasswordsFound: "No passwords found in the file.",
    csvError: "Could not read the file.",
    csvHeaderPassword: "password",
    csvHeaderStrength: "strength",
    csvHeaderEntropy: "entropy_bits",
    csvHeaderCrackTime: "crack_time",
    csvHeaderWarnings: "warnings",
    moreRows: "more rows (not shown)",
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
    bulkCount: "Jumlah",
    bulkCountHint: "Buat 1 sampai 100 kata sandi sekaligus.",
    passphraseMode: "Mode frasa sandi",
    passphraseHint: "Gabungkan kata acak menjadi frasa sandi yang mudah diingat, bukan karakter acak.",
    wordCount: "Jumlah kata",
    passphraseCapitalize: "Kapitalkan kata",
    passphraseAppendNumber: "Tambahkan angka",
    generatedPasswords: "Kata sandi hasil",
    copyAll: "Salin semua",
    checkerTitle: "Pengecek Kekuatan",
    checkerSubtitle: "Estimasi entropi dan tampilkan peringatan praktis.",
    password: "Kata sandi",
    strength: "Kekuatan",
    entropy: "Entropi",
    bruteForceEstimate: "Brute force (perkiraan)",
    securityWarnings: "Peringatan keamanan",
    warningTooShort: "Kata sandi terlalu pendek",
    warningAddUppercase: "Tambahkan setidaknya satu huruf besar",
    warningAddNumber: "Tambahkan setidaknya satu angka",
    warningAddSymbol: "Tambahkan setidaknya satu simbol",
    warningAvoidCommonPatterns: 'Hindari pola umum seperti "123", "password", atau "qwerty"',
    noIssues: "Tidak ada masalah yang jelas terdeteksi.",
    bulkCheckTitle: "Cek massal (CSV)",
    bulkCheckHint: "Unggah berkas .csv. Gunakan kolom bernama password, atau kolom pertama.",
    csvUpload: "Pilih berkas CSV",
    downloadResults: "Unduh hasil CSV",
    passwordsChecked: "kata sandi diperiksa",
    noPasswordsFound: "Tidak ada kata sandi yang ditemukan di berkas.",
    csvError: "Tidak dapat membaca berkas.",
    csvHeaderPassword: "kata_sandi",
    csvHeaderStrength: "kekuatan",
    csvHeaderEntropy: "entropi_bit",
    csvHeaderCrackTime: "perkiraan_waktu",
    csvHeaderWarnings: "peringatan",
    moreRows: "baris lagi (tidak ditampilkan)",
    privacyTitle: "Privasi",
    privacyText: "Semua diproses di browser Anda. Tidak ada kata sandi yang disimpan atau dikirim.",
    themeDark: "Gelap",
    themeLight: "Terang",
  },
};

export function t(locale: Locale, key: I18nKey): string {
  return STRINGS[locale]?.[key] ?? STRINGS.en[key] ?? key;
}

