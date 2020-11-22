function isPositiveInt(mynumber) {
    return (Number.isInteger(mynumber) && mynumber > 0);
}


function arePositiveInts(mynumber1, mynumber2) {
    return (isPositiveInt(mynumber1) && isPositiveInt(mynumber2));
}


// Roll the dice for one round of battle
function rollDice(unitsAttack, unitsDefend, roundInfoDict) {
    // Determine the rolls for attacker and defender and sort them
    // from highest to lowest
    let rollsAttack = Array(unitsAttack).fill(0);
    let rollsDefend = Array(unitsDefend).fill(0);
    for (i=0; i<rollsAttack.length; i++)
        rollsAttack[i] = Math.floor(Math.random() * 6) + 1;
    for (i=0; i<rollsDefend.length; i++)
        rollsDefend[i] = Math.floor(Math.random() * 6) + 1;
    rollsAttack.sort().reverse();
    rollsDefend.sort().reverse();

    // Add the rolls to the info about the round
    roundInfoDict.rollsAttack = rollsAttack;
    roundInfoDict.rollsDefend = rollsDefend;

    return [rollsAttack, rollsDefend];
}


// Determine the losses from one round of battle
function battleOneRound(unitsAttack, unitsDefend, roundInfoDict) {

    let [rollsAttack, rollsDefend] = rollDice(unitsAttack, unitsDefend,
                                              roundInfoDict);

    // Determine the losses to both the attacker and defender
    let lossAttack = 0;
    let lossDefend = 0;
    for (i=0; i<Math.min(rollsAttack.length, rollsDefend.length); i++) {
        if (rollsAttack[i] > rollsDefend[i])
            lossDefend++;
        else
            lossAttack++;
    }

    return [lossAttack, lossDefend];
}


function getSoldierImage(roll) {
    let DOM_img = document.createElement("img");
    DOM_img.src = "img/soldier.png";
    DOM_img.height = 50;
    DOM_img.width = 30;
    DOM_img.hspace = 5;
    DOM_img.vspace = 5;
    return DOM_img
}


function getDieImage(roll) {
    let DOM_img = document.createElement("img");
    DOM_img.src = "img/die_" + roll.toString() + ".png";
    DOM_img.height = 50;
    DOM_img.width = 50;
    DOM_img.hspace = 5;
    DOM_img.vspace = 5;
    return DOM_img
}


function renderRoundInfo(roundInfoDict) {
    d = roundInfoDict;    // Make code concise
    par = document.createElement("p");

    par.appendChild(document.createTextNode("Round number "+d.roundNumber));
    par.appendChild(document.createElement("br"));
    par.appendChild(document.createTextNode("Units left: "
                                            + d.unitsAttackLeftAtStart + " "
                                            + d.unitsDefendLeftAtStart));
    par.appendChild(document.createElement("br"));
    for (i=0; i<d.unitsAttackLeftAtStart; i++) {
        par.appendChild(getSoldierImage())
    }
    par.appendChild(document.createElement("br"));
    par.appendChild(document.createTextNode("Units used: "
                                            + d.unitsAttackRound + " "
                                            + d.unitsDefendRound));
    par.appendChild(document.createElement("br"));
    par.appendChild(document.createTextNode("Rolls attack: "));
    par.appendChild(document.createElement("br"));
    for (i=0; i<d.rollsAttack.length; i++) {
        par.appendChild(getDieImage(d.rollsAttack[i]));
    }
    par.appendChild(document.createElement("br"));
    par.appendChild(document.createTextNode("Rolls defend: "));
    par.appendChild(document.createElement("br"));
    for (i=0; i<d.rollsDefend.length; i++) {
        par.appendChild(getDieImage(d.rollsDefend[i]));
    }
    par.appendChild(document.createElement("br"));
    par.appendChild(document.createTextNode("Units lost: "
                                            + d.lossAttack + " "
                                            + d.lossDefend));
    par.appendChild(document.createElement("br"));
    par.appendChild(document.createTextNode("Units left: "
                                            + d.unitsAttackLeftAtEnd + " "
                                            + d.unitsDefendLeftAtEnd));
    par.appendChild(document.createElement("br"));
    document.getElementById("div_results").appendChild(par);
    
}


function battleUntilEnd(unitsAttackTotal, unitsDefendTotal) {

    if (!arePositiveInts(unitsAttackTotal, unitsDefendTotal))
        return "[ERROR] Both player units should be positive whole numbers.";

    // Create new variables (*not* references to the same object -- these
    // are different variables) that track the amount of units left
    let unitsAttackLeft = unitsAttackTotal;
    let unitsDefendLeft = unitsDefendTotal;
    let lossAttack;
    let lossDefend;
    let roundNumber = 1;
    let par;

    while (Math.min(unitsAttackLeft, unitsDefendLeft) > 0) {
        let roundInfoDict = {};
        roundInfoDict.roundNumber = roundNumber;
        roundInfoDict.unitsAttackLeftAtStart = unitsAttackLeft;
        roundInfoDict.unitsDefendLeftAtStart = unitsDefendLeft;

        // Do the actual battle
        let unitsAttackRound = Math.min(unitsAttackLeft, 3);
        let unitsDefendRound = Math.min(unitsDefendLeft, 2);
        [lossAttack, lossDefend] = battleOneRound(unitsAttackRound,
                                                  unitsDefendRound,
                                                  roundInfoDict);
        unitsAttackLeft -= lossAttack;
        unitsDefendLeft -= lossDefend;
        roundNumber++;

        // Add info to the dictionary summarising this round
        roundInfoDict.unitsAttackRound = unitsAttackRound;
        roundInfoDict.unitsDefendRound = unitsDefendRound;
        roundInfoDict.lossAttack = lossAttack;
        roundInfoDict.lossDefend = lossDefend;
        roundInfoDict.unitsAttackLeftAtEnd = unitsAttackLeft;
        roundInfoDict.unitsDefendLeftAtEnd = unitsDefendLeft;

        renderRoundInfo(roundInfoDict);

        console.log(roundInfoDict);
    }

    return 0;
}


function battleFromBattleButton() {
    let unitsAttackTotal = (
        Number(document.getElementById("in_attack_units").value)
    );
    let unitsDefendTotal = (
        Number(document.getElementById("in_defend_units").value)
    );
    let output = battleUntilEnd(unitsAttackTotal, unitsDefendTotal);

    console.log(0);
}
