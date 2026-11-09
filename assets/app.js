// Общие функции сайта: копирование кода, окно сообщений, сохранение отметок.
(function () {
  // Кнопка «Копировать» у каждого блока кода
  document.querySelectorAll("pre").forEach(function (pre) {
    var btn = document.createElement("button");
    btn.className = "copy";
    btn.type = "button";
    btn.textContent = "Копировать";
    btn.addEventListener("click", function () {
      var text = pre.querySelector("code") ? pre.querySelector("code").innerText : pre.innerText;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = "Скопировано";
        setTimeout(function () { btn.textContent = "Копировать"; }, 1500);
      }).catch(function () { btn.textContent = "Выделите вручную"; });
    });
    pre.appendChild(btn);
  });

  // Сохранение чекбоксов с data-store
  document.querySelectorAll("input[type=checkbox][data-store]").forEach(function (box) {
    var key = "de-" + box.dataset.store;
    try { box.checked = localStorage.getItem(key) === "1"; } catch (e) {}
    box.addEventListener("change", function () {
      try { localStorage.setItem(key, box.checked ? "1" : "0"); } catch (e) {}
      document.dispatchEvent(new Event("checks-changed"));
    });
  });
})();

// Имитация MessageBox из WPF: тип error | warning | info
window.msgBox = function (type, title, text, onClose) {
  var back = document.getElementById("modal");
  if (!back) {
    back = document.createElement("div");
    back.id = "modal";
    back.className = "modal-back";
    back.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">' +
      '<div class="bar" id="modalTitle"></div><div class="body"><div class="ico"></div><div class="txt"></div></div>' +
      '<div class="foot"><button class="btn" type="button">OK</button></div></div>';
    document.body.appendChild(back);
  }
  var icons = { error: "×", warning: "!", info: "i" };
  back.querySelector(".bar").textContent = title;
  back.querySelector(".txt").textContent = text;
  var ico = back.querySelector(".ico");
  ico.className = "ico " + type;
  ico.textContent = icons[type];
  back.classList.add("show");
  var ok = back.querySelector(".foot .btn");
  ok.focus();
  ok.onclick = function () {
    back.classList.remove("show");
    if (onClose) { onClose(); }
  };
};

window.setRes = function (el, kind, text) {
  el.className = "res " + kind;
  el.textContent = text;
};

window.money = function (x) {
  return x.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
window.qty = function (x) {
  return (Math.round(x * 10000) / 10000).toLocaleString("ru-RU", { maximumFractionDigits: 4 });
};
