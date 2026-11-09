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
    var STATES = {
      sleeping: {
        scene: "sleeping",
        label: "Sleeping 73%",
        alt: "Ilustrasi layar kamera dengan hasil Sleeping 73 persen",
        meta: [
          ["Status", "Sleeping"],
          ["Keyakinan", "73%"],
          ["Orang terdeteksi", "Ya"],
          ["Sumber", "Kamera"],
        ],
        hot: 1,
        feed: [
          ["Status", "Sleeping 73%", "live"],
          ["Orang", "Terdeteksi", "ya"],
          ["Model", "Siap", "lokal"],
          ["Frame", "Diproses", "di perangkat"],
        ],
      },
      drinking: {
        scene: "drinking",
        label: "Drinking 87%",
        alt: "Ilustrasi layar kamera dengan hasil Drinking 87 persen",
        meta: [
          ["Status", "Drinking"],
          ["Keyakinan", "87%"],
          ["Orang terdeteksi", "Ya"],
          ["Sumber", "Kamera"],
        ],
        hot: 1,
        feed: [
          ["Status", "Drinking 87%", "live"],
          ["Orang", "Terdeteksi", "ya"],
          ["Model", "Siap", "lokal"],
          ["Frame", "Diproses", "di perangkat"],
        ],
      },
      noperson: {
        scene: "empty",
        label: "No Person Detected",
        alt: "Ilustrasi layar kamera saat tidak ada orang di dalam frame",
        meta: [
          ["Status", "No Person Detected"],
          ["Keyakinan", "—"],
          ["Orang terdeteksi", "Tidak"],
          ["Klasifikasi", "Dilewati"],
        ],
        hot: 0,
        feed: [
          ["Status", "No Person Detected", "gate"],
          ["Orang", "Tidak ada", "tidak"],
          ["Model", "Tidak dijalankan", "hemat"],
          ["Frame", "Dilewati", "di perangkat"],
        ],
      },
    };

    var shot = card.querySelector("[data-shot]");
    var metaRoot = card.querySelector("[data-meta]");
    var feedRoot = card.querySelector("[data-feed]");
    var live = card.querySelector("[data-live]");
    var buttons = card.parentNode.querySelectorAll("[data-state]");

    function render(key) {
      var data = STATES[key];
      if (!data) return;

      Array.prototype.forEach.call(card.querySelectorAll("[data-scene]"), function (g) {
        var shown = g.getAttribute("data-scene") === data.scene;
        g.style.display = shown ? "inline" : "none";
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
          btn.getAttribute("data-state") === key ? "true" : "false"
        );
      });
    }

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        render(btn.getAttribute("data-state"));
      });
    });

    render("sleeping");
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
