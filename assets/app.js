(function () {
  var doc = document.documentElement;
  doc.classList.add("js");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var reveals = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(reveals, function (el) {
      el.classList.add("in");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    Array.prototype.forEach.call(reveals, function (el) {
      io.observe(el);
    });
  }

  var card = document.querySelector("[data-card]");

  if (card) {
    var EVENTS = {
      hardbrake: {
        scene: "cabin",
        label: "Harsh brake terdeteksi",
        alt: "Snapshot kamar kabin saat event harsh braking",
        meta: [
          ["Waktu", "14:32:07"],
          ["Kecepatan", "62 km/h"],
          ["Perlambatan", "-4,2 m/s²"],
          ["Pengemudi", "Terdeteksi"],
        ],
        hot: 3,
        feed: [
          ["14:32", "Harsh brake", "B 9821 KXD"],
          ["14:32", "Snapshot tersimpan", "1080p"],
          ["13:58", "Overspeed 8 detik", "B 9821 KXD"],
          ["11:04", "Masuk geofence", "Hub Cikarang"],
        ],
      },
      blocked: {
        scene: "blocked",
        label: "Kamera tertutup",
        alt: "Snapshot kamar kabin saat lensa kamera tertutup",
        meta: [
          ["Waktu", "09:14:52"],
          ["Durasi", "18 menit"],
          ["Cahaya masuk", "0,4%"],
          ["Pengemudi", "Tidak terbaca"],
        ],
        hot: 3,
        feed: [
          ["09:14", "Lensa tertutup", "B 9821 KXD"],
          ["09:02", "Kamera normal", "ok"],
          ["08:47", "Perjalanan dimulai", "Pool"],
          ["08:45", "Kontak kendaraan", "on"],
        ],
      },
      nodriver: {
        scene: "empty",
        label: "Kendaraan bergerak tanpa pengemudi",
        alt: "Snapshot kamar kabin saat kursi pengemudi kosong",
        meta: [
          ["Waktu", "22:41:11"],
          ["Kecepatan", "34 km/h"],
          ["Kabin", "Kosong"],
          ["Status", "Perlu tinjauan"],
        ],
        hot: 3,
        feed: [
          ["22:41", "Kabin kosong", "B 9821 KXD"],
          ["22:40", "Pintu dibuka", "kiri"],
          ["22:39", "Kendaraan bergerak", "34 km/h"],
          ["22:31", "Mesin menyala", "idle"],
        ],
      },
    };

    var shot = card.querySelector("[data-shot]");
    var metaRoot = card.querySelector("[data-meta]");
    var feedRoot = card.querySelector("[data-feed]");
    var live = card.querySelector("[data-live]");
    var buttons = card.parentNode.querySelectorAll("[data-evt]");

    function render(key) {
      var data = EVENTS[key];
      if (!data) return;

      Array.prototype.forEach.call(card.querySelectorAll("[data-scene]"), function (g) {
        g.style.display = g.getAttribute("data-scene") === data.scene ? "" : "none";
      });

      metaRoot.innerHTML = data.meta
        .map(function (row, i) {
          var cls = i === data.hot ? ' class="hot"' : "";
          return "<div><dt>" + row[0] + "</dt><dd" + cls + ">" + row[1] + "</dd></div>";
        })
        .join("");

      feedRoot.innerHTML = data.feed
        .map(function (row) {
          return (
            '<li><span class="t">' +
            row[0] +
            '</span><span class="ev">' +
            row[1] +
            "</span><span>" +
            row[2] +
            "</span></li>"
          );
        })
        .join("");

      live.textContent = data.label;
      shot.setAttribute("aria-label", data.alt);

      Array.prototype.forEach.call(buttons, function (btn) {
        btn.setAttribute(
          "aria-pressed",
          btn.getAttribute("data-evt") === key ? "true" : "false"
        );
      });
    }

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        render(btn.getAttribute("data-evt"));
      });
    });

    render("hardbrake");
  }

  var tocLinks = document.querySelectorAll(".toc a[href^='#']");

  if (tocLinks.length && "IntersectionObserver" in window) {
    var sections = [];
    Array.prototype.forEach.call(tocLinks, function (link) {
      var target = document.getElementById(link.getAttribute("href").slice(1));
      if (target) sections.push({ link: link, target: target });
    });

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          sections.forEach(function (item) {
            item.link.setAttribute(
              "aria-current",
              item.target === entry.target ? "true" : "false"
            );
          });
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(function (item) {
      spy.observe(item.target);
    });
  }
})();
