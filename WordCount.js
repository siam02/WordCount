
const TextArea = document.getElementById("text");

TextArea.addEventListener("input", wordCount);


function wordCount() {

    const Textarea = document.getElementById("text").value;
    
    const wordCount = Textarea.trim().split(/\s+/).filter(word => word.length > 0).length;
    const charCount = Textarea.length;
    // const sentenceCount = Textarea.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;


    document.getElementById("word").textContent = wordCount;
    document.getElementById("char").textContent = charCount;
    // document.getElementById("sentence").textContent = sentenceCount;
}

// function ClearText() {
//     document.getElementById("text").value = "";
//     document.getElementById("word").textContent = "";
//     document.getElementById("char").textContent = "";
//     document.getElementById("sentence").textContent = "";
// }
