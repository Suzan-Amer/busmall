'use strict';

let leftImageElement = document.getElementById('leftImg')
let centerImageElement = document.getElementById('centerImg')
let rightImageElement = document.getElementById('rightImg')
let img = document.getElementById('img')

let leftImgIndex;
let centerImgIndex;
let rightImgIndex;

let maxChoice = 25;
let userChoice = 0;

let allProduct = [];
let productName = [];
let productVote = [];
let productshow = [];

function BussImg(name, source) {
    this.name = name;
    this.source = source;
    this.vote = 0;
    this.show = 0;
    allProduct.push(this);
    productName.push(this.name);
    dataprod ();
}



// local 
function dataprod () {
    let data = JSON.stringify(allProduct);  
    localStorage.setItem('Product', JSON.stringify(allProduct));

}




//product
new BussImg('bag', 'img/bag.jpg');
new BussImg('banana', 'img/banana.jpg');
new BussImg('bathroom', 'img/bathroom.jpg');
new BussImg('boots', 'img/boots.jpg');
new BussImg('breakfast', 'img/breakfast.jpg');
new BussImg('bubblegum', 'img/bubblegum.jpg');
new BussImg('chair', 'img/chair.jpg');
new BussImg('cthulhu', 'img/cthulhu.jpg');
new BussImg('dog-duck', 'img/dog-duck.jpg');
new BussImg('dragon', 'img/dragon.jpg');
new BussImg('pen', 'img/pen.jpg');
new BussImg('pet-sweep', 'img/pet-sweep.jpg');
new BussImg('scissors', 'img/scissors.jpg');
new BussImg('shark', 'img/shark.jpg');
new BussImg('sweep', 'img/sweep.png');
new BussImg('tauntaun', 'img/tauntaun.jpg');
new BussImg('unicorn', 'img/unicorn.jpg');
new BussImg('water-can', 'img/water-can.jpg');
new BussImg('wine-glass', 'img/wine-glass.jpg');



function getRandomProduct() {

    return Math.floor(Math.random() * allProduct.length);
}

function renderProductImg() {

    leftImgIndex = getRandomProduct();
    centerImgIndex = getRandomProduct();
    rightImgIndex = getRandomProduct();



    do {
        leftImgIndex = getRandomProduct();
        rightImgIndex = getRandomProduct();

    } while (leftImgIndex === centerImgIndex || centerImgIndex === rightImgIndex || leftImgIndex === rightImgIndex);

    leftImageElement.src = allProduct[leftImgIndex].source;
    centerImageElement.src = allProduct[centerImgIndex].source;
    rightImageElement.src = allProduct[rightImgIndex].source;


    allProduct[leftImgIndex].show++;
    allProduct[centerImgIndex].show++;
    allProduct[rightImgIndex].show++;



}
  
renderProductImg();

// leftImageElement.addEventListener('click', handClick);
// centerImageElement.addEventListener('click', handClick);
// rightImageElement.addEventListener('click', handClick);

img.addEventListener('click', handClick);





function handClick(event) {
    userChoice++;
    console.log(userChoice);

    if (userChoice <= maxChoice) {
        console.log(userChoice);

        if (event.target.id === 'leftImg') {
            allProduct[leftImgIndex].vote = allProduct[leftImgIndex].vote + 1;

        } else if (event.target.id === 'centerImg') {
            allProduct[centerImgIndex].vote = allProduct[centerImgIndex].vote + 1;

        } else if (event.target.id === 'rightImg') {
            allProduct[rightImgIndex].vote = allProduct[rightImgIndex].vote + 1;
        }


        renderProductImg();



        
    } else {
        // leftImageElement.removeEventListener('click', handClick);
        // centerImageElement.removeEventListener('click', handClick);
        // rightImageElement.removeEventListener('click', handClick);
        img.removeEventListener('click', handClick)

        let list = document.getElementById('result');
        let butn = document.getElementById('butn');
        butn.addEventListener('click', result)


         function result () {
        let liElement;

        for (let i = 0; i < allProduct.length; i++) {
            liElement = document.createElement('li');
            list.appendChild(liElement);
            liElement.textContent = `Image ${i}: ${allProduct[i].name} had ${allProduct[i].vote} vote,and was seen ${allProduct[i].show}`;
        }

    }
            for (let i = 0; i < allProduct.length; i++) {
                productVote.push(allProduct[i].vote)
                productshow.push(allProduct[i].show)

            }
            chartPro();
        }
        
    }



console.log(allProduct);

function chartPro() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart= new Chart (ctx, {
        type: 'bar',
        data: {
            labels: productName,
            datasets: [{
                label: '# of Votes',
                data: productVote,
                backgroundColor: [
                    'redorange',
                ],
                borderColor: [
                    'redorange'
                ],
                borderWidth: 1
            }, {
                label: '# of shown',
                data: productshow,
                backgroundColor: 'red',
                borderColor: 'red',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


console.log('name', productName);
console.log('vote', productVote);
console.log('show', productshow);