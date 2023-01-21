function useRequest(url) {
    const options = {
        method: 'GET',
        mode: 'cors'
    };
    fetch(url, options)
        .then((response) => {
            console.log("responce", response)
            let url = response.url
            console.log(url)
            return url
        })
        .then((url) => {
            let cards = ""
            const cardBlock = `
            <div class="card">
            <img src="${url}" class="card-image"/>
            </div>`;
            console.log(`${url}`)
            cards = cards + cardBlock;
            console.log(cards)
            resultRequest.innerHTML = cards;

        })

        .catch(() => {
            console.log('error')
        });
};

const resultRequest = document.querySelector(".a");
const btn = document.querySelector(".btn");


btn.addEventListener("click", async (e) => {
    console.log("start");
    let width = `${document.querySelector('.input1').value}`;
    let height = `${document.querySelector('.input2').value}`;
    if (width > 300 || width < 100 || height > 300 || height < 100) {
        resultRequest.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
    } else {
        let valueUrl = `https://picsum.photos/${width}/${height}`
        const requestResult = await useRequest(valueUrl);
        console.log("Значение", valueUrl);
        console.log("end");
    }
})
