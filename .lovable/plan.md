

## Fix Build Error: Java Version Mismatch

Error-nya jelas: **"invalid source release: 21"** — Capacitor Android butuh Java 21, tapi workflow pakai JDK 17.

### Perbaikan

**File: `.github/workflows/build-apk.yml`**
- Ubah `java-version: '17'` menjadi `java-version: '21'`
- Update nama step jadi "Set up JDK 21"

Hanya 1 file, 1 baris yang berubah. Setelah push, build seharusnya sukses.

