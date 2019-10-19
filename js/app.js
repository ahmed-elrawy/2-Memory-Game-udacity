

let openCards = [];
let started = false;
let moves= 0;
let solvedCount=0;
let timeCount=0;
let timerPtr;

let ShufflStore = shuffle( organizedCard());

startGame();

function startGame(){
  DisplayNewCards();
  $('.card').on('click' , function(){ // jqurye slector refear to herself
    cardClick(this);
  })
}
$(".restart").click(resetGame);


//...........................................................................

/*
  * organizedCard function gets index that has card class
  *  cardContent restors innerHTML of the card
  * for loop for that cardContent
  * if  Check each obj , Does he have index
  * Push the contents of this object into the newArray
*/

function organizedCard(){
   let domCards=[];
   domCards=document.getElementsByClassName('card');
   let cardContent=[];
   for(let index in domCards){
     if(domCards.hasOwnProperty(index)){
       cardContent.push(domCards[index].innerHTML);
     }
   }
   return cardContent;
 }



//..................... - creatShffledList function - ........................
/*
  * create ul
  * goes around each value in the ShufflStore by fore loop
  * creat li
  * each li takes value from ShufflStore
  * add card class inside li
  * add li inside ul
*/
function  creatShffledList(){
  let list = document.createElement('ul');
  for(let i =0 ; i < ShufflStore.length ; i++ ){
    // create new li element in ul
    let Li = document.createElement('li');
    Li.innerHTML= ShufflStore[i];
    Li.classList.add('card');
    list.appendChild(Li);
  }
  return list ;
}//end

// Shuffle function from stackoverflow.com
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}//end

function DisplayNewCards(){
  //   Display Cards
  let list= creatShffledList();
   document.getElementsByClassName('deck')[0].innerHTML = list.innerHTML;
}

function getClassFromCard(card){
    return card[0].innerHTML;
}
function isMatch(){
  if (getClassFromCard(openCards[0]) === getClassFromCard(openCards[1])){
        solvedCount++;
        openCards.forEach(function(card){
            
                card.toggleClass("animated infinte pulse open show match");
                console.log("yes");
        });
      
    } else {
        openCards.forEach(function(card){
            card.addClass("animated infinte shake open show");
            console.log("no");
            let currentCards = card;
            setTimeout(function(){
              hideSymbols(currentCards);
            }, 1000)
        });
            }
    openCards = [];
    incrementMove();
    if (solvedCount === 8){
      clearTimeout(timerPtr);
      sweetalert();
    }    
}


hideSymbols = (opendCards)=>{
  for (var i =  opendCards.length -1; i >=0; i--){
    $(opendCards[i]).removeClass('animated infinte shake open show');
  }
};//end

function cardClick(card){
    let classes = $(card).attr("class");
    if (classes.search('open') * classes.search('match') !== 1){
        // both should be -1
        return;
    }
     if (!started) {
        started = true;
        timeCount = 0;
        timerPtr = setTimeout(startTimer, 1000);
    }
    if (openCards.length < 2){
        $(card).addClass("show open");
        openCards.push($(card));
    }
    // check if cards match
    if (openCards.length === 2){
        isMatch();
    }
    
}

// the function resets the game
function resetGame(){
     setTimeout(function(){
        window.location.reload();
    });

}

// the function start the game's time
function startTimer(){
    timeCount += 1;
    $("#timer").html(timeCount);
    timerPtr = setTimeout(startTimer, 1000);
}

// function control's stars
function incrementMove(){
    moves += 1;
    $("#moves").html(moves);
    if (moves === 14 || moves === 20){
       let stars = $(".fa-star");
       $(stars[stars.length-1]).toggleClass("fa-star fa-star-o");
  }
}

// aleart
function sweetalert(){
    let stars = $(".fa-star");
    let num = stars.length;
  swee( "winning !" ,  moves + " moves in "+timeCount+" seconds " + num +"  star !", "success")
}
// sweet aleart from : https://sweetalert2.github.io/#download
function swee( Stitel , Stext , Stype){
  const swalWithBootstrapButtons = swal.mixin({
  confirmButtonClass: 'btn btn-success',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
})

swalWithBootstrapButtons({
  title: Stitel,
  text: Stext,
  type: Stype,
  showCancelButton: true,
  confirmButtonText: 'play again',
  cancelButtonText: 'No stay',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    swalWithBootstrapButtons(
      'reloading!',
      'new game .',
      'success'
    )
     setTimeout(function(){
      window.location.reload();
    }, 2000);

    //resetGame()
  } else if (
    // Read more about handling dismissals
    result.dismiss === swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons(
      'puse',
      'refresh the page if you wont to play again)',
      'error'
    )
  }
})
}