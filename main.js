//main

loadItems()
.then(items=>{
    console.log(items);
    displayItems(items);
    setEventListeners(items)
})
.catch(console.log);


//Fetch the items from the JSON file
function loadItems(){
    return fetch('data/data.json')  //데이터를 받아오고
    .then(response=>response.json())  //response를 json화 시킴
    .then(json=>json.items); //json내에 item들만 출력
}

//Update the list with the given items
function displayItems(items){
    const container=document.querySelector('.items');
    container.innerHTML=items.map(item=>creatHTMLString(item)).join('');
}

function setEventListeners(items){
    const logo=document.querySelector('.logo');
    const buttons=document.querySelector('.button');
    logo.addEventListener('click',()=>{
        return displayItems(items);
    });
    buttons.addEventListener('click',event=>onButtonClick(event, items)); //클릭이벤트도 인자로 보내준다.
}

//Create HTML list item from the given data item
function creatHTMLString(item){
    return `
    <li class="item">
    <img src="${item.image}" alt="${item.type}" class="itemImg" /><span
      class="item_desc"
      >${item.gender}, ${item.size}</span>
    `;
}

function onButtonClick(event, items){
    
    const dataset=event.target.dataset;
    const key = dataset.key;
    const value= dataset.value;

    console.log(event.target.dataset.key);
    console.log(event.target.dataset.value);

    if(key===null || value===null){
        return;
    }

    const filtered = items.filter(item=>item[key]===value);
    console.log(filtered)
    displayItems(filtered)


}

// //또다른 방법! 전체 새로고침이 아닌, 필요한부분만 보이게 안보이게!! >_<
// function onButtonClick(event, items){
//     const dataset=event.target.dataset;
//     const key = dataset.key;
//     const value= dataset.value;

//     if(key==null || value ==null){
//         return;
//     }
//     updateItems(items, key, value);
// }

// //Make the items matching {key: value} invisible.
// function updateItems(items, key, value){
//     items.forEach(item => {
//         if(item[key]===value){
//             console.log(item[key]);
//             item.classList.remove('invisible');

//         }else{
//             item.classList.add('visible');
//         }
//     });
// }



