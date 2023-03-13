const Symbols = [
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png', // 黑桃
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png', // 愛心
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png', // 方塊
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png' // 梅花
]
const view = {
  getCardContent(index){
    const number = this.transformNumber((index % 13) + 1)
    const symbol = Symbols[Math.floor(index / 13)]
    return `
      <p>${number}</p>
      <img src="${symbol}" />
      <p>${number}</p>
    `
  },
  getCardElement(index){
    return `<div class="card back" data-id="${index}"></div>`
  },
  transformNumber(number){
    switch(number){
      case 1 : return 'A'
      case 11 : return 'J'
      case 12 : return 'Q'
      case 13 : return 'K'
      default : return number
    }
  },
  displayCards(){
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = utility.getRandomNumberArray(52).map(index=>this.getCardElement(index)).join('')
  },
  flipCard(card){
    // 如果是背面，點擊變正面
    // 如果是正面，切換回背面
    if(card.classList.contains('back')){
      card.classList.remove('back')
      card.innerHTML = this.getCardContent(Number(card.dataset.id))
      return
    }
    card.classList.add('back')
    card.innerHTML = ''
  }
}
const utility = {
  getRandomNumberArray(count){
    const number = Array.from(Array(count).keys())
    for(let index = number.length -1 ;index > 0; index--){
      let randomIndex = Math.floor(Math.random()*(index+1))
      ;[number[index],number[randomIndex]] = [number[randomIndex],number[index]]
    }
    return number
  }
}
view.displayCards()
document.querySelectorAll('.card').forEach(card=>card.addEventListener('click',event=>{view.flipCard(card)}))