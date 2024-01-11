if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready ()
}




function ready(){  
var RemoveFromCart = document.getElementsByClassName('remove-from-cart')
console.log(RemoveFromCart)

for(var i = 0; i < RemoveFromCart.length; i++){
    var button = RemoveFromCart[i];
    button.addEventListener('click', removeCartItem) 
}


 var quantityInputs = document.getElementsByClassName('form-control')
 for(var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)

 }

 var addToCartButtons = document.getElementsByClassName('btn btn-primary')
 for(var i = 0; i < addToCartButtons.length; i++){
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)

}
}


function removeCartItem(event){
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.remove()
        updateCartTotal()
}


function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
      var button = event.target
      var shopItem = button.parentElement.parentElement.parentElement
      var title = shopItem.getElementsByClassName('card-title')[0].innerText
      var price = shopItem.getElementsByClassName('card-text')[0].innerText
      var imageSrc = shopItem.getElementsByClassName('card-img-top')[0].src
      console.log(title, price, imageSrc)
      addItemToCart(title, price, imageSrc)
      updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var CartItemNames = cartItems.getElementsByClassName('product-title')
    for (var i = 0; i < CartItemNames.length; i++){
        if (CartItemNames[i].innerText == title){
            alert('This product has already been added to the cart')
            return 
        }
    }
    var cartRowcontents = `  <td>
    <div class="product-item">
    <a class="product-thumb" href="#"><img src="${imageSrc}" alt="men"></a>
    <div class="product-info">
        <h4 class="product-title"><a href="#">${title}</a></h4><span><em>Price: </em>${price}</span>
    </div>
</div>
</td>
<td class="text-center">
<div class="count-input">
    <input class="form-control" type="number" value="1">
</div>
</td>
<td class="text-center text-lg text-medium">${price}</td>

<td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a></td>
`
    cartRow.innerHTML = cartRowcontents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove-from-cart')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('form-control')[0].addEventListener('change', quantityChanged)
   
}





function updateCartTotal() {

    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0


    for(var i = 0; i < cartRows.length; i++){

        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('text-center text-lg text-medium')[0]
        var quantityElement = cartRow.getElementsByClassName('form-control')[0]
        
        var price = parseFloat(priceElement.innerText.replace('R', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)


   }
   total = Math.round(total * 100) / 100
   document.getElementsByClassName('column text-lg')[0].innerText = 'Total: R ' + total

}