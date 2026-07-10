const input = document.querySelector("input")
const output = document.getElementById("output")
const fakeOutput = document.getElementById("fakeOutput")
var file = null


input.addEventListener("change", handleFileInput)

//Thanks to Łukasz Holeczek for this function
function downloadFile(data, filename, type = 'text/plain') {
    const blob = new Blob([data], { type })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

//Handle clicking download
function downloadClick() {
    if (!file) {
        return;
    }
    downloadFile(output.textContent, file.name)
}

function handleFileInput() {
    file = event.target.files[0]
    output.innerText = ""

    if (!file) {
        alert("No file selected.")
        return;
    }
    if (!/\.(yaml|yml)$/i.test(file.name)) {//If file doesn't end in .yaml or .yml
        alert("Please insert a valid YAML")
    }
    const reader = new FileReader()
    reader.onload = () => {
        output.innerText = reader.result
        fakeOutput.innerText = output.innerText
    }
    reader.onerror = () => {
        console.log("there was some error i guess")
    }
    reader.readAsText(file)
}

output.addEventListener("input",  (event) => {
    fakeOutput.innerText = output.innerText
})
//below is exclusively for testing