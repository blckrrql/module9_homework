let resultNode = document.querySelector('.a');
let button = document.querySelector('.btn');
let pageNumber;
let limit;

function useRequest(pageNumber, limit, cb) {
  let url = `https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log('Статус ответа:' `${xhr.status}`)
    } else {
      let res = JSON.parse(xhr.response);
      console.log("Результат:", JSON.parse(xhr.response));
      if (cb) {
        // console.log("cb = true")
        cb(res);
      }
    }
  };
  xhr.onprogress = function (event) {
    console.log(`Загружено ${event.loaded} из ${event.total}`)
  };
  xhr.onerror = function () {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  xhr.send();
};

function displayResult(apiData) {
  let cards = '';
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img src="${item.download_url}" class="card-image"/>
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
    localStorage.setItem("localImages", cards)
  });
  resultNode.innerHTML = cards;
};

function clearStorage() {
  localStorage.clear();
  resultNode.innerHTML = "";
}

const displayImages = () => {
  const images = localStorage.getItem("localImages");
  if (images) {
    resultNode.innerHTML = images;
  } else {
    console.log("Пусто")
  };
};

document.addEventListener("DOMContentLoaded", displayImages);

button.addEventListener('click', () => {
  clearStorage();
  pageNumber = document.querySelector('.input1').value;
  limit = document.querySelector('.input2').value;
  console.log("Номер страницы: " + pageNumber + ", " + "лимит: " + limit);
  if ((pageNumber < 1) || (pageNumber > 10) || isNaN(pageNumber)) {
    resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
  } else if ((limit < 1) || (limit > 10) || isNaN(pageNumber)) {
    resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10';
  } else if (((pageNumber < 1) || (pageNumber > 10) || isNaN(pageNumber)) && ((pageNumber < 1) || (pageNumber > 10) || isNaN(pageNumber))) {
    resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10'
  } else {
    useRequest(pageNumber, limit, displayResult);
  };
})
