const TextArea = document.getElementById("text");

TextArea.addEventListener("input", wordCount);

const keywordResultList = document.getElementById("keyword-density");
const topWords = document.getElementById("topWords");
topWords.addEventListener("click", Top);
const oneXWords = document.getElementById("oneXWords");
oneXWords.addEventListener("click", OneX);
const twoXWords = document.getElementById("twoXWords");
twoXWords.addEventListener("click", TwoX);
const threeXWords = document.getElementById("threeXWords");
threeXWords.addEventListener("click", ThreeX);

let topKeywords = "";
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

  if (Textarea.trim() === "") {
    Clear();
    return;
  }

  // word density
  const keywordMap = {};
  wordCounts.forEach(word => {
    keywordMap[word] = (keywordMap[word] || 0) + 1;
  });

  const sortedKeywords = Object.entries(keywordMap).sort((a, b) => b[1] - a[1]);
  topKeywords = sortedKeywords.length > 0 ? sortedKeywords.sort((a, b) => b[1] - a[1]) : "";
  oneXKeywords = sortedKeywords.filter(([_, count]) => count === 1);
  twoXKeywords = sortedKeywords.filter(([_, count]) => count === 2);
  threeXKeywords = sortedKeywords.filter(([_, count]) => count === 3);

  // updateKeywordList();
  setActive(topWords);
  KeywordList(topKeywords);
}


function Top() {
  setActive(topWords);
  KeywordList(topKeywords);
}
function OneX() {
  setActive(oneXWords);
  KeywordList(oneXKeywords);
}
function TwoX() {
  setActive(twoXWords);
  KeywordList(twoXKeywords);
}
function ThreeX() {
  setActive(threeXWords);
  KeywordList(threeXKeywords);
}

function Clear() {
  keywordResultList.innerHTML = '';
}

function KeywordList(keywords) {

  Clear();


  if (Array.isArray(keywords)) {
    keywords.slice(0, 6).forEach((keyword) => {
      keywordResultList.innerHTML += `<li>${keyword[0]} <Span>${keyword[1]}</Span></li>`
    });
  }
}

function setActive(active){

    const buttons = document.querySelectorAll(".keyword-density-buttons button");
    buttons.forEach((button) => {
        button.classList.remove("active");
    });
    active.classList.add("active");
}