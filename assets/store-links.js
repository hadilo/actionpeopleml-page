/*
 * TEMPLATE TOKO APLIKASI
 * Ganti nilai di bawah dengan URL asli. Selama masih mengandung "REPLACE",
 * tombol otomatis tampil sebagai "Segera hadir" (tidak ada tautan mati).
 *
 * playStore : Play Console > Grow > Store presence > Main store listing
 *             https://play.google.com/store/apps/details?id=<package.name>
 * appStore  : App Store Connect > App Information > Apple ID
 *             https://apps.apple.com/app/id<APPLE_ID>
 * macOS     : App Store Connect (macOS app), gunakan Apple ID yang sama
 *             https://apps.apple.com/app/id<APPLE_ID>
 * windows   : Partner Center > Product identity
 *             https://apps.microsoft.com/detail/<STORE_ID>
 * web       : URL aplikasi web (PWA) kamu
 */
window.ACTION_PEOPLE_LINKS = {
  playStore: "https://play.google.com/store/apps/details?id=REPLACE_WITH_PACKAGE_NAME",
  appStore: "https://apps.apple.com/app/idREPLACE_WITH_APPLE_ID",
  macOS: "https://apps.apple.com/app/idREPLACE_WITH_APPLE_ID",
  windows: "https://apps.microsoft.com/detail/REPLACE_WITH_STORE_ID",
  web: "https://app.actionpeople.ml",
};

(function () {
  var links = window.ACTION_PEOPLE_LINKS || {};
  var nodes = document.querySelectorAll("[data-store]");

  Array.prototype.forEach.call(nodes, function (el) {
    var url = links[el.getAttribute("data-store")];

    if (url && url.indexOf("REPLACE") === -1) {
      el.setAttribute("href", url);
      el.setAttribute("rel", "noopener");
      if (el.hasAttribute("data-external")) {
        el.setAttribute("target", "_blank");
      }
      return;
    }

    el.removeAttribute("href");
    el.removeAttribute("target");
    el.setAttribute("aria-disabled", "true");
    el.classList.add("is-soon");
    el.textContent = "Segera hadir";
  });
})();
