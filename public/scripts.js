const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

function clearItems() {
    const elements = document
        .querySelector("ul")
        .getElementsByTagName("li");
    elements.map(element => element.innerHTML = '')
}

async function load() {
    const res = await fetch("http://localhost:3000/")
        .then(data => data.json())
    res.urls.map(({ name, url }) => addElement({name, url}))
}

load()

async function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash, {name, url})

    li.append(a)
    li.append(trash)
    ul.append(li)
}

async function removeElement(el, {name, url}) {
    if (confirm('Tem certeza que deseja deletar?')) {
        await fetch(
            `http://localhost:3000/?name=${name}&url=${url}&del=1`
        )
        el.parentNode.remove()
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    await fetch(
        `http://localhost:3000/?name=${name}&url=${url}`
    )
    addElement({ name, url })

    input.value = ""
})