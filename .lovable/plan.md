

## Aplikasi Android Kalkulator Rental (APK)

Kita akan bikin aplikasi Android menggunakan **Capacitor** — tools yang mengubah web app jadi aplikasi Android asli (file APK).

### Yang Akan Dibuat

**1. Halaman Kalkulator**
- 4 baris item: 4 Jam (Rp 1.600), 6 Jam (Rp 2.400), 12 Jam (Rp 4.000), 30 Hari (Rp 45.000)
- Tombol + dan - untuk kuantiti
- Total harga otomatis
- Input uang bayar
- Kembalian otomatis
- Tombol Reset

**2. Setup Capacitor untuk Android**
- Install library Capacitor (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android`)
- Buat file konfigurasi Capacitor
- Siapkan project untuk di-build jadi APK

### Yang Perlu Kamu Siapkan di Komputer

Untuk menghasilkan file APK, kamu perlu:

1. **Android Studio** — download gratis di [developer.android.com](https://developer.android.com/studio)
2. **Node.js** — untuk menjalankan perintah build
3. **Export project ke GitHub** — pakai tombol "Export to Github" di Lovable

### Langkah Setelah Saya Selesai Coding

1. Export project ke GitHub, lalu `git clone` ke komputer kamu
2. Buka terminal, jalankan:
   ```
   npm install
   npx cap add android
   npx cap update android
   npm run build
   npx cap sync
   ```
3. Buka di Android Studio: `npx cap open android`
4. Di Android Studio, klik **Build → Build APK** untuk dapat file APK
5. Transfer APK ke HP dan install

### Detail Teknis

- **File baru**: `src/pages/Index.tsx` (UI kalkulator), `capacitor.config.ts`
- **Library baru**: `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`
- Desain mobile-first, tombol besar, mudah ditekan

