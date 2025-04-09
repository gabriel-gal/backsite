const cepInput = document.getElementById('cep')
const form = document.querySelector('form')

cepInput.addEventListener('blur', async function () {
    const cep = cepInput.value.replace(/\D/g, '')

    if (cep.length !== 8) {
        alert('CEP inválido.')
        return
    }

    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await resp.json()

    if (data.erro) {
        alert('CEP não encontrado.')
        document.getElementById('estado').value = ""
        document.getElementById('cidade').value = ""
        document.getElementById('rua').value = ""
        return
    }

    document.getElementById('estado').value = data.uf;
    document.getElementById('cidade').value = data.localidade;
    document.getElementById('rua').value = data.logradouro;
})

form.addEventListener('submit', function (event) {
    event.preventDefault()

    const formData = new FormData(form)
    const formObject = {}

    formData.forEach((value, key) => {
        formObject[key] = value
    })

    console.log(formObject)
})