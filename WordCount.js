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
  topKeyword = sortedKeywords.length > 0 ? sortedKeywords[0][0] : "None";
  oneXKeywords = sortedKeywords.filter(([_, count]) => count === 1).map(([word]) => word);
  twoXKeywords = sortedKeywords.filter(([_, count]) => count === 2).map(([word]) => word);
  threeXKeywords = sortedKeywords.filter(([_, count]) => count === 3).map(([word]) => word);

  updateKeywordList();
}

function updateKeywordList() {
  const keywordResultList = document.getElementById("keyword-density");
  keywordResultList.innerHTML = ''; // Clear existing content

  // Create and append top keyword list item
  const topItem = document.createElement("li");
  topItem.textContent = `Top Keyword: ${topKeyword}`;
  keywordResultList.appendChild(topItem);

  // Create an ordered list (numbered) for oneXKeywords, twoXKeywords, and threeXKeywords with a max of 10 items
  const maxItems = 10;

  // Create and append oneXKeywords list
  if (oneXKeywords.length > 0) {
    const oneXTitle = document.createElement("li");
    oneXTitle.textContent = "Keywords appearing once:";
    oneXTitle.style.fontWeight = "bold";
    keywordResultList.appendChild(oneXTitle);

    const oneXList = document.createElement("ol");
    oneXKeywords.slice(0, maxItems).forEach((keyword, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = keyword;
      oneXList.appendChild(listItem);
    });
    keywordResultList.appendChild(oneXList);
  }

  // Create and append twoXKeywords list
  if (twoXKeywords.length > 0) {
    const twoXTitle = document.createElement("li");
    twoXTitle.textContent = "Keywords appearing twice:";
    twoXTitle.style.fontWeight = "bold";
    keywordResultList.appendChild(twoXTitle);

    const twoXList = document.createElement("ol");
    twoXKeywords.slice(0, maxItems).forEach((keyword, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = keyword;
      twoXList.appendChild(listItem);
    });
    keywordResultList.appendChild(twoXList);
  }

  // Create and append threeXKeywords list
  if (threeXKeywords.length > 0) {
    const threeXTitle = document.createElement("li");
    threeXTitle.textContent = "Keywords appearing three times:";
    threeXTitle.style.fontWeight = "bold";
    keywordResultList.appendChild(threeXTitle);

    const threeXList = document.createElement("ol");
    threeXKeywords.slice(0, maxItems).forEach((keyword, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = keyword;
      threeXList.appendChild(listItem);
    });
    keywordResultList.appendChild(threeXList);
  }
}

function Clear() {
  const keywordResultList = document.getElementById("keyword-density");
  keywordResultList.innerHTML = '';
}
