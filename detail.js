const currentUrl = window.location.href;
const id = currentUrl.split("?")[1].split("=")[1];

const printDesc = (data) => {
  const printdesc = document.getElementById("printdess");
  printdesc.innerHTML = `
    <section class="coins-details">
    <div id="coins-details">
      <div class="left">
        <img
          src= ${data.image.large}
          alt=""
        />
        <h1>${data.name} (${data.symbol})</h1>
      </div>
      <div class="right">
        <p>
        ${data.description.en}        
        </p>
      </div>
    </div>
  </section>

  <section class="details">
    <div class="left">
      <h2>Current Prices</h2>
      <h4>INR: ${data.market_data.current_price.inr}</h4>
      <h4>AED: ${data.market_data.current_price.aed}</h4>
      <h4>EUR: ${data.market_data.current_price.eur}</h4>
      <h4>BTC: ${data.market_data.current_price.btc}</h4>
    </div>

    <div class="middle">
      <h4>24 hours High: ${data.market_data.high_24h.inr}</h4>
      <h4>24 hours Low: ${data.market_data.low_24h.inr}</h4>
      <h4>Total Supply: ${data.market_data.total_supply}</h4>
      <h4>Circulating Supply: ${data.market_data.circulating_supply}</h4>
    </div>

    <div class="right">
      <h4>Price Change 24h: ${data.market_data.price_change_24h_in_currency.inr}</h4>
      <h4>Price Change Percentage 24h: ${data.market_data.price_change_percentage_24h}</h4>
      <h4>Price Change Percentage 7d: ${data.market_data.price_change_percentage_7d}</h4>
      <h4>Price Change Percentage 14d: ${data.market_data.price_change_percentage_14d}</h4>
      <h4>Price Change Percentage 30d: ${data.market_data.price_change_percentage_30d}</h4>
    </div>
  </section>
    `;
};

const description = () => {
  const desc = fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline-false`
  );
  desc
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      printDesc(data);
    });
};

description();
