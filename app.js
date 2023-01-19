// app.js is only for application functions, variables, and objects. 
// Any consistent data that would ideally be stored in a DB should be kept in data.js for now until an actual DB is setup

let dataPresent = false;

let charactersIndex = -1;
let characters = [];


const char = {
    "id": 0,
    "name": "Character",
    "nickname": "Snagglepuss",
    "suitName": "Waffle",
    "inSuit": false,
    "xp": 0,
    "xpSpent": 0,
    "damage": 0,
    "energySpent": 0,
    "stats": [],
    "inventory": []
}


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

let stat = {
    "name": "stat",
    "rank": 0
}

let log = {
    "logEntries": []
}

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

function handleFiles() {
    const input = document.getElementById('getFile');
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
    let tempChar = char;
    tempChar.name = data.name;
    tempChar.nickname = data.nickname;
    tempChar.suitName = data.suitName;
    tempChar.inSuit = data.inSuit;
    tempChar.xp = data.xp;
    tempChar.xpSpent = data.xpSpent;
    tempChar.damage = data.damage;
    tempChar.energySpent = data.energySpent;
    for (let item of data.inventory) {
        tempChar.inventory.push(item);
    }
    characters.push(tempChar);

    //Page updates
    updateCharacterPage();
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
    document.getElementById("suit-name").innerText = characters[charactersIndex].suitName;
    document.getElementById("in-suit").checked = characters[charactersIndex].inSuit;
    updateSuitStatus();
    document.getElementById("xp-total").innerText = char.xp;
    document.getElementById("xp-spent").innerText = characters[charactersIndex].xpSpent;
    document.getElementById("xp-remaining").innerText = characters[charactersIndex].xp - characters[charactersIndex].xpSpent;
    /* TODO
    Add damage and health (Need to calculate max)
    Add energy spent and total (Need to calculate max)
    Stats
    Inventory
    */
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