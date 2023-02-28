// Only for database style functionality, such as managing character ids, archetype data, and other character independent data
// that is best left outside of app.jsAthletics

/************
 Constants
************/
const strengthABV = "STR";
const spiritPwrABV = "SP";
const agilityABV = "AGI";
const vitalityABV = "VIT";
const wisdomABV = "WIS";
const intelligenceABV = "INT";

const diceArray = [4, 6, 8, 10, 12];

const skillMap = {
    strength: ["Martial Arts","Athletics","Block","Intimidation","Grapple"],
    spiritPower: ["Meditate","Sense","Focus"],
    agility: ["Reflex", "Jump", "Throw", "Stealth", "Coordination"],
    vitality: ["Fortitude", "Endurance", "Metabolism", "Regeneration"],
    wisdom: ["Concentration", "Perception", "Personality", "Intuition", "Craftsmanship", "Tracking"],
    intelligence: ["Medicine", "Technology", "Firearms", "Engineering", "Knowledge", "Cunning"]
}

const mechSkillMap = {
    strength: ["Mech Combat","Athletics","Mitigation","Intimidation","Grapple"],
    spiritPower: ["Meditate","Sense","Focus"],
    agility: ["Maneuvering", "Jump", "Throw", "Stealth", "Coordination"],
    vitality: ["Fortitude", "Endurance", "Metabolism", "Regeneration"],
    wisdom: ["Concentration", "Perception", "Personality", "Intuition", "Craftsmanship", "Tracking"],
    intelligence: ["Medicine", "Operation", "Artillery", "Engineering", "Knowledge", "Cunning"]
}



/************
 Formulas
************/
function currentHealth(maxHealth, lifeBars, damage) {
    let health = parseInt(maxHealth)*parseInt(lifeBars) - parseInt(damage);
    if (health > 0) {
        return health;
    } else {
        return 0;
    }
}

function coreAttributeValue(archtypeBonus, traitBonus, techniqueBonus, transformationBonus, itemBonus, statsBonus) {
    return parseInt(archtypeBonus) + parseInt(traitBonus) + parseInt(techniqueBonus) + parseInt(transformationBonus) + parseInt(itemBonus) + parseInt(statBonuses);
}

function coreAttributeStatBonus(statArray, sgModifier) {
    return statArray.reduce((a, b) => a + b, 0) * parseFloat(sgModifier);
}

function maxHealth(baseHP, vitality, vitalityRanks, zRanks) {
    return 30 + parseInt(baseHP)*parseInt(vitality) + 5*parseInt(vitalityRanks) + 50*parseInt(zRanks);
}

function rankUpCost(affinity, skillRank) {
    return affinity + affinity*skillRank;
}

function skillRollRange(coreAttributeValue, skillRank) {
    let min = parseInt(coreAttributeValue) + Math.floor(1 + 0.2 * skillRank);
    let max = parseInt(coreAttributeValue) + 4 + 2*skillRank + 2*Math.floor(skillRank/5);
    return [min, max]; 
}

