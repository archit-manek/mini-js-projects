const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quotes = [];

// Loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Get quotes from API
async function getQuotes() {
  loading();
  const url = "https://type.fit/api/quotes";
  try {
    const response = await fetch(url);
    quotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
  complete();
}

const newQuote = () => {
  loading();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  quoteText.textContent = quote.text;
  complete();
};

// Tweet
const tweetQuote = () => {
  const url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(url, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
