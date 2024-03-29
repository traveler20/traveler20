// ──────────────────────────────
// dark mode
// ──────────────────────────────
// 要素やクラスを指定しておく
const checkToggle = document.getElementById("js_mode_toggle");
const rotateIcon = document.getElementById("js_rotate");
const classLight = "is_light";

// デバイスがライトモードかどうかチェック
const isLight = window.matchMedia("(prefers-color-scheme: light)").matches;

// ローカルストレージに保存するための適当なKey名
const keyLocalStorage = "whike-theme-mode";

// ローカルストレージの情報を取得
const localTheme = localStorage.getItem(keyLocalStorage);

// 絵文字を回転させる角度
let nowRotate = 0;

// ローカルストレージの中身と、端末がライトモードかどうか（ie,edgeには無意味）をチェック
if (localTheme === "light") {
  // ローカルストレージの情報が優先
  rotateInfinite();
  changeMode("light");
} else if (localTheme === "dark") {
  changeMode("dark");
} else if (isLight) {
  rotateInfinite();
  changeMode("light");
}

// チェックボックスでの切り替え、選択をローカルストレージに保存
// モード切替スイッチが変更されたら発動
checkToggle.addEventListener("change", function (e) {
  // 絵文字大回転
  rotateInfinite();

  // チェックされたらライトモード、されなければダークモードにし、ローカルストレージにどちらを選んだか保存する
  if (e.target.checked) {
    changeMode("light");
    localStorage.setItem(keyLocalStorage, "light");
  } else {
    changeMode("dark");
    localStorage.setItem(keyLocalStorage, "dark");
  }
});

/**
 * テーマ切り替え
 * @param {String} mode 'light' もしくは 'dark'
 */
function changeMode(mode) {
  // 引数にしたがってbodyにクラスをつける
  // チェックボックス経由で変更かかったときはいいんだけど、ローカルストレージとかからモードを変えた場合にチェック状態がおかしくなるので、合わせておく
  if (mode === "light") {
    document.body.classList.add(classLight);
    checkToggle.checked = true;
  } else if (mode === "dark") {
    document.body.classList.remove(classLight);
    checkToggle.checked = false;
  }
}

/**
 * 月と太陽アイコン無限回転
 * 呼ばれるたびに180度角度が追加されていく
 */
function rotateInfinite() {
  nowRotate += 180;
  rotateIcon.style.transform = "rotate(" + nowRotate + "deg)";
}

// ──────────────────────────────
// parameter
// ───────────────
// ?checked=tab2 で表示
// ──────────────────────────────
const url =
  location.protocol +
  "//" +
  location.host +
  location.pathname +
  location.search;
const param = url.split("?");
const params = param.length > 1 && param[1].split("&");
const paramArray = [];
for (let i = 0; i < params.length; i++) {
  const parameters = params[i].split("=");
  paramArray.push(parameters[0]);
  paramArray[parameters[0]] = parameters[1];

  const input = decodeURIComponent(parameters[1]);

  document.getElementById(input).setAttribute("checked", "");
}

//
const tabs = document.querySelectorAll(".js-tab-button");
function tabSwitch() {
  let tabsArray = Array.prototype.slice.call(tabs);
  let index = tabsArray.indexOf(this);
  const resetTab = function () {
    document
      .querySelector(".js-tab-button.is-active")
      .classList.remove("is-active");
    document
      .querySelector(".js-tab-button[aria-selected=true]")
      .removeAttribute("aria-selected");
    document.querySelectorAll(".js-tab-button").forEach((elm) => {
      elm.tabIndex = -1;
    });
    document
      .querySelector(".js-tab-panel.is-active")
      .classList.remove("is-active");
  };
  const setTab = function (tab, tabpanel) {
    tab.classList.add("is-active");
    tab.tabIndex = 0;
    tab.setAttribute("aria-selected", true);
    tabpanel.classList.add("is-active");
  };
  if (event.type == "keyup") {
    if (event.key === "ArrowRight") {
      if (tabsArray[index + 1]) {
        tabsArray[index + 1].focus();
        resetTab();
        setTab(
          tabsArray[index + 1],
          document.querySelectorAll(".js-tab-panel")[index + 1]
        );
      } else {
        tabsArray[0].focus();
        resetTab();
        setTab(tabsArray[0], document.querySelectorAll(".js-tab-panel")[0]);
      }
    }
    if (event.key === "ArrowLeft") {
      if (tabsArray[index - 1]) {
        tabsArray[index - 1].focus();
        resetTab();
        setTab(
          tabsArray[index - 1],
          document.querySelectorAll(".js-tab-panel")[index - 1]
        );
      } else {
        let lastTab = tabsArray.pop();
        lastTab.focus();
        resetTab();
        setTab(
          lastTab,
          Array.prototype.slice
            .call(document.querySelectorAll(".js-tab-panel"))
            .pop()
        );
      }
    }
  }
  if (event.type == "click") {
    resetTab();
    setTab(this, document.querySelectorAll(".js-tab-panel")[index]);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", tabSwitch);
  tab.addEventListener("keyup", tabSwitch);
});
