# Action People ML — Landing Page

Situs pemasaran statis untuk **Action People ML**, modul penglihatan on-device
untuk armada telematics. Dibangun dengan HTML, CSS, dan JavaScript tanpa build step.

## Posisi produk

Telemetri armada sudah mengukur kecepatan, lokasi, dan akselerasi. Yang tidak
terukur adalah apa yang terjadi di dalam kabin. Modul ini menambahkan lapisan
penglihatan yang berjalan **di dalam kendaraan**, dan hanya mengirim event serta
snapshot terpilih. Video tidak pernah diunggah.

Halaman menjual dalam tiga lapis sesuai kesiapan:

| Lapis | Isi | Status |
|---|---|---|
| 1 | Snapshot per event telemetri, integritas kamera, keberadaan pengemudi | Tersedia |
| 2 | Sinyal distraksi: makan, minum, telepon | Pilot |
| 3 | Kelelahan pengemudi | Roadmap, belum dirilis |

## Struktur

```
index.html        Landing page
privacy.html      Kebijakan privasi
assets/
  styles.css      Design system, layout, responsive, print
  app.js          Panel event interaktif, scroll reveal, penanda daftar isi
  mark.svg        Logo mark
  og.png          Gambar Open Graph 1200x630
robots.txt        Aturan crawler
sitemap.xml       Sitemap
```

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
edit langsung di editor gambar atau desain ulang dari file sumber desain.
Tidak ada skrip pembuat gambar di repo ini.

## Sebelum publikasi

- Ganti alamat surel `halo@actionpeople.ml` dan `privasi@actionpeople.ml`.
- Sesuaikan tanggal berlaku serta bagian retensi dan pihak ketiga pada `privacy.html`.
- Pastikan klaim di halaman sesuai dengan kemampuan modul saat dirilis. Fitur Lapis 3
  sengaja diberi label "belum tersedia" agar tidak menjadi klaim yang tidak bisa dibuktikan.
