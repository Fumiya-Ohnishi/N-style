export default function top() {

  function getTopNewsContent() {
    const { createClient } = require("microcms-js-sdk");
    const client = createClient({
      serviceDomain: "n-style",
      apiKey: "Yjv0e625KA87l4cDg6DB6bwQT2FknFGH1GSe",
    });
    client
      .get({
        endpoint: "news",
        queries: {
          offset: 0,
          limit: 1,
        },
      })
      .then((res) => {
        for (let i = 0; i < res.contents.length; i++) {
          const newsDay = res.contents[i].publishedAt.substr(0, 10).replace(/-/g, ".");
          const newsId = res.contents[i].id;
          const newsCategory = res.contents[i].category[0];
          const newsTitle = res.contents[i].title;
          const topNewsCategory = document.getElementsByClassName("js-top-firstNews")[0];

          topNewsCategory.insertAdjacentHTML(
            "beforeend",
            `<a href="/news/news-content.html?id=${newsId}" class="news-item__link"><div class="news-item__dfn"><p class="news-item__day js-news-day">${newsDay}</p><p class="news-item__status">${newsCategory}</p></div><p class="news-item__text">${newsTitle}</p></a>`
          );
        }
      })
      .catch((err) => console.log(err));
  }

    function getNewsContent() {
      const { createClient } = require("microcms-js-sdk");
      const client = createClient({
        serviceDomain: "n-style",
        apiKey: "Yjv0e625KA87l4cDg6DB6bwQT2FknFGH1GSe",
      });
      client
        .get({
          endpoint: "news",
          queries: {
            offset: 0,
            limit: 3,
          },
        })
        .then((res) => {
          for (let i = 0; i < res.contents.length; i++) {
            const newsDay = res.contents[i].publishedAt.substr(0, 10).replace(/-/g, ".");
            const newsId = res.contents[i].id;
            const newsCategory = res.contents[i].category[0];
            const newsTitle = res.contents[i].title;
            const topNewsCategory = document.getElementsByClassName("js-top-newsList")[0];

            topNewsCategory.insertAdjacentHTML(
              "beforeend",
              `<li class="news-item"><a href="/news/news-content.html?id=${newsId}" class="news-item__link"><div class="news-item__dfn"><p class="news-item__day js-news-day">${newsDay}</p><p class="news-item__status">${newsCategory}</p></div><p class="news-item__text">${newsTitle}</p></a></li>`
            );
          }
        })
        .catch((err) => console.log(err));
    }

  const topNewsFlag = document.getElementsByClassName("js-topNews-flag");

  if (topNewsFlag.length > 0) {
    getTopNewsContent();
    getNewsContent();
  }
}
