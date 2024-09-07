
const TextArea = document.getElementById("text");

TextArea.addEventListener("input", wordCount);


let topKeyword = "";
let oneXKeywords = [];
let twoXKeywords = [];
let threeXKeywords = [];



function wordCount() {

  const Textarea = document.getElementById("text").value;

  const wordCounts = Textarea.trim().split(/\s+/).filter(word => word.length > 0);
  const Words = wordCounts.length;
  const charCount = Textarea.length;
  const sentenceCount = Textarea.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  const wordsPerPage = 400;
  const pageCount = Math.ceil(Words / wordsPerPage);

  document.getElementById("word").textContent = Words;
  document.getElementById("char").textContent = charCount;
  document.getElementById("sentence").textContent = sentenceCount;
  document.getElementById("page").textContent = pageCount;

  // word density

  const keywordMap = {};
  wordCounts.forEach(word => {
    keywordMap[word] = (keywordMap[word] || 0) + 1;

    const sortedKeywords = Object.entries(keywordMap).sort((a, b) => b[1] - a[1]);
    topKeyword = sortedKeywords.length > 0 ? sortedKeywords[0][0] : "None";
    oneXKeywords = sortedKeywords.filter(([_, count]) => count === 1).map(([word]) => word);
    twoXKeywords = sortedKeywords.filter(([_, count]) => count === 2).map(([word]) => word);
    threeXKeywords = sortedKeywords.filter(([_, count]) => count === 3).map(([word]) => word);

  });
}


function KeywordList(keywords, title) {
  const keywordResultList = document.getElementById("keyword-density");
  const titleItem = document.createElement("li");
  titleItem.textContent = title;
  titleItem.style.fontWeight = "bold";
  keywordResultList.appendChild(titleItem);

  keywordResultList.innerHTML = '';

  if (Array.isArray(keywords)) {
    keywords.forEach(keyword => {
      const listItem = document.createElement("li");
      listItem.textContent = keyword;
      keywordResultList.appendChild(listItem);
    });
  }
}


function Top() {
  KeywordList([topKeyword]);

}
function OneX() {
  KeywordList(oneXKeywords);

}
function TwoX() {
  KeywordList(twoXKeywords);

}
function ThreeX() {
  KeywordList(threeXKeywords);


}
// function ClearText() {
//     document.getElementById("text").value = "";
//     document.getElementById("word").textContent = "";
//     document.getElementById("char").textContent = "";
//     document.getElementById("sentence").textContent = "";
// }
