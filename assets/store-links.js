/*
 * TEMPLATE TAUTAN TOKO
 * Ganti nilai di bawah dengan URL asli. Selama masih mengandung "REPLACE",
 * tautan otomatis tampil sebagai "Segera hadir" (tanpa tautan mati).
 *
 * playStore : Play Console > Grow > Store presence > Main store listing
 *             https://play.google.com/store/apps/details?id=com.hadilomu.actionpeopleml
 * appStore  : App Store Connect > App Information > Apple ID
 *             https://apps.apple.com/app/id<APPLE_ID>
 */
window.ACTION_PEOPLE_LINKS = {
  playStore: "https://play.google.com/store/apps/details?id=REPLACE_WITH_PACKAGE_NAME",
  appStore: "https://apps.apple.com/app/idREPLACE_WITH_APPLE_ID",
};

(function () {
  var links = window.ACTION_PEOPLE_LINKS || {};
  var nodes = document.querySelectorAll("[data-store]");

  Array.prototype.forEach.call(nodes, function (el) {
    var url = links[el.getAttribute("data-store")];
    var soonText = el.getAttribute("data-soon") || "Segera hadir";

    if (url && url.indexOf("REPLACE") === -1) {
      el.setAttribute("href", url);
      el.setAttribute("rel", "noopener");
      el.setAttribute("target", "_blank");
      return;
    }

    el.removeAttribute("href");
    el.removeAttribute("target");
    el.setAttribute("aria-disabled", "true");
    el.classList.add("is-soon");
    el.textContent = soonText;
  });
})();
