const structureList = document.querySelector('.structure-list')
const tagsContainer = document.querySelector('.tags-container')

let structureArr = ['Colour', 'Company', 'Brand', 'Size']

const tagsArr = [
  'Tags',
  'Style',
  'Material',
  'Position',
  'Attribute',
  'Warranty',
]

function populateStructureList() {
  structureArr.forEach((item, index) => {
    const structureCard = document.createElement('li')
    structureCard.classList.add('structure-item')
    structureCard.setAttribute('draggable', 'true')
    structureCard.setAttribute('data-index', index)
    structureCard.innerHTML = `
  <img src="./img/drag.svg" alt="" />${item}
  `
    structureList.appendChild(structureCard)
  })

  addEventListeners()
}

populateStructureList()

tagsArr.forEach((tag) => {
  const tagCard = document.createElement('div')
  tagCard.classList.add('tag')
  tagCard.innerHTML = `
  <p>${tag}</p>
  <img src="./img/add.svg" alt="" />
  `

  tagCard.addEventListener('click', () => activateTag(tagCard))

  tagsContainer.appendChild(tagCard)
})

function activateTag(tagCard) {
  tagCard.classList.toggle('active')
  const tagImage = tagCard.querySelector('img')

  if (tagCard.classList.contains('active')) {
    tagImage.src = './img/check-mark-black-outline-svgrepo-com.svg'
  } else {
    tagImage.src = './img/add.svg'
  }
}

let dragStartIndex

function dragStart() {
  dragStartIndex = this.closest('li').getAttribute('data-index')
  console.log(dragStartIndex)
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  const dragEndIndex = +this.getAttribute('data-index')
  moveItems(dragEndIndex)
}

function moveItems(dragEndIndex) {
  const itemOne = structureArr[dragStartIndex]

  const trimmedStructureArr = structureArr.filter((item) => item !== itemOne)
  const newStructureArr = [
    ...trimmedStructureArr.slice(0, dragEndIndex),
    itemOne,
    ...trimmedStructureArr.slice(dragEndIndex),
  ]

  structureArr = newStructureArr

  structureList.innerHTML = ''
  populateStructureList()
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.structure-item')

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart)
    draggable.addEventListener('dragover', dragOver)
    draggable.addEventListener('drop', dragDrop)
  })
}
