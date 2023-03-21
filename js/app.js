// app.js is only for application functions, variables, and objects. 
// Any consistent data that would ideally be stored in a DB should be kept in data.js for now until an actual DB is setup
// Please keep each section aplphabetical

/************************
 Global vars & objects
************************/
let dataPresent = false;

let charactersIndex = -1;
let characters = [];


let item = {
    "id": 0,
    "name" : "Item",
    "power": 0,
    "description": "N/A",
    "type": "item",
    "held": false,
    "unique": false,
    "owner": "none",
    "bonuses": []
}

let log = {
    "logEntries": []
}

let stat = {
    "name": "stat",
    "rank": 0
}


/**********
 On Load
**********/
window.onload=function() {
    loadDefaultImage();
}



/************
 Functions
************/
function addLogEntry() {
    alert('To be implemented')
}

function addXP() {
    if (charactersIndex === -1) {
        alert('Please Load a Character')
        return;
    }
    let experience = document.getElementById("xp-new").value;
    //console.log(`New xp: ${xp}`);
    let tempChar = characters[charactersIndex];
    tempChar.xp += parseInt(experience);
    document.getElementById("xp-total").innerText = tempChar.xp;
    document.getElementById("xp-remaining").innerText = tempChar.xp - tempChar.xpSpent;
    characters[charactersIndex] = tempChar;
}

function closeCharacter() {
    alert('To be implemented')
}

function exportAllCharFiles() {
    const output = document.getElementById('exportAllCharFile');
    alert('To be implemented')
}

function exportCharFile() {
    const output = document.getElementById('exportCharFile');
    alert('To be implemented')
}

function importCharFile() {
    const input = document.getElementById('importCharFile');
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(){
      const data = JSON.parse(reader.result);
      charactersIndex += 1;
      importCharacterData(data);
      dataPresent = true;
      manipulateCSS();
    };
    reader.readAsText(file);
}

function importCharacterData(data) {
    //New object in characters array
    //let tempChar = char;
    let tempChar = {};

    tempChar.name = data.name;
    tempChar.nickname = data.nickname;
    tempChar.profileImage = data.profileImage;
    tempChar.suitName = data.suitName;
    tempChar.inSuit = data.inSuit;
    tempChar.xp = data.xp;
    tempChar.xpSpent = data.xpSpent;
    tempChar.damage = data.damage;
    tempChar.energySpent = data.energySpent;
    tempChar.archtype = data.archtype;
    tempChar.traits = [];
    for (let item of data.traits) {
        tempChar.traits.push(item);
    }
    tempChar.inventory = [];
    for (let item of data.inventory) {
        tempChar.inventory.push(item);
    }
    characters.push(tempChar);

    //Page updates
    updateCharacterPage();
}

function loadDefaultImage() {
    document.getElementById("profile-pic").src = 'images/' + (Math.floor(Math.random() * 5) + 1) + '.png';
}

function login() {
    alert('To be implemented')
}

function manipulateCSS() {
    if (dataPresent) {
        //TODO Show import button
    } else {
        //TODO Turn import into drop down and show characters
    }
}

function updateCharacterPage() {
    document.getElementById("char-name").innerText = characters[charactersIndex].name;
    if (characters[charactersIndex].nickname) {
        document.getElementById("char-nickname").innerText = "a.k.a " + characters[charactersIndex].nickname;
    } else {
        document.getElementById("char-nickname").innerText = "";
    }
    if (characters[charactersIndex].profileImage) {
        document.getElementById("profile-pic").src = characters[charactersIndex].profileImage;
    }
    document.getElementById("suit-name").innerText = characters[charactersIndex].suitName;
    document.getElementById("in-suit").checked = characters[charactersIndex].inSuit;
    updateSuitStatus();
    document.getElementById("xp-total").innerText = characters[charactersIndex].xp;
    document.getElementById("xp-spent").innerText = characters[charactersIndex].xpSpent;
    document.getElementById("xp-remaining").innerText = characters[charactersIndex].xp - characters[charactersIndex].xpSpent;
    document.getElementById("archtype").innerText = characters[charactersIndex].archtype;
    for (let item of characters[charactersIndex].traits) {
        document.getElementById(`trait-${item.tier}`).innerText = characters[charactersIndex].traits[item.tier - 1].name;
    }
    
    /* TODO
    Add damage and health (Need to calculate max)
    Add energy spent and total (Need to calculate max)
    Stats
    Inventory
    */
    // Navbar changes
    if (characters.length === 1) {
        document.getElementById("import-btn").innerText = characters[0].name + ' | +';
    } else if (characters.length > 1) {
        // Show character dropdown & hide import button
        document.getElementById("import-btn").hidden = true;
        document.getElementById("character-dropdown").hidden = false;
    }
}

function updateSuitStatus() {
    characters[charactersIndex].inSuit = document.getElementById("in-suit").checked;
    if (characters[charactersIndex].inSuit) {
        document.getElementById("suit-status-text").innerText = "in";
    } else {
        document.getElementById("suit-status-text").innerText = "out of";
    }
    alert('To be fully implemented')
}


/****************************
 Customized event Listeners
*****************************/
document.getElementById('add-xp-form').addEventListener('submit', function(e) {
    e.preventDefault(); //to prevent form submission
    document.getElementById('xp-new').value = "";
});




/* Testing Stuff */
// Disables all form submits
/*
$(document).ready(function() {
    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
      }
    });
  });
*/

