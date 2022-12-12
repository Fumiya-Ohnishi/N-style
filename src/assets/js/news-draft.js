import $ from "jquery";

export default function newsDraft() {
  let loadingClass = document.getElementsByClassName("js-loading");
  let urlId = getParam("id");
  let urlDraftKey = getParam("draftKey");

  // URL分割処理
  function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function getNewsContent() {
    loadingClass[0].classList.add("is-active");

    const { createClient } = require("microcms-js-sdk");
    const client = createClient({
      serviceDomain: "n-style",
      apiKey: "Yjv0e625KA87l4cDg6DB6bwQT2FknFGH1GSe",
    });
    client
      .get({
        endpoint: "news",
        contentId: urlId,
        queries: { draftKey: urlDraftKey },
      })
      .then((res) => {
        loadingClass[0].classList.remove("is-active");

        const newsContent = document.getElementsByClassName("js-news-content");
        const newsContentDay = document.getElementsByClassName("js-newsContent-day");
        const newsContentStatus = document.getElementsByClassName("js-newsContent-status");
        const newsContentTtl = document.getElementsByClassName("js-newsContent-ttl");
        const newsContentStatusText = res.category;
        const newsContentTtlText = res.title;

        newsContent[0].innerHTML = res.content;
        newsContentStatus[0].innerText = newsContentStatusText;
        newsContentTtl[0].innerText = newsContentTtlText;
      })
      .catch((err) => {
        console.log(err);
        loadingClass[0].classList.remove("is-active");

        const newsContent = document.getElementsByClassName("js-news-content");
        newsContent[0].innerHTML = '<p class="news-item__err">エラーが起こりました。</p>';
      });
  }

  const actionFlag = document.getElementsByClassName("js-newsdraft-flag");
  if (actionFlag.length) {
    getNewsContent();
  }
}
