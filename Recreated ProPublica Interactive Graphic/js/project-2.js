console.log(`it's alive!`);


// code to read in the JSON
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/drugs.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
}

loadJSON(function(json) {
    // console.log(json);
    // do something with data
    createPage(json);
    
});

// PART ONE
// Dynamically generate HTML for each drug from JSON-formatted content
// So, using the data in drugs.js, format HTML for each drug to look like the example
// and then insert that HTML into #drugs
const createPage = (data) =>{
  for(let i = 0; i < data.length; i++) { 
    let html =
      `<figure data-drug-name="${data[i].name}" data-drug-amount="${data[i].amount}">
        <img src="images/${data[i].slug}.jpg" alt="${data[i].slug}">
        <figcaption>${data[i].name}</figcaption>
        </figure>
      `;
    const drugDiv = document.querySelector("#drugs");
    drugDiv.insertAdjacentHTML("afterbegin", html);
  };
  let total = 0;
  const figures = document.querySelectorAll("figure");
  const label = document.querySelector(".label");
  const meter = document.querySelector(".meter > span");
  const totalText = document.querySelector(".total");
  
  figures.forEach(figure => {
    figure.addEventListener('click', function(e){
      const amount = parseInt(this.dataset.drugAmount);
      const name = this.dataset.drugName;
      figure.classList.toggle('selected');
      if(figure.classList.contains('selected')){
        total += amount;
        label.textContent = `${name} ${total}mg`;
      }
      else{
        total -= amount;
        label.textContent = `${total}mg`;
      }
      meterHeight = Math.floor((total/15000)*100)
      
      if(meterHeight >= 100){
        meterHeight = 100
      }
      meter.style.height =  meterHeight + "%";
      
      let color = ""
      let message = "";
      if(total < 4000){
        
      }
      else if(total < 8000){
        message = "<br>You've exceeded the FDA’s recommended maximum daily limit of acetaminophen.";
        color = "#D5B612";
        
      }
      else if(total < 15000){
        message = "<br>You've exceeded the level at which liver damage can occur if taken for several days, according to McNeil, the maker of Tylenol.";
        color = "#D17827";
      }
      else if(total >= 15000){
        message = "<br>You've exceeded the threshold toxic dose of acetaminophen. A single dose at this level can result in death, according to medical experts and literature."
        color = "#C20802"
      }
      let messageTotal = `TOTAL <span style="color:${color}">${total}</span> milligrams`;
      totalText.innerHTML = messageTotal + message;
      spanTag.style.color = color;
    })
  })
}
// NOTE: Each drug's daily limit of acetaminophen in mg

//   EXAMPLE OF WHAT THE HTML SHOULD LOOK LIKE:
//   <figure data-drug-name="Excedrin&reg;" data-drug-amount="2000">
//     	<img src="images/excedrin.jpg" alt="excedrin">
//      <figcaption>Excedrin&reg;</figcaption>
//   </figure>

// PART TWO - see css/styles.css

// PART THREE
// Connect each drug to an action:
// - updates total amount of acetaminophen taken so far (total dose)
// - select the drug visually - add a CSS class so drug appears to be selected (first column)
// - updates "lethal dose" bar's height (second column)
// - updates the bar's label (second column)
// - updates total dose and warning message (third column)



// THRESHOLDS
// total < 4000
// text is black
// No message update

// total < 8000
// text is '#D5B612'
// `You've exceeded the FDA’s recommended maximum daily limit of acetaminophen.`

// total < 15000
// text is '#D17827'
// `You've exceeded the level at which liver damage can occur if taken for several days, according to McNeil, the maker of Tylenol.`

// total >= 15000
// text is '#C20802'
// `You've exceeded the threshold toxic dose of acetaminophen. A single dose at this level can result in death, according to medical experts and literature.`

// BONUS
// Create a way for the drug to be unselected 
// and thus removed from the total / tally
