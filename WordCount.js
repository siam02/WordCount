
const TextArea = document.getElementById("text");

TextArea.addEventListener("input", wordCount);


function wordCount() {

    const Textarea = document.getElementById("text").value;
    
    const wordCount = Textarea.trim().split(/\s+/).filter(word => word.length > 0).length;
    const charCount = Textarea.length;
    const sentenceCount = Textarea.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const wordsPerPage = 300;
    const pageCount = Math.ceil(wordCount / wordsPerPage); 

    document.getElementById("word").textContent = wordCount;
    document.getElementById("char").textContent = charCount;
    document.getElementById("sentence").textContent = sentenceCount;
    document.getElementById("page").textContent = pageCount;

  // Keyword Frequency Calculation
  const keywordMap = {};
  wordsArray.forEach(word => {
      keywordMap[word] = (keywordMap[word] || 0) + 1;
  });

  // Sort keywords by frequency
  const sortedKeywords = Object.entries(keywordMap).sort((a, b) => b[1] - a[1]);

  // Get the top keyword and classify the others by frequency
  const topKeyword = sortedKeywords.length > 0 ? sortedKeywords[0][0] : "None";
  const oneXKeywords = sortedKeywords.filter(([_, count]) => count === 1).map(([word]) => word);
  const twoXKeywords = sortedKeywords.filter(([_, count]) => count === 2).map(([word]) => word);
  const threeXKeywords = sortedKeywords.filter(([_, count]) => count === 3).map(([word]) => word);

  // Update the keyword density display
  document.getElementById("topKeyword").textContent = topKeyword;
  document.getElementById("oneX").textContent = oneXKeywords.join(", ");
  document.getElementById("twoX").textContent = twoXKeywords.join(", ");
  document.getElementById("threeX").textContent = threeXKeywords.join(", ");


}

// function ClearText() {
//     document.getElementById("text").value = "";
//     document.getElementById("word").textContent = "";
//     document.getElementById("char").textContent = "";
//     document.getElementById("sentence").textContent = "";
// }
