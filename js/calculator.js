const technologiesSelect = document.querySelector(
  "#calculator-form-technologies"
);

const technologiesMultiSelect = new Choices(technologiesSelect, {
  //подключаем мультиселект
  allowSearch: false,
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  removeItems: true,
  removeItemButton: true,
  editItems: false,
  duplicateItemsAllowed: false,
  delimiter: ",",
  paste: true,
  searchEnabled: false,
  searchChoices: true,
  searchResultLimit: -1,
  position: "auto",
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  noChoicesText: "No available options",
  itemSelectText: "Click to select",
  classNames: {
    containerInner: "choices__inner tech-input-container",
    input: "choices__input",
  },
});

calculateSum();

const calculatoFform = document.querySelector(".calculator-form");

calculatoFform.addEventListener("submit", function (event) {
  event.preventDefault(); //при нажатии что бы не перебрасывало наверх сайта
  calculateSum();
 
});

function calculateSum(){
 // selectors
 const webSiteTypeSelect = document.querySelector(
  "#calculator-form-website-type"
);
const webSiteCart = document.querySelector(
  "#calculator-form-imput-cart input:checked"
);
const webSiteReception = document.querySelector(
  "#calculator-form-imput-reception input:checked"
);

// values
const webSiteTypeValue = extractPriceFromValue(webSiteTypeSelect.value);
const technologiesValue = getTechnologiesSum(technologiesMultiSelect.getValue()); //отслеживаем изменение первого селекта(это массив объектов)
const webSiteCartValue = convertCartOptionToPrice(webSiteCart.value);
const webSiteReceptionValue = convertReceptionOptionToPrice(webSiteReception.value);

console.log(webSiteTypeValue);
console.log(technologiesValue);
console.log(webSiteCartValue);
console.log(webSiteReceptionValue);

const totalSum = webSiteTypeValue + technologiesValue + webSiteCartValue + webSiteReceptionValue;

renderSum(totalSum);
}

function renderSum(sum){
  const costElement = document.querySelector(".calculator-form-total-cost");

  costElement.textContent = 'Calculating...'
  
  setTimeout(function(){
    costElement.textContent = sum + '$'
  }, 1000)

  // costElement.textContent = sum + '$'
}

function convertCartOptionToPrice (option) {
  if(option === 'yes'){
    return 300;
  }
  return 0;
}

function convertReceptionOptionToPrice (option) {
  if(option === 'yes'){
    return 500;
  }
  return 0;
}

function getTechnologiesSum(technologiesArr) {
  let totalSum = 0;
  technologiesArr.forEach(function (tech) {
    //перебираем массив методом forEach
    totalSum = totalSum + extractPriceFromValue(tech.value); //выводим значение каждого элемента (объекта) массива, преобразуем его в чмсло,затем суммируем его
  });
  return totalSum;
}

function extractPriceFromValue(str) {
  const price = str.match(/:\d+/);

  if (price) {
    return Number(price[0].slice(1)) || 0;
  }

  return 0;
}
