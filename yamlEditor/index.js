const fileInput = document.getElementById("fileInput")
const output = document.getElementById("output")
const fakeOutput = document.getElementById("fakeOutput")
const nameInput = document.getElementById("fileName")
const templateChoice = document.getElementById("templateChoice")
const templateList = document.getElementById("templateList")
var templatesArray = []
var file = null
var i

fetch("templates.json")//Get list of templates from templates json file
    .then(response => response.json())
    .then(templates => {
        console.log(templates)
        for (i=0;i<templates.length;i++) {//Add everything from templates file to the templateList dropdown, and to templatesArray
            templatesArray.push(templates[i])
            let opt = document.createElement('option')
            opt.value = templates[i]
            opt.innerText = opt.value
            templateList.appendChild(opt)
        }
    })

templateChoice.addEventListener("change", handleTemplateInput)
function handleTemplateInput() {
    if (!templatesArray.includes(templateChoice.value)) {
        console.log(templateChoice.value + " is not a valid YAML, cancelling fetch")
        return;
    }
    if (output.innerText !== "" && output.innerText !== "\n") {
        if (!confirm("Replace current file with new template?")) {
            return;
        }
    }
    console.log(templateChoice.value)
    fetch("./YAML_Templates/" + templateChoice.value).then(response => response.text()).then(text => {
        output.innerText = text
        updateFakeOutput()
        nameInput.value = templateChoice.value.slice(0, templateChoice.value.length - 5)
        templateChoice.value = ""
    })
    
}



fileInput.addEventListener("change", handleFileInput)
function handleFileInput() {
    if (output.innerText !== "" && output.innerText !== "\n") {
        if (!confirm("Replace current file with new upload?")) {
            return;
        }
    }    
    file = event.target.files[0]
    output.innerText = ""

    if (!file) {
        alert("No file selected.")
        return;
    }
    if (!/\.yaml$/i.test(file.name)) {//If file doesn't end in .yaml
        alert("Please insert a valid YAML. (Make sure the file extension is .yaml, not .yml)")
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

//On updating output, call the function to update fake output
output.addEventListener("input",  (event) => {
    updateFakeOutput()
})

//A function that takes the innerHTML of output, adds spans for color, and puts it on fakeOutput (unfinished)
function updateFakeOutput() {
    var oldHTML = output.innerHTML
    var workHTML = ""
    var newHTML = output.innerHTML
    var status = {//Keep track of what tags we've opened that we have to close
        comment: false //you can add more here to do more kinds of things.
    }
    var j
    for (j=0;j<oldHTML.length;j++) {
        if (oldHTML[j] === "#" && !status.comment) {//if hashtag and we're not already in a comment
            workHTML += '<span class="comment">#'//add the beginning of a span
            status.comment = true//and then mark that
        } else if (oldHTML.slice(j, j+4) === "<br>" && status.comment) {//at a newline, if we're in a comment
            workHTML += '</span><'//end the span
            status.comment = false//and mark that
        } else {
            workHTML += oldHTML[j]// nothing notable on this character
        }
    }
    //newHTML += '<span class="comment">  #this is will show up in only the fakeOutput as GREEN</span>'
    fakeOutput.innerHTML = workHTML
}
