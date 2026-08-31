const input = document.querySelector("input")
const output = document.getElementById("output")
const fakeOutput = document.getElementById("fakeOutput")
const nameInput = document.getElementById("fileName")
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
    downloadFile(output.innerText, nameInput.value + ".yaml")
}

function handleFileInput() {
    file = event.target.files[0]
    output.innerText = ""

    if (!file) {
        alert("No file selected.")
        return;
    }
    if (!/\.yaml$/i.test(file.name)) {//If file doesn't end in .yaml
        alert("Please insert a valid YAML. (If the file extension is .yml, change it to .yaml)")
    }
    const reader = new FileReader()
    reader.onload = () => {
        output.innerText = reader.result
        nameInput.value = file.name.slice(0, file.name.length - 5)//changes nameinput to the file name (minus .yaml)
        updateFakeOutput()
    }
    reader.onerror = () => {
        alert("there was some error i guess")
    }
    reader.readAsText(file)
}

output.addEventListener("input",  (event) => {
    updateFakeOutput()
})

//A function that takes the innerHTML of output and adds spans for color (unfinished)
function updateFakeOutput() {
    var oldHTML = output.innerHTML
    var workHTML = ""
    var newHTML = output.innerHTML
    var status = {//Keep track of what tags we've opened that we have to close
        comment: false,
        category: false,
        options: false
    }
    var i
    for (i=0;i<oldHTML.length;i++) {
        if (oldHTML[i] === "#" && !status.comment) {
            workHTML += '<span class="comment">#'
            status.comment = true
        } else if (oldHTML.slice(i, i+4) === "<br>" && status.comment) {
            workHTML += '</span><'
            status.comment = false
        } else {
            workHTML += oldHTML[i]
        }
    }
    //newHTML += '<span class="comment">  #this is will show up in only the fakeOutput as GREEN</span>'
    fakeOutput.innerHTML = workHTML
}
