document.querySelector('.search-jokes').addEventListener('click', searchJokes);
document.querySelector('.get-joke').addEventListener('click', getJoke);

function searchJokes(e) {
  const search = document.getElementById('search').value;

  if (search === '') {
    document.querySelector(
      '.jokes'
    ).innerHTML = `You didn't type anything to search for`;
  } else {
    const xhr = new XMLHttpRequest();

    xhr.open(
      'GET',
      `https://api.chucknorris.io/jokes/search?query=${search}`,
      true
    );

    xhr.onload = function () {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);

        let output = '';

        if (response.result.length === 0) {
          output = 'No items matched your search';
        } else {
          response.result.forEach((joke) => {
            output += `<li>${joke.value}</li>`;
          });
        }

        document.querySelector('.jokes').innerHTML = output;
      }
    };

    xhr.send();
  }

  e.preventDefault();
}

function getJoke(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.chucknorris.io/jokes/random', true);

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = `<li>${response.value}</li>`;

      document.querySelector('.jokes').innerHTML = output;
    }
  };

  xhr.send();

  e.preventDefault();
}
