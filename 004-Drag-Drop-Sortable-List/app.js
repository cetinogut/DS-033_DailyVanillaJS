const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check-order');

const biggestCities = [
    "İstanbul",
    "Ankara",
    "İzmir",
    "Adana",
    "Bursa",
    "Konya",
    "Antalya",
    "Gaziantep",
    "Diyarbakır",
    "Erzurum",
    "Balıkesir",
    
];

// sorting example
// const numbers = [1,3,110, 40, 302];
// console.log(
//     numbers.sort(function(a, b){
//         return a - b;
//     })
// )

// store list items
const listItems = [];

let dragStartIndex;

console.log(biggestCities);

 createList();

// create hint-list
var select = document.getElementById("city-order-select");
for(index in biggestCities) {
    select.options[select.options.length] = new Option(biggestCities[index], index);
}

 //inser list items into DOM
 function createList() {
     [...biggestCities] // get the list unchanged
     .map(a => ({ value : a, sort: Math.random()})) // this returns an a object
     .sort( (a, b) => a.sort - b.sort)
     .map( a => a.value )
     .forEach((city, index) => {

         const listItem = document.createElement('li');
        
         //listItem.classList.add('wrong');
         //listItem.classList.add('right');
         //listItem.classList.add('over');

         listItem.setAttribute('data-index', index);
         listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="city-name">${city}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
         `;

         listItems.push(listItem);

         draggableList.appendChild(listItem); // ul ye li yi ekliyoruz her forEach de
         
     });
     addEventListeners();
 }

 function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
  }
  
  function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
  }
  
  function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
  }
  
  function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
  }
  
  function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
  
    this.classList.remove('over');
  }
  
  // Swap list items that are drag and drop
  function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
  
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }
  
  // Check the order of list items
  function checkOrder() {
    listItems.forEach((listItem, index) => {
      const cityName = listItem.querySelector('.draggable').innerText.trim();
  
      if (cityName !== biggestCities[index]) {
        listItem.classList.add('wrong');
      } else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right');
      }
    });
  }
  
  function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    });
  
    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    });
  }
  
  check.addEventListener('click', checkOrder);