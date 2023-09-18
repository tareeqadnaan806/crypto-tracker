const root = document.getElementById("root");

const conversionRate = fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
);
conversionRate
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log(data.bitcoin.inr);
    trendingCoins(data.bitcoin.inr);
  });

const trendingCoins = (conversionRate) => {
  fetch("https://api.coingecko.com/api/v3/search/trending")
    .then((res) => res.json())
    .then((data) => {
      const coins = data.coins;
      //   console.log(coins);
      coins.map((ele, ind) => {
        const coinsdata = ele.item;
        // console.log(ind);
        // console.log(coinsdata.name);
        displayCoins(coinsdata, ind, conversionRate);
      });
    });
};

const displayCoins = (data, index, conversionRate) => {
  let coinCard = document.createElement("div");
  coinCard.classList = "card";
  const idx = document.createElement("span");
  idx.innerText = index + 1;
  const logo = document.createElement("img");
  logo.src = data.small;
  const name = document.createElement("span");
  name.classList = "name";
  name.innerText = data.name;
  const price = document.createElement("span");
  price.classList = "price";
  const number = data.price_btc * conversionRate;
  var roundedNumber = number.toFixed(2);
  price.innerText = roundedNumber;
  
  coinCard.appendChild(idx);
  coinCard.appendChild(logo);
  coinCard.appendChild(name);
  coinCard.appendChild(price);
  root.appendChild(coinCard);
};

const searchBar = document.getElementById("searchValue");
const searchButton = document.getElementById("searchButton");

const searchedCoins = (data, indx) => {
  let coinCard = document.createElement("div");
  coinCard.classList = "card";
  const idx = document.createElement("span");
  idx.innerText = indx + 1;
  const logo = document.createElement("img");
  logo.src = data.thumb;
  const name = document.createElement("span");
  name.classList = "names";
  name.innerText = data.name;
  const button = document.createElement("a");
  button.innerText = "More info";
  button.href = `../crypto-tracker/detail.html?id=${data.id}`
  button.classList = "info-btn";
  coinCard.appendChild(idx);
  coinCard.appendChild(logo);
  coinCard.appendChild(name);
  coinCard.appendChild(button);
  root.appendChild(coinCard);
};

searchButton.addEventListener("click", () => {
  root.innerHTML = "";
  const coins = fetch(
    `https://api.coingecko.com/api/v3/search?query=${searchBar.value}`
  );
  coins
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const allcoins = data.coins;
      //   console.log(allcoins);
      allcoins.map((ele, idx) => {
        //  console.log(ele);
        searchedCoins(ele, idx);
      });
    });
});
