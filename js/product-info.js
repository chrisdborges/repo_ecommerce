CommentsArray = [];
ProductArray = [];
RelatedProductArray = [];
const ORDER_DESC_BY_DATE = "Date";

function sortComments(criteria) {
    let result = [];
    if (criteria === ORDER_DESC_BY_DATE) {
        result = CommentsArray.sort(function (a, b) {
            if (a.dateTime < b.dateTime) { return -1; }
            if (a.dateTime > b.dateTime) { return 1; }
            return 0;
        });
    }
    return result;
}

function showProduct() {
    htmlContentToAppend = `
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center"> <b> ${ProductArray.name}  </b></h3> 
                    
                </div>    
                <img class="col-3" src="${ProductArray['images'][0]}"></img>
                <img class="col-3" src="${ProductArray['images'][1]}"></img>
                <img class="col-3" src="${ProductArray['images'][2]}"></img>
                <img class="col-3" src="${ProductArray['images'][3]}"></img>
                <hr style="width: 90%;">
                <div class="col-12">
                    <h5>${ProductArray.description}</h5>
                </div>
                <hr style="width: 90%;">
                <div style="align-items:center" class="d-flex justify-content-center flex-column text-center col-12 ">
                    <h5>Precio: <b>${ProductArray.cost} ${ProductArray.currency}</b></h5>
                    <h5>${ProductArray.soldCount} Vendidos! </h5>
                    <div><button class="btn btn-lg btn-primary btn-block">Comprar</button></div>
                </div>
                <hr style="width: 90%;">
                <br>                
            </div>     
        </a>
    `
    document.getElementById("product-list").innerHTML = htmlContentToAppend;
    showRelatedProducts()
}


function showComments() {
    htmlContentToAppend = "";
    for (let i = 0; i < CommentsArray.length; i++) {
        let comment = CommentsArray[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-12">
                        <h7 class="ml-2"> <b>${comment.user}</b></h7>     <small class="text-muted ml-2 fas fa-clock"> ${comment.dateTime}</small>              
                    </div>
                    <div class="col-12">
                        <p class="ml-4 pl-5 col-12">${comment.description}</p>
                        <div class="ml-4 pl-5"> 
        `
        for (let i = 1; i <= comment.score; i++) {
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            htmlContentToAppend += `<span class="fa fa-star"></span>`;
        }

        htmlContentToAppend +=
            `
                        </div>
                    </div>
                </div>
        </div>
        `
        document.getElementById("comments-container").innerHTML = htmlContentToAppend;
    }
}

function limpiarCampos() {
    if (localStorage.getItem('User-Logged')) {
        for (i = 1; i <= 5; i++) {
            document.getElementById(i).classList.remove('checked');
            document.getElementById(i).classList.add('unchecked');
        }
    }
    document.getElementById('comentario').value = "";
}

function showCommentBox() {
    document.getElementById("comment-container").innerHTML = `
    <div class="list-group-item ">
          <div class="row">
              <h2>Contanos tu experiencia</h2>
              <textarea type="text" id="comentario" class="form-control" placeholder="Qué te parece este producto?" required autofocus></textarea>
              <hr style="width: 95%;">
              <div class="col-12 justify-content-around align-items-center">
                <fieldset style="float:left">
                  <legend>Puntua</legend>
                  <span class="fa fa-star unchecked" id="1"></span>
                  <span class="fa fa-star unchecked" id="2"></span>
                  <span class="fa fa-star unchecked" id="3"></span>
                  <span class="fa fa-star unchecked" id="4"></span>
                  <span class="fa fa-star unchecked" id="5"></span>
                </fieldset>
              <div style="float:right" class="align-items-center"><button class="btn btn-lg btn-primary btn-block" id="comentar">Comentar</button></div> 
              </div>
          </div>
        </div>
    `
    document.getElementById("comment-container").style = "display:block";
}
function showRelatedProducts() {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsArray = resultObj.data;
            ProductArray.relatedProducts.forEach(function (id) {
                document.getElementById("related-products").innerHTML += `
                <a href="product-info.html" class: "d-flex w-100 justify-content-between">
                    <div class="col-3">
                        <img src="${ProductsArray[id].imgSrc}"class="img-thumbnail">  
                        <p class="text-center"
                    </div>  
                    <div>
                    <h4 class="text-center">${ProductsArray[id].name}</h4>
                        <p class="text-center">${ProductsArray[id].cost}${ProductsArray[id].currency}</p>
                    </div>
                </a>
                `
            });

        }
    });
}


document.addEventListener("DOMContentLoaded", function (e) {

    if (localStorage.getItem('User-Logged')) {
        showCommentBox();
    };

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            CommentsArray = resultObj.data;
            sortAndShowComments(ORDER_DESC_BY_DATE);
        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductArray = resultObj.data;
            showProduct();
        }
    });

    function sortAndShowComments(sortCriteria) {
        CommentsArray = sortComments(sortCriteria);
        showComments();
    }

    var list = ['1', '2', '3', '4', '5'];
    list.forEach(function (element) {
        document.getElementById(element).addEventListener('click', function () {

            var id = document.getElementById(element).id;
            var cls = document.getElementById(element).className;

            if (cls.includes('unchecked')) {

                document.getElementById(element).classList.remove('unchecked');
                document.getElementById(element).classList.add('checked');

                for (i = 1; i <= id; i++) {
                    document.getElementById(i).classList.remove('unchecked');
                    document.getElementById(i).classList.add('checked');
                }
            } else {

                document.getElementById(element).classList.remove('checked');
                document.getElementById(element).classList.add('unchecked');

                for (i = 5; i >= id; i--) {
                    document.getElementById(i).classList.remove('checked');
                    document.getElementById(i).classList.add('unchecked');
                }
            }
        });
    });

    document.getElementById('comentar').addEventListener('click', function () {

        if (localStorage.getItem('User-Logged')) {
            let now = new Date()
            let dateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

            var score = document.getElementById('comment-container').getElementsByClassName('checked').length;
            if (score == 0) {
                score = 1;
            } else if (score > 5) {
                score = 5;
            }

            let newComment = {
                user: localStorage.getItem('User-Logged'),
                score: score,
                description: document.getElementById('comentario').value,
                dateTime: dateTime
            }

            CommentsArray.push(newComment);
            showComments();
            limpiarCampos();

        } else {
            alert("Debes estar logueado para comentar este producto");
        }

    });

});