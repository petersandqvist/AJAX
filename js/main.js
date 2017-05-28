$(function(){
  let deckID;
  let points=0;
  let newCard;
  let result;
  let printToHtml="";
  let mapCards;
  let cardArr;
  let cardTable=$('#bj-cards');
  let btn_option=$('.optionalButton');

//first call
  $('#open-blackjack').on('click', function(){
      $(this).fadeOut();
      $('.loading2').fadeIn('slow').delay(800).fadeOut('slow');
      $('.after-loading2').delay(2000).fadeIn();
  }).on('click', function(){
      $.ajax({
          method: 'GET',
          url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
          dataType: 'json'
  })
  .done(getDeckId)
  .done(drawTwoCards)
  .fail(err=>err);
});
let getDeckId = res => {
  deckID=res.deck_id;
  return deckID;
};
let setUrl = (id, numberOfCards)=> {
  return `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${numberOfCards}`;
};

let setCardImage = cardObject => {
  return `<figure>
              <img class="bj-img" src="${cardObject.image}" alt="${cardObject.code}">
          </figure>`;
};
  //Second call

  let drawTwoCards = () => {
    let drawTwoUrl = setUrl(deckID, 2);
    $.ajax({
      method: 'GET',
      url: drawTwoUrl,
      dataType: 'json'

    })
    .done(showHand)
    .done(addButtons)
    .done(countPoint)
    .fail(err=>err);
  };

  let showHand = res => {
    cardArr = res.cards;
    cardArr.map(card => {
      printToHtml+=setCardImage(card);
      return printToHtml;
    });
    cardTable.hide().delay(1300).fadeIn().html(printToHtml);
  };

  let addButtons = () => {

    let buttons=`<input class="btn btn-default" id="btn-drawone" type="button" value="Add One More Card">
                <input class="btn btn-info" id="btn-done" type="button" value="Done">`;
    btn_option.hide().delay(1000).html(buttons);

    $('#btn-drawone')
      .on('click', drawOneMore);
    $('#btn-done')
      .on('click', showResult)
      .on('click', function(){
        $('#reload-bj').delay(1900).fadeIn('slow');
      });
  };
//check the value of the cards and count the points based on the cards
  let countPoint = () => {
    cardArr.map(item => {
      if(isNaN(item.value)) {
        if(item.value === "ACE") {
          points+=11;
        }else if(item.value === "JACK") {
          points+=10;
        }else if(item.value === "QUEEN") {
          points+=10;
        }else if(item.value === "KING") {
          points+=10;
        }
      }else {
        points+=Number(item.value);
      };
      if(points === 21) {
        result = 'BLACKJACK';
      }else if(points>=22){
        result = 'Bust';
      } else {
        result=points;
      };
    });
  };
  //Third
  let drawOneMore = () => {
    let drawOneUrl = setUrl(deckID, 1);
    $.ajax({
      method: 'GET',
      url: drawOneUrl,
      datatype: 'json'
    })
    .done(getFinalHand)
    .done(showFinalCards)
    .done(countFinalPoint);
  };

  let getFinalHand = res => {
    newCard = res.cards[0];
    cardArr.push(newCard);
    return cardArr;
  };

  let showFinalCards = () => {
    cardTable.append(setCardImage(newCard));
  };

  let countFinalPoint = () => {
    if(isNaN(newCard.value)) {
      if(newCard.value === "ACE") {
        points+=11;
      }else if(newCard.value === "JACK") {
        points+=10;
      }else if(newCard.value === "QUEEN") {
        points+=10;
      }else if(newCard.value === "KING") {
        points+=10;
      }
    }else {
      points+=Number(newCard.value);
    };
    if(points === 21) {
      result = 'Blackjack';
    }else if(points>=22) {
      result = 'Bust';
    }else {
      result=points;
    };
  };

  let showResult = () => {
    $('.optionalButton, #bj-cards').fadeOut();
    $('#bj-counter').html(result).delay(700).fadeIn('slow');
  };

$('#reload-bj').on('click', function(){
  location.reload(false);
});

});
