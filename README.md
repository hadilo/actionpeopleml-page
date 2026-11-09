# Action People ML — Landing Page

Situs statis untuk **Action People ML**, aplikasi kamera Android dan iOS.
Dibangun dengan HTML, CSS, dan JavaScript tanpa build step.

## Posisi produk

Aplikasi membaca satu frame kamera dan mengklasifikasikannya sebagai
**Sleeping** atau **Drinking**, lengkap dengan persentase keyakinan. Model
tertanam di dalam aplikasi dan inferensi berjalan di perangkat, sehingga frame
kamera tidak pernah diunggah.

Yang dijual di halaman adalah fitur yang benar-benar ada di aplikasi:

| Fitur | Status |
|---|---|
| Klasifikasi kamera langsung dengan persentase keyakinan | Ada |
| Person gate: klasifikasi dilewati bila tidak ada orang | Ada |
| Rekaman 720p maksimal 60 detik, tanpa audio, ke galeri | Ada |
| Klasifikasi foto dari galeri sebagai alternatif kamera | Ada |
| Inferensi di desktop dan web | Belum ada, status tidak didukung |

Aplikasi ini bukan alat medis dan tidak membuat keputusan keselamatan sendiri.
Batas itu dinyatakan eksplisit di halaman, FAQ, dan kebijakan privasi.

## Struktur

```
index.html            Landing page
privacy.html          Kebijakan privasi
assets/
  styles.css          Design system, layout, responsive, print
  app.js              Panel status interaktif, scroll reveal, penanda daftar isi
  store-links.js      Template URL toko aplikasi
  mark.svg            Logo mark
  og.png              Gambar Open Graph 1200x630
robots.txt            Aturan crawler
sitemap.xml           Sitemap
```

## Mengisi tautan toko

Semua tautan unduhan berada di satu tempat: `assets/store-links.js`.

```js
window.ACTION_PEOPLE_LINKS = {
  playStore: "https://play.google.com/store/apps/details?id=com.hadilomu.actionpeopleml",
  appStore: "https://apps.apple.com/app/id<APPLE_ID>",
};
```

Selama sebuah URL masih mengandung `REPLACE`, tautannya tampil sebagai
"Segera hadir" dengan `aria-disabled`, jadi tidak pernah ada tautan mati.

## SEO

- Meta title, description, dan keywords per halaman.
- Canonical URL dan Open Graph/Twitter Card lengkap.
- Structured data JSON-LD: `Organization`, `SoftwareApplication`, `FAQPage`.
- `robots.txt` dan `sitemap.xml`.
- Heading hierarkis, alt text, dan tabel semantik.
- FAQ memakai `<details>` sehingga jawabannya ada di HTML, bukan hanya di JavaScript.

Sebelum publikasi di domain sendiri, ganti seluruh URL
`https://hadilo.github.io/actionpeopleml-page/` pada `index.html`, `privacy.html`,
`sitemap.xml`, dan `robots.txt` dengan domain final.

## Menjalankan lokal

Buka `index.html` langsung di browser, atau layani dengan server statis apa pun:

```bash
npx serve .
```

Tidak ada dependency, tidak ada build step.

## Gambar Open Graph

`assets/og.png` adalah artefak desain 1200x630 yang sudah jadi. Untuk mengubahnya,
edit langsung di editor gambar. Tidak ada skrip pembuat gambar di repo ini.

## Sebelum publikasi

- Ganti alamat surel `halo@actionpeople.ml` dan `privasi@actionpeople.ml`.
- Sesuaikan tanggal berlaku serta bagian izin dan pihak ketiga pada `privacy.html`.
- Jaga agar isi halaman tetap sama dengan kemampuan aplikasi yang dirilis. Jangan
  menambahkan klaim fitur yang belum ada di build, karena itu bisa memicu
  pelanggaran metadata di Play Store.
