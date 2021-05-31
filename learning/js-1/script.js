const courses = [
    {
        name: 'course 1',
        price: 20
    }, {
        name: 'course 4',
        price: 45
    }, {
        name: 'course 3',
        price: 2
    }, {
        name: 'course 5',
        price: 14
    }, {
        name: 'course 2',
        price: 21
    },
]

function generateList() {
    const ul = document.querySelector('.list-group');
    ul.innerHTML = ''
    courses.forEach(course => {
        const li = document.createElement('li');
        li.classList.add("list-group-item");

        const name = document.createTextNode(course.name)
        li.appendChild(name)

        const span = document.createElement('span')
        span.classList.add('pull-right')

        const price = document.createTextNode('$' + course.price)
        span.appendChild(price)

        li.appendChild(span)
        ul.appendChild(li)
    })

}

window.addEventListener('load',
    generateList
)

const btn = document.querySelector('.sort-btn');
btn.addEventListener('click', ()=>{
    courses.sort((a, b) =>  a.price - b.price
    )
    generateList()

})