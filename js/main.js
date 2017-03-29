$(document).ready(function(){


  function shuffleCard() {

    $.ajax({
          type: 'GET',
          dataType:'json',
          url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6',

          success: (data) => {
            $('#shuffled').text(data.shuffled);
                $('#shuffled').text('Cards shuffled!');
                console.log('success', data);
          },

          error: () => {
            alert("error, not working");
          }


        });

          //event prevents the browser to go to the top of the page when
          //the button is clicked. on click calls the shuffleCard
          //function which triggers the shuffle of the deck of cards
      };
      $('.shuffle-card').on('click', function(event){
        event.preventDefault();
        shuffleCard();
      });


      function face_card(card) {
        switch (card) {
          case "JACK":
          case "QUEEN":
          case "KING":
            return "FACE";
        };
      };

      $draw = $('#draw');

      $('.draw-card').on("click", function(event) {
          event.preventDefault();
        $draw.html("");

        $.ajax({
          type: 'GET',
          url: 'https://deckofcardsapi.com/api/deck/new/draw/?count=2',
          dataType: 'json',

          success: (data) => {
            //each goes trough each item in the array and allows me
            //run a function based off the item
            $(data.cards).each(function(i, card){
              $draw.append('<p>'+ card.value + ' '  +  card.suit + '</p>');

              if (data.cards[0].value == "ACE" || data.cards[1].value == "ACE" || face_card(data.cards[0].value) == "FACE" || face_card(data.cards[1].value) == "FACE") {
              $draw.html("BLACKJACK!");
            };
            console.log('success', data);
          });
          error: () =>{
            alert("No more cards");
          }
        },

      });
      })
      $newdeck = $('#newdeck');

      $('.new-deck').on("click", function(event){
        event.preventDefault();


        $.ajax({
          type: 'GET',
          url: 'https://deckofcardsapi.com/api/deck/new/',
          dataType: 'json',

          success: (data2) => {
            $('#newdeck').text(data2.shuffled);
                $('#newdeck').text('Brand new deck!');
                console.log('success', data2);
          },
            error: () => {
              alert("Error, new deck not working");
            }
        });
      })


     });
