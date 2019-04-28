const url = "https://us-central1-rest-api-d0635.cloudfunctions.net/api/pets"

const getpets = async () => {
    const response = await fetch(url)
    const json = await response.json()

    return json
}

const darDeBaja = async id => {
    event.target.parentElement.parentElement.remove()
    await fetch(`${url}/${id}/daralta`)
}

const tableTemplate = ({ _id, nombre, tipo, descripcion}) => `
    <tr>
        <td>${nombre}</td>
        <td>${tipo}</td>
        <td>${descripcion}</td>
        <td><button onclick="darDeBaja('${_id}')">DAR DE ALTA</button></td>
    </tr>
`

const handleSubmit = async e => {
    e.preventDefault()
    const { nombre, tipo, descripcion } = e.target
    const data = {
        nombre : nombre.value,
        tipo: tipo.value,
        descripcion: descripcion.value
    }
    nombre.value = ''
    tipo.value = ''
    descripcion.value = ''

    const responde = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    })
    const json = await responde.json()
    const template = tableTemplate({
        ...data,
        _id: json,
    })
    const tabla = document.getElementById('tabla')
    tabla.insertAdjacentHTML('beforeend',template)   


}
window.onload = async () => {
    const petForm = document.getElementById('pet-form')
    petForm.onsubmit = handleSubmit
    const pets = await getpets()
    const template = pets.reduce((acc, el) => 
            acc+tableTemplate(el),'')
    const tabla = document.getElementById('tabla')
    tabla.innerHTML = template    
}