async function getArticles() {
  var selected = '';
  var ele = document.getElementsByName('btnradio');
  for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
          selected = ele[i].getAttribute("value")
      }
  }
  const urlBase = "http://localhost:9090/api";
  const listarticles = document.getElementById("articles");
  let texto = "";
  var myHeaders = new Headers();

  var myInit = { methor: "GET", headers: myHeaders };

  var myRequest = new Request(`${urlBase}/news`, myInit);

  await fetch(myRequest).then(async function (response) {
      if (!response.ok) {
          listarticles.innerHTML =
              "Não encontro noticias para apresentar!";
      } else {
          articles = await response.json();
          listarticles.innerHTML = "";
          for (const article of articles) {
              texto += `  
              <div class="card border-info mb-3 d-flex justify-content-center">
                  <div class="col">
                  <br>
                  <div class="card">
                  <div class="card-body">
                  <h5 style="font-size: 20px;" class="card-title">${article.title}</h5>
                  <br><br><br>
                  <p class="card-text"><button style="font-size: 20px;" type="button" class="btn outline-primary"><a href="${article.url}">Go to site</a></button></p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`;
          }
          listarticles.innerHTML = texto;
      }
  });
};

