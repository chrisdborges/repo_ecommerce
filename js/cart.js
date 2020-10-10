var currency = "USD";


function showCart() {

    $('#cart-table-list').empty();

    let cartInfo = JSON.parse(localStorage.getItem('Cart'));

    for (let i = 0; i < cartInfo.articles.length; i++) {
        let product = cartInfo.articles[i];
        let content = '';

        if (product.currency != currency) {
            if (product.currency == "UYU") {
                product.unitCost = parseFloat(product.unitCost / 43).toFixed(2);
            } else {
                product.unitCost = parseInt(product.unitCost * 43).toFixed(1);
            };
            product.currency = currency;
        }

        content = `
        <tr class="text-center">
            <td>
                <img class="img-fluid" src="${product.src}" alt="${product.name}">
            </td>
            <td>
                ${product.name}
            </td>
            <td>
                ${product.currency} ${product.unitCost} 
            </td>
            <td>
                <button onclick="this.parentNode.querySelector('input[type=number]').stepDown();subTotal(${i},${product.unitCost});">-</button>
                <input id="quantityCart${i}" class="quantity cant" min="1" max="999" name="quantity" onchange="subTotal(${i},${product.unitCost});" value="${product.count}" type="number">
                <button onclick="this.parentNode.querySelector('input[type=number]').stepUp();subTotal(${i},${product.unitCost});">+</button>
            </td>
            <td id="summary${i}">
                ${currency} ${(product.unitCost * product.count).toFixed(2)} 
            </td>
            <td>
                <button type="button" class="btn btn-dark">Eliminar</button>
            </td>

        </tr>       
        `;
        $('#cart-table-list').append(content);
    }
    totalProducts();
}



function subTotal(i, unitCost) {
    document.getElementById("summary" + i).textContent = currency + ' ' + (document.getElementById('quantityCart' + i).value * unitCost).toFixed(2);
    let cart = JSON.parse(localStorage.getItem('Cart'));
    cart['articles'][i]['count'] = document.getElementById('quantityCart' + i).value;
    localStorage.setItem('Cart', JSON.stringify(cart));
    totalProducts();

}

function shipping() {
    let porcen = $("input[name='shipping']:checked").val();

    $('#shipping').empty();
    $('#shipping').append("El costo de envío será del " + porcen + "%. ");

    $('#shippingInfo').empty();
    let shippingInfo = "";
    if (porcen == 5) {
        shippingInfo = "12 y 15 días."
        $('#shippingInfo').css({ 'color': '#212529' });
    } else if (porcen == 7) {
        shippingInfo = "5 y 8 días."
        $('#shippingInfo').css({ 'color': '#212529' });
    } else {
        shippingInfo = "2 y 5 días.";
        $('#shippingInfo').css({ 'color': '#212529' });

    }

    $('#shippingInfo').append("El pedido llegará entre " + shippingInfo);

    let shipping = 0;
    let totalProducts = document.getElementById("totalProducts").innerText;
    shipping = (porcen * totalProducts) / 100;

    document.getElementById("currencyShipping").innerText = currency;
    $('#shippingCost').text(shipping);
    total();
}


function totalProducts() {
    let cartInfo = JSON.parse(localStorage.getItem('Cart'));
    let totalProducts = 0;
    for (let i = 0; i < cartInfo.articles.length; i++) {
        totalProducts += parseInt(document.getElementById("summary" + i).innerText.split(' ')[1]);
    }
    document.getElementById("currencyTotalProducts").innerText = currency;
    document.getElementById("totalProducts").innerText = totalProducts;
    shipping();
}

function total() {
    let disc = document.getElementById('discountTotalProducts').innerText;
    let total = "";
    if (!disc) {
        total = parseInt($('#shippingCost').text()) + parseInt($('#totalProducts').text());
    } else {
        total = parseInt($('#shippingCost').text()) + parseInt($('#discountTotalProducts').text());
    };
    document.getElementById("currencyTotal").innerText = currency;
    document.getElementById('total').innerText = total;

}





document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            localStorage.setItem('Cart', JSON.stringify(resultObj.data));
            showCart();
        }
    });

    $('#moneda').on('click', function (e) {
        if (currency == "USD") {
            currency = "UYU";
            $('#moneda').html('Cambiar a USD <i class="fa fa-dollar-sign"></i>');
        } else {
            currency = "USD";
            $('#moneda').html('Cambiar a UYU <i class="fa fa-dollar-sign"></i>');
        }
        showCart();
    });

    $("input[name='shipping']").on('change', function (e) {
        shipping();
    });




});