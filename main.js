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
    let wins = []
    for (i=0; i<Math.max(rollsAttack.length, rollsDefend.length); i++) {
        wins[i] = 'N';
    };
    for (i=0; i<Math.min(rollsAttack.length, rollsDefend.length); i++) {
        if (rollsAttack[i] > rollsDefend[i]) {
            lossDefend++;
            wins[i] = 'A';
        }
        else {
            lossAttack++;
            wins[i] = 'D'
        }
    }

    console.log(' ');
    console.log(wins);
    console.log(' ');

    return [lossAttack, lossDefend, wins];
}


function getSoldierImage(roll) {
    let DOM_img = document.createElement("img");
    DOM_img.src = "img/soldier.png";
    DOM_img.height = 40;
    DOM_img.width = 25;
    DOM_img.hspace = 0;
    DOM_img.vspace = 0;
    return DOM_img
}


function getDieImage(roll, color) {
    let img_div = document.createElement("div");
    let img_color = document.createElement("img");
    let img = document.createElement("img");
    img_div.className = "die-image-parent";
    img_color.className = "die-image-color";
    img.className = "die-image";
    img_color.src = "img/" + color + ".png";
    img.src = "img/die_" + roll.toString() + ".png";
    console.log(img.src);
    img_div.append(img_color, img);
    return img_div;
}


function getDieImageInBattle(roll, attack_or_defend, result) {
    
}


// Render the results from a single set of rolls
function renderRoundInfo(roundInfoDict) {

    let d = roundInfoDict;    // Make code concise
    let results_row = document.createElement("div");
    results_row.className = "results-row";

    // First column, labels
    let c1 = document.createElement("div");
    c1.className = "col-1";
    c1.append(document.createElement("br"),
              document.createTextNode("Attack"),
              document.createElement("br"),
              document.createElement("br"),
              document.createTextNode("Defense"),
              document.createElement("br"));

    // Second column, dice rolls
    c2 = document.createElement("div");
    c2.className = "col-2";
    for (i=0; i<d.rollsAttack.length; i++) {
        c2.append(getDieImage(d.rollsAttack[i], "green"));
    }
    c2.append(document.createElement("br"));
    for (i=0; i<d.rollsDefend.length; i++) {
        c2.append(getDieImage(d.rollsDefend[i], "red"));
    }
    

    // par.appendChild(document.createTextNode("Round number "+d.roundNumber));
    // par.appendChild(document.createElement("br"));
    // par.appendChild(document.createTextNode("Units left: "
    //                                         + d.unitsAttackLeftAtStart + " "
    //                                         + d.unitsDefendLeftAtStart));
    // par.appendChild(document.createElement("br"));
    // for (i=0; i<d.unitsAttackLeftAtStart; i++) {
    //     par.appendChild(getSoldierImage())
    // }
    // par.appendChild(document.createElement("br"));
    // for (i=0; i<d.unitsDefendLeftAtStart; i++) {
    //     par.appendChild(getSoldierImage())
    // }
    // par.appendChild(document.createElement("br"));
    // par.appendChild(document.createTextNode("Units used: "
    //                                         + d.unitsAttackRound + " "
    //                                         + d.unitsDefendRound));
    // par.appendChild(document.createElement("br"));
    // par.appendChild(document.createTextNode("Rolls attack: "));
    // par.appendChild(document.createElement("br"));
    // for (i=0; i<d.rollsAttack.length; i++) {
    //     par.appendChild(getDieImage(d.rollsAttack[i]));
    // }
    // par.appendChild(document.createElement("br"));
    // par.appendChild(document.createTextNode("Rolls defend: "));
    // par.appendChild(document.createElement("br"));
    // for (i=0; i<d.rollsDefend.length; i++) {
    //     par.appendChild(getDieImage(d.rollsDefend[i]));
    // }
    // par.appendChild(document.createElement("br"));
    // par.appendChild(document.createTextNode("Units lost: "
    //                                         + d.lossAttack + " "
    //                                         + d.lossDefend));
    // par.appendChild(document.createElement("br"));
    // par.appendChild(document.createTextNode("Units left: "
    //                                         + d.unitsAttackLeftAtEnd + " "
    //                                         + d.unitsDefendLeftAtEnd));
    // par.appendChild(document.createElement("br"));

    results_row.appendChild(c1);
    results_row.appendChild(c2);
    document.getElementById("div_results").appendChild(results_row);
    document.getElementById("div_results").append(
        document.createElement("br"),
        document.createElement("br"),
    );
    
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
        [lossAttack, lossDefend, wins] = battleOneRound(unitsAttackRound,
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
        roundInfoDict.wins = wins;
        roundInfoDict.unitsAttackLeftAtEnd = unitsAttackLeft;
        roundInfoDict.unitsDefendLeftAtEnd = unitsDefendLeft;

        // Render the round info into HTML
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
