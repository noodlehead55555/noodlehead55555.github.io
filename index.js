const input = document.querySelector("input")
const output = document.getElementById("output")
var file = null


input.addEventListener("change", handleFileInput)

//Thanks to Łukasz Holeczek for this code
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

function downloadClick() {
    if (!file) {
        return;
    }
    console.log("yes file")
    downloadFile(output.textContent, file.name)
}

function handleFileInput() {
    file = event.target.files[0]
    output.textContent = ""

    if (!file) {
        output.textContent = "still no file selected";
        return;
    }
    const reader = new FileReader()
    reader.onload = () => {
        output.textContent = reader.result
    }
    reader.onerror = () => {
        output.textContent = "there was an error"
    }
    reader.readAsText(file)
    console.log(file)
}