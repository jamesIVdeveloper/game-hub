"use: strict";

let requiredURL = "https://www.cheapshark.com/api/1.0/deals";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  if (responseJson.length === 0) {
    $("#results-list").append(
      `<h3>Sorry, no results found.  Please try entering something else.</h3>`
    );
  }
  for (let i = 0; i < responseJson.length; i++) {
    $("#results-list").append(
      `<div id="game-result"><li><h3 class="game-title">${responseJson[i].title}</h3>
            <p>Normal Price: $${responseJson[i].normalPrice}</p>
            <p>Sale Price: $${responseJson[i].salePrice}</p>
            <a href="https://www.cheapshark.com/redirect?dealID=${responseJson[i].dealID}">CheapShark Link</a></li></div>`
    );
  }
  $("#results").removeClass("hidden");
}

function getGames(query, lowerPrice, upperPrice) {
  const params = {
    title: query,
    lowerPrice: lowerPrice,
    upperPrice: upperPrice,
  };

  const queryString = formatQueryParams(params);
  const url = requiredURL + "?" + queryString;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    let title = $("#js-game-search").val();
    let lowerPrice = $("#js-low-price").val();
    let upperPrice = $("#js-high-price").val();
    getGames(title, lowerPrice, upperPrice);
  });
}

$(watchForm);
