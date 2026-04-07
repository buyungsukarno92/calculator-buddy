

## Hasil Cek Workflow & Konfigurasi

Saya sudah periksa semua file terkait. Ada beberapa masalah yang perlu diperbaiki:

### Masalah yang Ditemukan

**1. Nama step salah — tulis "JDK 17" tapi pakai versi 21**
- Baris workflow: `name: Set up JDK 17` tapi `java-version: '21'`
- Tidak akan error, tapi membingungkan. Akan diseragamkan ke JDK 17 (lebih stabil untuk Capacitor)

**2. Title HTML masih "Lovable App"**
- Di `index.html`, title dan og:title masih default "Lovable App"
- Harus diganti ke "LJN - Voucher Kalkulator"

**3. `@capacitor/cli` ada di dependencies, seharusnya devDependencies**
- Tidak kritis, tapi bisa bikin APK sedikit lebih besar

**4. Workflow perlu `--legacy-peer-deps` untuk npm install**
- Bisa error kalau ada konflik dependency

### Yang Sudah Benar ✅
- `capacitor.config.ts` — tidak ada `server.url`, jadi APK jalan offline (tidak ke web Lovable)
- `webDir: 'dist'` — benar, sesuai output Vite
- Workflow step `cap add android` → `cap sync android` → build — urutan benar
- Aplikasi kalkulator pure client-side, tidak perlu internet

### Rencana Perbaikan

| File | Perubahan |
|------|-----------|
| `.github/workflows/build-apk.yml` | Fix JDK ke versi 17, tambah `--legacy-peer-deps`, perbaiki nama step |
| `index.html` | Ganti title ke "LJN - Voucher Kalkulator" |
| `package.json` | Pindah `@capacitor/cli` ke devDependencies |

### Detail Teknis
- JDK 17 lebih cocok untuk Capacitor/Android Gradle
- `--legacy-peer-deps` mencegah error dependency conflict saat `npm install`
- Tidak ada perubahan pada logika aplikasi

