import $ from "jquery";

export default function news() {
  let offsetNum = sessionStorage.setItem("offsetNum", 0);
  let newsList = $(".js-news-list");
  let numberOfProcesses = false;
  let postSearchProcessingTimes = false;
  let offsetNumFlag = false;
  let deleteFlag = false;
  let categoryTtl;
  let numberOfAcvtiveButton;
  let activeChack = document.getElementsByClassName("js-activeChack");
  let paginationBtn = document.getElementsByClassName("js-paginationBtn");
  let activeChackSearch = document.getElementsByClassName("js-activeChackSearch");
  let numberOfButtons = document.getElementsByClassName("newsList-pagination__btn");
  let loadingClass = document.getElementsByClassName("js-loading");

  //microCMSのデータを全て取得
  function getNewsContent() {
    offsetNum = sessionStorage.getItem("offsetNum", offsetNum);
    loadingClass[0].classList.add("is-active");

    const { createClient } = require("microcms-js-sdk");
    const client = createClient({
      serviceDomain: "n-style",
      apiKey: "Yjv0e625KA87l4cDg6DB6bwQT2FknFGH1GSe",
    });
    client
      .get({
        endpoint: "news",
        queries: {
          offset: offsetNum,
          limit: 10,
        },
      })
      .then((res) => {
        console.log(res)
        loadingClass[0].classList.remove("is-active");
        for (let i = 0; i < res.contents.length; i++) {
          const newsDay = res.contents[i].publishedAt.substr(0, 10).replace(/-/g, ".");
          const newsId = res.contents[i].id;
          const newsCategory = res.contents[i].category[0];
          const newsTitle = res.contents[i].title;

          newsList.append(
            `<li class="news-item"><a href="/news/news-content.html?id=${newsId}" class="news-item__link"><div class="news-item__dfn"><p class="news-item__day js-news-day">${newsDay}</p><p class="news-item__status">${newsCategory}</p></div><p class="news-item__text">${newsTitle}</p></a></li>`
          );
        }

        // ページネーションのボタン追加(初回のみ)
        if (numberOfProcesses === false) {
          paginationBtn[0].innerHTML += `<button type="button" class="newsList-pagination__btn is-active js-activeChack" disabled>1</button>`;

          const pageNum = Math.floor(res.totalCount / res.limit);

          for (let i = 1; i <= pageNum; i++) {
            paginationBtn[0].innerHTML += `<button type="button" class="newsList-pagination__btn js-activeChack">${
              i + 1
            }</button>`;
          }

          if (numberOfButtons.length > 1) {
            paginationBtn[0].innerHTML += `<button type="button" class="newsList-pagination__btn newsList-pagination__btn--arrow js-arrowBtn"></button>`;
          }

          numberOfProcesses = true;
        }
      })
      .catch((err) => {
        console.log(err);
        loadingClass[0].classList.remove("is-active");
        newsList.append('<p class="news-item__err">エラーが起こりました。</p>');
      });
  }

  // ページネーションボタンクリック処理

  if (!paginationBtn[0]) {
    return false;
  }
  paginationBtn[0].addEventListener("click", (e) => {

    const btnFlad = e.target.classList.contains("js-activeChack");
    const arrowFlag = e.target.classList.contains("js-arrowBtn");
    const arrowSearchBtn = e.target.classList.contains("js-arrowSearchBtn");

    if (arrowFlag) {
      offsetNum = Number(sessionStorage.getItem("offsetNum", offsetNum)) + 10;
      sessionStorage.setItem("offsetNum", offsetNum);

      numberOfAcvtiveButton = (Number(sessionStorage.getItem("offsetNum", offsetNum)) + 10) / 10;

      deleteList();
      scrollTop();
      deleteClass();
      addClass(numberOfAcvtiveButton);
      return false;
    }

    if (arrowSearchBtn) {
      offsetNum = Number(sessionStorage.getItem("offsetNum", offsetNum)) + 10;
      sessionStorage.setItem("offsetNum", offsetNum);

      numberOfAcvtiveButton = (Number(sessionStorage.getItem("offsetNum", offsetNum)) + 10) / 10;

      deleteFlag = false;

      searchDeleteList(deleteFlag);
      searchDeleteClass();
      searchAddClass(numberOfAcvtiveButton);
      return false;
    }

    if (btnFlad) {
      numberOfAcvtiveButton = e.target.innerHTML;
      offsetNum = numberOfAcvtiveButton * 10 - 10;
      sessionStorage.setItem("offsetNum", offsetNum);

      deleteList();
      scrollTop();
      deleteClass();
      addClass(numberOfAcvtiveButton);
    } else {
      numberOfAcvtiveButton = e.target.innerHTML;
      offsetNum = numberOfAcvtiveButton * 10 - 10;
      sessionStorage.setItem("offsetNum", offsetNum);

      searchDeleteList(deleteFlag);
      scrollTop();
      searchDeleteClass();
      searchAddClass(numberOfAcvtiveButton);
    }
  });

  // 存在するお知らせのリストを削除
  const deleteList = () => {
    newsList.empty();
    getNewsContent();
  };

  // ページトップにスライド
  const scrollTop = () => {
    window.scrollTo({ top: 1, behavior: "smooth" });
  };

  // ボタンのクラス削除
  const deleteClass = () => {
    for (let i = 0; i < activeChack.length; i++) {
      if (activeChack[i].classList.contains("is-active")) {
        activeChack[i].classList.remove("is-active");
        activeChack[i].disabled = false;
      } else {
        continue;
      }
    }
  };

  // ボタンのクラス追加
  const addClass = (numberOfAcvtiveButton) => {
    activeChack[numberOfAcvtiveButton - 1].classList.add("is-active");
    activeChack[numberOfAcvtiveButton - 1].disabled = true;

    // ページネーションのボタンの最後の要素にis-activeがついたら矢印にdisabledをつける
    const arrowBtn = document.getElementsByClassName("js-arrowBtn")[0];
    if (arrowBtn.previousElementSibling.classList.contains("is-active") == true) {
      arrowBtn.disabled = true;
    } else {
      arrowBtn.disabled = false;
    }
  };

  const serachCategory = document.getElementsByClassName("js-serachCategory");
  for (let i = 0; i < serachCategory.length; i++) {
    serachCategory[i].onclick = function () {
      sessionStorage.setItem("offsetNum", 0);
      categoryTtl = this.innerHTML;

      for (let i = 0; i < serachCategory.length; i++) {
        if (serachCategory[i].classList.contains("is-active")) {
          serachCategory[i].classList.remove("is-active");
          serachCategory[i].disabled = false;
        } else {
          continue;
        }
      }

      this.classList.add("is-active");
      // セッションにカテゴリ名を保存
      sessionStorage.setItem("categoryTtl", categoryTtl);

      postSearchProcessingTimes = false;
      offsetNumFlag = false;

      if (categoryTtl.trim() === "すべて") {
        numberOfProcesses = false;
        searchDeleteList();
        searchBeforeDeleteBtn();
        getNewsContent(numberOfProcesses);
        return false;
      }
      searchDeleteList();
      searchBeforeDeleteBtn();
      serachCategoryList(postSearchProcessingTimes, offsetNumFlag);
    };
  }

  function serachCategoryList() {
    loadingClass[0].classList.add("is-active");

    categoryTtl = sessionStorage.getItem("categoryTtl").trim();
    offsetNum = sessionStorage.getItem("offsetNum");
    if (offsetNumFlag === false) {
      offsetNum = 0;
      offsetNumFlag = true;
    }

    console.log("カテゴリーは",categoryTtl)

    const { createClient } = require("microcms-js-sdk");
    const client = createClient({
      serviceDomain: "n-style",
      apiKey: "Yjv0e625KA87l4cDg6DB6bwQT2FknFGH1GSe",
    });
    client
      .get({
        endpoint: "news",
        queries: {
          offset: offsetNum,
          limit: 10,
          filters: `category[contains]${categoryTtl}`,
        },
      })
      .then((res) => {
        loadingClass[0].classList.remove("is-active");

        for (let i = 0; i < res.contents.length; i++) {
          const newsDay = res.contents[i].publishedAt.substr(0, 10).replace(/-/g, ".");
          const newsId = res.contents[i].id;
          const newsCategory = res.contents[i].category[0];
          const newsTitle = res.contents[i].title;

          newsList.append(
            `<li class="news-item"><a href="/news/news-content.html?id=${newsId}" class="news-item__link"><div class="news-item__dfn"><p class="news-item__day js-news-day">${newsDay}</p><p class="news-item__status">${newsCategory}</p></div><p class="news-item__text">${newsTitle}</p></a></li>`
          );
        }

        // ページネーションのボタン追加(初回のみ)
        if (postSearchProcessingTimes === false) {
          const pageNum = Math.floor(res.totalCount / res.limit);

          paginationBtn[0].innerHTML += `<button type="button" class="newsList-pagination__btn is-active js-activeChackSearch" disabled>1</button>`;

          for (let i = 1; i <= pageNum; i++) {
            paginationBtn[0].innerHTML += `<button type="button" class="newsList-pagination__btn js-activeChackSearch">${
              i + 1
            }</button>`;
          }

          if (numberOfButtons.length > 1) {
            paginationBtn[0].innerHTML += `<button type="button" class="newsList-pagination__btn newsList-pagination__btn--arrow js-arrowSearchBtn"></button>`;
          }

          postSearchProcessingTimes = true;
        }
      })
      .catch((err) => {
        console.log(err);
        loadingClass[0].classList.remove("is-active");
        newsList.append('<p class="news-item__err">エラーが起こりました。</p>');
      });
  }

  // ソート前のボタンをすべて削除
  const searchBeforeDeleteBtn = () => {
    while (paginationBtn[0].firstChild) {
      paginationBtn[0].removeChild(paginationBtn[0].firstChild);
    }
  };

  // ソート後の存在するお知らせのリストを削除
  const searchDeleteList = (deleteFlag) => {
    while (newsList[0].firstChild) {
      newsList[0].removeChild(newsList[0].firstChild);
    }
    if (deleteFlag === false) {
      serachCategoryList();
    }
  };

  // ソート後のボタンのクラス削除
  const searchDeleteClass = () => {
    for (let i = 0; i < activeChackSearch.length; i++) {
      if (activeChackSearch[i].classList.contains("is-active")) {
        activeChackSearch[i].classList.remove("is-active");
        activeChackSearch[i].disabled = false;
      } else {
        continue;
      }
    }
  };

  // ソート後のボタンのクラス追加
  const searchAddClass = (numberOfAcvtiveButton) => {
    activeChackSearch[numberOfAcvtiveButton - 1].classList.add("is-active");
    activeChackSearch[numberOfAcvtiveButton - 1].disabled = true;

    // ページネーションのボタンの最後の要素にis-activeがついたら矢印にdisabledをつける
    const arrowBtn = document.getElementsByClassName("js-arrowSearchBtn")[0];
    if (arrowBtn.previousElementSibling.classList.contains("is-active") == true) {
      arrowBtn.disabled = true;
    } else {
      arrowBtn.disabled = false;
    }
  };

  const newsListFlag = document.getElementsByClassName("js-newsList-flag");
  if (newsListFlag.length) {
    getNewsContent();
  }
}
