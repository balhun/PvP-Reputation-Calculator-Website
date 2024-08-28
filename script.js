    //servant = new Image(getClass().getResourceAsStream("Images/progression-bg-servant.png"));
    //guardian = new Image(getClass().getResourceAsStream("Images/progression-bg-guardian.png"));

    let ExperienceRequiredList = [
            0, 2000, 3278, 4033, 4618, 5108, 5535, 5919, 6267, 6590, 6890, 7171, 7437, 7690, 7929, 8160, 8381, 8593, 8797, 8995,
            9187, 9373, 9552, 9728, 9899, 10065, 10227, 10386, 10541, 10693, 10842, 10986, 11130, 11270, 11407, 11542, 11674, 11805, 11934, 12060,
            12184, 12306, 12428, 12546, 12663, 12779, 12892, 13005, 13117, 13227, 13335, 13443, 13547, 13652, 13806, 13883, 13960, 14059, 14159, 14257,
            14353, 14450, 14545, 14639, 14732, 14825, 14916, 15006, 15097, 15186, 15274, 15361, 15448, 15535, 15619, 15705, 15788, 15872, 15954, 16036,
            16118, 16198, 16279, 16359, 16437, 16516, 16593, 16672, 16747, 16825, 16900, 16975, 17050, 17124, 17199, 17271, 17344, 17417, 17489, 17560
    ];

    let sumLevels;

    let StreakWinExperience = [ 4200, 4675, 5190, 5688, 6600, 26353 ]; // After 5 wins, you don't get increased experience from each successive win.
    let HourglassLoweringExperience = [ 1100, 2640, 4680, 7800, 16220 ]; // +3000 xp after 4 streak

    //Flag Experience
    let gradeOne = 600;
    let gradeTwo = 1200;
    let gradeThree = 1800;
    let gradeFour = 2400;
    let gradeFive = 3000;

    let yourLevel = 100;
    let battlesWon;
    let gradeV;
    let gradeIV;
    let gradeIII;
    let gradeII;
    let gradeI;
    let xpGain;

    let levelSet = false;
    let xpSet = false;

    function initialize() {
        //choiceBox.getItems().addAll("Servant", "Guardian");
        //choiceBox.setValue("Servant");
        //choiceBox.setOnAction(this::getChoice);
        //lbLevel.setFont(Font.loadFont(getClass().getResourceAsStream("Font/Windlass.ttf"), 40));
        //lbXpRequired.setFont(Font.loadFont(getClass().getResourceAsStream("Font/Windlass.ttf"), 15));
        //lbXpRequired.setText(calculateXpRequired() + " xp");

        const canvas = document.getElementById("arc");
        const ctx = canvas.getContext("2d");

        ctx.arc(125, 125, 98, 0, 2 * Math.PI);
        ctx.lineWidth = 25;
        ctx.strokeStyle = "#fe7e56";
        ctx.rotate(90);
        ctx.stroke();
    }
