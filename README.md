# Action People ML — Landing Page

Landing page dan kebijakan privasi statis untuk **Action People ML**, aplikasi
deteksi aksi manusia yang berjalan sepenuhnya di perangkat.

Halaman ini dibangun dengan HTML, CSS, dan JavaScript tanpa build step.

## Struktur

```
index.html          Landing page
privacy.html        Kebijakan privasi
assets/
  styles.css        Design system, layout, responsive, print
  app.js            Demo pose interaktif, scroll reveal, penanda daftar isi
  store-links.js    Template URL toko aplikasi
  mark.svg          Logo mark
```

## Mengisi tautan toko

Semua tautan unduhan berada di satu tempat: `assets/store-links.js`.

```js
window.ACTION_PEOPLE_LINKS = {
  playStore: "https://play.google.com/store/apps/details?id=<package.name>",
  appStore: "https://apps.apple.com/app/id<APPLE_ID>",
  macOS: "https://apps.apple.com/app/id<APPLE_ID>",
  windows: "https://apps.microsoft.com/detail/<STORE_ID>",
  web: "https://app.actionpeople.ml",
};
```

Selama sebuah URL masih mengandung `REPLACE`, tombolnya otomatis tampil sebagai
"Segera hadir" dengan `aria-disabled`, jadi tidak pernah ada tautan mati.

## Menjalankan lokal

```bash
python3 -m http.server 8000
```

Lalu buka <http://localhost:8000>.

## Sebelum publikasi

- Ganti alamat surel `halo@actionpeople.ml` dan `privasi@actionpeople.ml` dengan alamat nyata.
- Sesuaikan tanggal berlaku dan bagian retensi/pihak ketiga pada `privacy.html` dengan praktik aplikasi yang sebenarnya.
- Perbarui angka contoh pada bagian hero (ukuran paket, jumlah keypoint) dengan hasil benchmark.
