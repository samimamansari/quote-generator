const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = []; 

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//show new quote
function newQuote(){
    loading();
    //pick random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    //check if author field is blank and replace it with 'unknown'
    if(!quote.author){
        authorText.textContent = "Unknown";
    }
    else{
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling
    if(quote.text.length > 100)
    {
        quoteText.classList.add("long-quote");
    }
    else
    {
        quoteText.classList.remove("long-quote");
    }
    //show quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from api
async function getQuotes(){
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        //catch error
        console.log(error);
    }
}

//Tweet the quote
function tweetQuote()
{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

newQuoteButton.addEventListener('click',newQuote);
twitterButton.addEventListener('click',tweetQuote);
getQuotes();