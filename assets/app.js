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

  var demo = document.querySelector("[data-demo]");

  if (demo) {
    var POSE = {
      tegak: {
        label: "Tegak",
        bars: [
          ["Berdiri", 96],
          ["Berjalan", 4],
          ["Jongkok", 0],
          ["Melompat", 0],
        ],
        log: [
          ["00:12", "Berdiri", "96%"],
          ["00:09", "Pose stabil", "97%"],
          ["00:04", "Kamera siap", "ok"],
          ["00:00", "Sesi dimulai", "id"],
        ],
      },
      jongkok: {
        label: "Jongkok",
        bars: [
          ["Jongkok", 91],
          ["Berdiri", 8],
          ["Berjalan", 1],
          ["Melompat", 0],
        ],
        log: [
          ["00:18", "Jongkok", "91%"],
          ["00:14", "Pose stabil", "88%"],
          ["00:07", "Transisi", "12%"],
          ["00:00", "Sesi dimulai", "id"],
        ],
      },
      lompat: {
        label: "Lompat",
        bars: [
          ["Melompat", 84],
          ["Berjalan", 11],
          ["Berdiri", 5],
          ["Jongkok", 0],
        ],
        log: [
          ["00:23", "Melompat", "84%"],
          ["00:20", "Titik puncak", "79%"],
          ["00:11", "Berjalan", "62%"],
          ["00:00", "Sesi dimulai", "id"],
        ],
      },
    };

    var barsRoot = demo.querySelector("[data-bars]");
    var logRoot = demo.querySelector("[data-log]");
    var live = demo.querySelector("[data-live]");
    var stage = demo.querySelector("[data-stage]");
    var buttons = demo.querySelectorAll("[data-pose]");

    function render(key) {
      var data = POSE[key];
      if (!data) return;

      stage.setAttribute("data-current", key);
      Array.prototype.forEach.call(stage.querySelectorAll("[data-shape]"), function (g) {
        g.style.display = g.getAttribute("data-shape") === key ? "" : "none";
      });

      barsRoot.innerHTML = data.bars
        .map(function (row) {
          return (
            '<li><span>' +
            row[0] +
            '</span><span class="d-bar"><i style="width:' +
            row[1] +
            '%"></i></span><span class="d-val">' +
            row[1] +
            "%</span></li>"
          );
        })
        .join("");

      logRoot.innerHTML = data.log
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

      if (live) {
        live.textContent = "Aksi: " + data.label;
      }

      Array.prototype.forEach.call(buttons, function (btn) {
        btn.setAttribute(
          "aria-pressed",
          btn.getAttribute("data-pose") === key ? "true" : "false"
        );
      });

      if (stage) {
        stage.setAttribute(
          "aria-label",
          "Pratinjau deteksi pose, aksi terdeteksi: " + data.label
        );
      }
    }

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        render(btn.getAttribute("data-pose"));
      });
    });

    render("tegak");
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