/*
    function getChoice(event) {
        if (choiceBox.getValue().equals("Servant")) ImgProgress.setImage(servant);
        else ImgProgress.setImage(guardian);
    }

    function onLevelSet() {
        try {
            if (!tfLevelXp.getText().isEmpty() && !tfGoalLevel.getText().isEmpty()) {
                let Intlevel = Integer.parseInt(tfLevelXp.getText());
                let IntGoalLevel = Integer.parseInt(tfGoalLevel.getText());
                if (Intlevel > 0 && Intlevel < 10000 && IntGoalLevel > Intlevel) {
                    lbXpRequired.setText(calculateXpDifference(Intlevel, IntGoalLevel) + " xp");
                }
            }
        } catch (error) { }
    }

    function onSetGoalLevel() {
        try {
            if (!tfLevelXp.getText().isEmpty() && !tfGoalLevel.getText().isEmpty()) {
                let Intlevel = Integer.parseInt(tfLevelXp.getText());
                let IntGoalLevel = Integer.parseInt(tfGoalLevel.getText());
                if (IntGoalLevel > 0 && IntGoalLevel < 10000 && IntGoalLevel > Intlevel) {
                    lbXpRequired.setText(calculateXpDifference(Intlevel, IntGoalLevel) + " xp");
                }
            }
        } catch (error) { System.out.println("e = " + e); }
    }

    function calcSumLevels(index) {
        sumLevels = 0;
        for (let i = 0; i < index; i++) sumLevels += ExperienceRequiredList[i];
        return sumLevels;
    }

    function calculateXpDifference(currentIndex, goalIndex) {
        let sumLevelsCurrent = 0;
        let sumLevelsGoal = 0;
        if (currentIndex < 100) for (let i = 0; i < currentIndex; i++) sumLevelsCurrent += ExperienceRequiredList[i];
        else {
            sumLevelsCurrent = calcSumLevels(100) + (currentIndex-100) * 12600;
        }
        if (goalIndex < 100) for (let i = 0; i < goalIndex; i++) sumLevelsGoal += ExperienceRequiredList[i];
        else {
            sumLevelsGoal = calcSumLevels(100) + (goalIndex-100) * 12600;
        }
        let xpDifference = sumLevelsGoal - sumLevelsCurrent;
        let strXp = String.format("%,d", xpDifference).replace(',', ' ');

        return strXp;
    }

    function calculateXpRequired() {
        let xpRequired = 0;
        let level = Integer.parseInt(tfLevelXp.getText());
        if (level < 100) xpRequired = calcSumLevels(level);
        else xpRequired = calcSumLevels(100) + (level-100) * 12600;
        let strXp = String.format("%,d", xpRequired).replace(',', ' ');
        return strXp;
    }

    function onUseYourLevel() {
        try {
            if (!tfYourLevel.getText().isEmpty()) {
                let Intlevel = Integer.parseInt(tfYourLevel.getText());
                if (Intlevel > 0 && Intlevel < 10000) {
                    if (Intlevel > 999) {
                        //StringBuilder stringLevel = new StringBuilder(tfYourLevel.getText());
                        stringLevel.insert(1, ".");
                        lbLevel.setText(stringLevel.toString());
                    } else { lbLevel.setText(tfYourLevel.getText()); }
                    yourLevel = Intlevel;

                    levelSet = true;
                    isLevelXpSet();

                    battlesWon = 0;  lbBattlesWon.setText("0");
                    gradeV = 0;  lbGradeV.setText("0");
                    gradeIV = 0;  lbGradeIV.setText("0");
                    gradeIII = 0;  lbGradeIII.setText("0");
                    gradeII = 0;  lbGradeII.setText("0");
                    gradeI = 0;  lbGradeI.setText("0");
                    cbHourglassLowered.setSelected(false);
                    lbPotentialFlagXpLoss.setText("");
                    lbXpGain.setText("");
                    lbLevelGain.setText("");
                    lbPotentialXpLoss.setText("");
                    srXpSlider.setDisable(false);
                    srXpSlider.setValue(0);
                    arc.setLength(360);
                }
            }
        } catch (error) {}
    }

    function onSliderDetected() {
        if (srXpSlider.getValue() > 0.0 && srXpSlider.getValue() < 360.0) {
            xpSet = true;
            arc.setLength(360-srXpSlider.getValue());
        } else {
            xpSet = false;
            arc.setLength(360-srXpSlider.getValue());
        }


        isLevelXpSet();

        return translateAngleToXp(srXpSlider.getValue());
    }

    function onSliderReleased() {
        if (srXpSlider.getValue() > 0.0 && srXpSlider.getValue() < 360.0) {
            srXpSlider.setDisable(true);
        }
    }


    function onClickBattlesWonPlus() {
        if (battlesWon < 99) battlesWon++;
        lbBattlesWon.setText(battlesWon+"");

        calculateXpGained();
    }

    function onClickBattlesWonMinus() {
        if (battlesWon > 0) battlesWon--;
        lbBattlesWon.setText(battlesWon+"");

        calculateXpGained();
    }


    function onClickGradeVPlus() {
        if (gradeV < 99) gradeV++;
        lbGradeV.setText(gradeV+"");

        calculateXpGained();
    }

    function onClickGradeVMinus() {
        if (gradeV > 0) gradeV--;
        lbGradeV.setText(gradeV+"");

        calculateXpGained();
    }


    function onClickGradeIVPlus() {
        if (gradeIV < 99) gradeIV++;
        lbGradeIV.setText(gradeIV+"");

        calculateXpGained();
    }

    function onClickGradeIVMinus() {
        if (gradeIV > 0) gradeIV--;
        lbGradeIV.setText(gradeIV+"");

        calculateXpGained();
    }


    function onClickGradeIIIPlus() {
        if (gradeIII < 99) gradeIII++;
        lbGradeIII.setText(gradeIII+"");

        calculateXpGained();
    }

    function onClickGradeIIIMinus() {
        if (gradeIII > 0) gradeIII--;
        lbGradeIII.setText(gradeIII+"");

        calculateXpGained();
    }


    function onClickGradeIIPlus() {
        if (gradeII < 99) gradeII++;
        lbGradeII.setText(gradeII+"");

        calculateXpGained();
    }

    function onClickGradeIIMinus() {
        if (gradeII > 0) gradeII--;
        lbGradeII.setText(gradeII+"");

        calculateXpGained();
    }


    function onClickGradeIPlus() {
        if (gradeI < 99) gradeI++;
        lbGradeI.setText(gradeI+"");

        calculateXpGained();
    }

    function onClickGradeIMinus() {
        if (gradeI > 0) gradeI--;
        lbGradeI.setText(gradeI+"");

        calculateXpGained();
    }


    function onClickHourglassLowered() { calculateXpGained(); }


    function onClickGoldAndGlory() { calculateXpGained(); }


      function setImageLevel(level) {
        if (level > 0 && level < 10000) {
            if (level > 999) {
                //StringBuilder stringLevel = new StringBuilder(level+"");
                stringLevel.insert(1, ".");
                lbLevel.setText(stringLevel.toString());
            } else { lbLevel.setText(level+""); }
        }
    }

    function reverseLvlSearch(xp) {
        let i = yourLevel;
        while (xp > 0) {
            if (i < 100) xp -= ExperienceRequiredList[i];
            else xp -= 12600;
            if (xp >= 0) {
                i++;
            }
        }

        let xpLeft = 0;
        if (yourLevel < 100) xpLeft = xp + ExperienceRequiredList[i];
        else xpLeft = xp + 12600;
        xpLeft = Math.abs(xpLeft);
        arc.setLength(360 - translateXpToAngle(xpLeft, i));
        setImageLevel(i);
        return i;
    }

    function translateAngleToXp(angle) {
        let anglePercentage = angle / 360;
        let xpPerAngle = 0;
        if (yourLevel < 100) xpPerAngle = ExperienceRequiredList[yourLevel] * anglePercentage;
        else xpPerAngle = 12600 * anglePercentage;

        return xpPerAngle;
    }

    function translateXpToAngle(xp, level) {
        let xpPercentage = 0;
        if (level < 100) xpPercentage = xp / ExperienceRequiredList[level];
        else xpPercentage = xp / 12600;

        let anglePerXp = 0;
        if ((360 * xpPercentage) == 360) anglePerXp = 0;
        else anglePerXp = 360 * xpPercentage;

        return anglePerXp;
    }

    function isLevelXpSet() {
        if (levelSet && xpSet) {
            battlesWonMinus.setDisable(false);
            battlesWonPlus.setDisable(false);
            gradeVPlus.setDisable(false);
            gradeVMinus.setDisable(false);
            gradeIVPlus.setDisable(false);
            gradeIVMinus.setDisable(false);
            gradeIIIPlus.setDisable(false);
            gradeIIIMinus.setDisable(false);
            gradeIIPlus.setDisable(false);
            gradeIIMinus.setDisable(false);
            gradeIPlus.setDisable(false);
            gradeIMinus.setDisable(false);
            cbHourglassLowered.setDisable(false);
            cbGoldAndGlory.setDisable(false);

        } else {
            battlesWonMinus.setDisable(true);
            battlesWonPlus.setDisable(true);
            gradeVPlus.setDisable(true);
            gradeVMinus.setDisable(true);
            gradeIVPlus.setDisable(true);
            gradeIVMinus.setDisable(true);
            gradeIIIPlus.setDisable(true);
            gradeIIIMinus.setDisable(true);
            gradeIIPlus.setDisable(true);
            gradeIIMinus.setDisable(true);
            gradeIPlus.setDisable(true);
            gradeIMinus.setDisable(true);
            cbHourglassLowered.setDisable(true);
            cbGoldAndGlory.setDisable(true);

        }
    }





    function calculateXpGained() {
        let xpGain = 0;

        let loweringLoss = 0;
        let flagLoss = 0;
        if (battlesWon < StreakWinExperience.length) for (let i = 0; i < battlesWon; i++) xpGain += StreakWinExperience[i];
        else xpGain = StreakWinExperience[5] + (battlesWon-5) * 6600;
        xpGain += gradeV * gradeFive;
        xpGain += gradeIV * gradeFour;
        xpGain += gradeIII * gradeThree;
        xpGain += gradeII * gradeTwo;
        xpGain += gradeI * gradeOne;
        if (cbHourglassLowered.isSelected()) {
            if (battlesWon < 4) for (let i = 0; i < battlesWon; i++) xpGain += HourglassLoweringExperience[i];
            else xpGain += HourglassLoweringExperience[4] + (battlesWon-4) * 3000;
            lbPotentialXpLoss.setText("");
        } else {
            if (battlesWon < 4) for (let i = 0; i < battlesWon; i++) loweringLoss += HourglassLoweringExperience[i];
            else loweringLoss += HourglassLoweringExperience[4] + (battlesWon-4) * 3000;

            if (loweringLoss > 0) lbPotentialXpLoss.setText("Xp loss if sunk: " + loweringLoss);
            else lbPotentialXpLoss.setText("");
        }
        flagLoss += gradeV * gradeFive;
        flagLoss += gradeIV * gradeFour;
        flagLoss += gradeIII * gradeThree;
        flagLoss += gradeII * gradeTwo;
        flagLoss += gradeI * gradeOne;

        if (flagLoss > 0) lbPotentialFlagXpLoss.setText("Flag xp loss if sunk: " + flagLoss);
        else lbPotentialFlagXpLoss.setText("");


        xpGain += onSliderDetected();

        if (cbGoldAndGlory.isSelected()) xpGain *= 2;



        lbXpGain.setText("Xp gained: " + xpGain);
        lbLevelGain.setText("Level gained: " + reverseLvlSearch(xpGain));
    }*/