
## Rencana Perbaikan Workflow APK

Masalah yang terlihat ada 2 hal berbeda:

1. **Warning Node.js 20 deprecated**
   - Ini berasal dari action GitHub lama: `actions/checkout@v4`, `actions/setup-node@v4`, `actions/setup-java@v4`, dan `actions/upload-artifact@v4`.
   - Warning ini **belum tentu penyebab** `exit code 1`, tapi tetap perlu diperbaiki supaya build aman ke depan.

2. **Build benar-benar gagal (`exit code 1`)**
   - Artinya ada step lain yang kemungkinan gagal saat install, build Vite, sync Capacitor, atau build Gradle.
   - Jadi revisi harus bukan cuma hapus warning, tapi juga bikin workflow lebih aman dan lebih mudah dilacak kalau gagal lagi.

## Yang akan direvisi

### 1. Update workflow ke action yang kompatibel Node 24
File: `.github/workflows/build-apk.yml`

Akan diubah:
- `actions/checkout` ke major terbaru yang sudah support Node 24
- `actions/setup-node` ke major terbaru yang sudah support Node 24
- `actions/setup-java` ke major terbaru yang sudah support Node 24
- `actions/upload-artifact` ke versi terbaru yang eksplisit support Node 24

Tujuannya:
- Hilangkan warning deprecation
- Menghindari build putus di masa dekat saat GitHub memaksa Node 24

### 2. Rapikan alur build Android
Masih di workflow yang sama, saya akan pastikan urutannya tetap aman:
```text
checkout
setup node
install dependencies
build web
install/sync capacitor android
setup java
build apk
upload artifact
```

Saya juga akan cek apakah step Android sudah paling aman untuk runner GitHub, supaya APK hasilnya benar-benar build dari file lokal `dist`, bukan dari URL preview Lovable.

### 3. Tambahkan perlindungan supaya error lebih gampang dibaca
Karena `exit code 1` bukan dari warning Node 20, workflow akan dibuat lebih jelas saat gagal, misalnya:
- nama step diperjelas
- urutan build dipastikan konsisten
- upload artifact tetap fokus ke file APK debug yang benar

Ini penting supaya kalau nanti masih gagal, penyebabnya langsung kelihatan dari step mana.

## Hasil yang diharapkan
Setelah revisi:
- warning Node 20 deprecated hilang
- workflow lebih siap untuk perubahan GitHub Actions ke Node 24
- proses build APK lebih stabil
- file APK tetap bisa di-download dari tab **Actions > Artifacts**
- APK tetap offline dan aman di-install manual di Android

## File yang akan disentuh
- `.github/workflows/build-apk.yml`

## Detail teknis
- Warning Node 20 berasal dari **runtime action GitHub**, bukan dari kode React aplikasi.
- `exit code 1` berarti ada kegagalan build yang terpisah, jadi perbaikan workflow akan fokus pada **kompatibilitas** dan **stabilitas build** sekaligus.
- Tidak ada perubahan pada tampilan aplikasi kalkulator.
