window.onload = function () {


    //-----------------------------Popup------------------------------------
    function showpopup() {
        setTimeout(() => {
            document.querySelector('.pop-up-box').style.visibility = 'visible'
            document.querySelector('.pop-up').classList.add('active');
        }, 1000);

        document.querySelectorAll('.close')[0].addEventListener('click', function () {
            document.querySelector('.pop-up').classList.remove('active');
            document.querySelector('.pop-up-box').style.visibility = 'hidden'
        })
    }

    //-----------------------------Popup------------------------------------

    var Team1;
    var Team2;
    var numofoversinput;
    var j = 0;
    var a = 360;
    var innings1 = document.querySelector(".innings1");
    var innings2 = document.querySelector(".innings2");
    var ballscreated = false;
    var noballT1 = 0;
    var noballT2 = 0;
    var wideballT1 = 0;
    var wideballT2 = 0;
    var runsT1 = 0;
    var runsT2 = 0;
    var wicketT1 = 0;
    var wicketT2 = 0;
    var invalid1 = false;
    var invalid2 = false;
    var invalid3 = false;
    var invalid4 = false;
    var T1inningover = false;
    var T2inningover = false;
    var winnerflag = false;
    var numofoversinput = document.querySelector(".no-of-over")
    var mainbtn = document.querySelector("#main")
    Team1 = document.querySelector('#T1name');
    Team2 = document.querySelector('#T2name');

    document.querySelector('.Teamname-BUtton').addEventListener('click', function () {
        location.reload();
    })

    document.querySelector('.Show-Instructions').addEventListener('click', function () {
        document.querySelector('.pop-up-box').style.visibility = 'visible'
        document.querySelector('.pop-up').classList.add('active');
    })

    function innings_popup(name, runs) {
        document.querySelector('.Team-name').innerText = name + " Needs " + (runs + 1) + " Runs In " + numofoversinput.value * 6 + " Balls"
        document.querySelector('.pop-up-box').style.visibility = 'visible'
        document.querySelector('.Innings-Alert').classList.add('active');
        document.querySelectorAll('.close')[4].addEventListener('click', function () {
            document.querySelector('.Innings-Alert').classList.remove('active');
            document.querySelector('.pop-up-box').style.visibility = 'hidden'
        })
    }

    mainbtn.addEventListener("click", function () {
        if (numofoversinput.value != "" && numofoversinput.value > 0 && Team1.value != "" && Team2.value != "") {

            if (ballscreated) {
                location.reload();
            }

            else {
                mainbtn.innerHTML = '<i class="fa-solid fa-spinner" id="animation" ></i>'
                numofoversinput.disabled = true;

                var interval = setInterval(function () {

                    document.querySelector("#animation").style.transform = 'rotate(' + a + 'deg)';
                    a += 360;

                    j++;
                    if (numofoversinput.value == j) {
                        clearInterval(interval);
                        mainbtn.innerHTML = ' <i class="fa-solid fa-rotate-right"></i>'
                        document.querySelectorAll('.score')[0].style.display = 'flex';
                        document.querySelectorAll('.score')[1].style.display = 'flex';

                        document.querySelector('.Entry-Box').classList.add('Entry-Box-Active');
                        setTimeout(() => {
                            document.querySelector('.After-Btn').style.transform = 'scale(1)'
                            document.querySelector('.Up-Animation').style.transform = 'translate(0px, -150px)'
                        }, 100);

                        showpopup();
                    }

                    // Team 1 -------------------------------
                    var overdiv1 = document.createElement("div")
                    var overname1 = document.createElement("h3");
                    overname1.innerHTML = "Over " + j;
                    overdiv1.appendChild(overname1)
                    overdiv1.classList.add("overs")

                    // Team 2 -------------------------------------
                    var overdiv2 = document.createElement("div")
                    var overname2 = document.createElement("h3");
                    overname2.innerHTML = "Over " + j;
                    overdiv2.appendChild(overname2)
                    overdiv2.classList.add("overs")

                    for (var i = 1; i <= 6; i++) {

                        // Team 1 -------------------------------
                        var ballsdiv1 = document.createElement("div")
                        ballsdiv1.classList.add("balls")
                        ballsdiv1.setAttribute('id', 'A' + j + '.' + i)
                        var inputbox1 = document.createElement("input")
                        inputbox1.type = "text"
                        inputbox1.maxLength = 3
                        inputbox1.placeholder = i
                        inputbox1.disabled = true
                        if (j == 1 && i == 1) { inputbox1.disabled = false }
                        inputbox1.addEventListener("focusout", setruns)
                        inputbox1.addEventListener("keypress", function (event) {
                            if (event.key === "Enter") {
                                this.blur();
                                if (!winnerflag) {
                                    if (!invalid1 || !invalid2) {
                                        if (wicketT1 != 10) {

                                            if (this.parentElement.nextSibling != null) {
                                                this.parentElement.nextSibling.firstChild.disabled = false;
                                                this.parentElement.nextSibling.firstChild.focus();
                                            }

                                            else if (this.parentElement.parentElement.nextElementSibling.className != 'overs') {
                                                if (!T1inningover) {
                                                    T1inningover = true;
                                                }

                                                if (!T2inningover && T1inningover) {
                                                    innings_popup(Team2.value, runsT1);
                                                }

                                            }

                                            else {
                                                this.parentElement.parentElement.nextSibling.children[1].firstChild.disabled = false;
                                                this.parentElement.parentElement.nextSibling.children[1].firstChild.focus();
                                            }

                                        }

                                        else {
                                            if (!T1inningover) {
                                                T1inningover = true;
                                            }

                                            if (!T2inningover && T1inningover) {
                                                innings_popup(Team2.value, runsT1);
                                            }

                                        }
                                    }

                                    else if (invalid1 && invalid2) {
                                        document.querySelector('.pop-up-box').style.visibility = 'visible'
                                        document.querySelector('.Runs-Alert').classList.add('active');
                                        document.querySelectorAll('.close')[3].addEventListener('click', function () {
                                            document.querySelector('.Runs-Alert').classList.remove('active');
                                            document.querySelector('.pop-up-box').style.visibility = 'hidden'
                                        })
                                        this.value = "";
                                        invalid1 = false;
                                        invalid2 = false;
                                        this.focus();
                                    }
                                }
                            }

                        })
                        ballsdiv1.appendChild(inputbox1)
                        overdiv1.appendChild(ballsdiv1)

                        // Team 2 -------------------------------------
                        var ballsdiv2 = document.createElement("div")
                        ballsdiv2.classList.add("balls")
                        ballsdiv2.setAttribute('id', 'B' + j + '.' + i)
                        var inputbox2 = document.createElement("input")
                        inputbox2.type = "text"
                        inputbox2.maxLength = 3
                        inputbox2.placeholder = i
                        inputbox2.disabled = true;
                        if (j == 1 && i == 1) { inputbox2.disabled = false }
                        inputbox2.addEventListener("focusout", setruns)
                        inputbox2.addEventListener("keypress", function (event) {
                            if (event.key === "Enter") {
                                this.blur();
                                if (!winnerflag) {
                                    if (!invalid3 || !invalid4) {
                                        if (wicketT2 != 10) {

                                            if (this.parentElement.nextSibling != null) {
                                                this.parentElement.nextSibling.firstChild.disabled = false;
                                                this.parentElement.nextSibling.firstChild.focus();
                                            }

                                            else if (this.parentElement.parentElement.nextElementSibling.className != 'overs') {

                                                if (!T2inningover) {
                                                    T2inningover = true;
                                                }

                                                if (!T1inningover && T2inningover) {
                                                    innings_popup(Team1.value, runsT2);
                                                }
                                            }

                                            else {
                                                this.parentElement.parentElement.nextSibling.children[1].firstChild.disabled = false;
                                                this.parentElement.parentElement.nextSibling.children[1].firstChild.focus();
                                            }
                                        }

                                        else {

                                            if (!T2inningover) {
                                                T2inningover = true;
                                            }

                                            if (!T1inningover && T2inningover) {
                                                innings_popup(Team1.value, runsT2);
                                            }

                                        }
                                    }

                                    else if (invalid3 && invalid4) {
                                        document.querySelector('.pop-up-box').style.visibility = 'visible'
                                        document.querySelector('.Runs-Alert').classList.add('active');
                                        document.querySelectorAll('.close')[3].addEventListener('click', function () {
                                            document.querySelector('.Runs-Alert').classList.remove('active');
                                            document.querySelector('.pop-up-box').style.visibility = 'hidden'
                                        })
                                        this.value = "";
                                        invalid3 = false;
                                        invalid4 = false;
                                        this.focus();
                                    }
                                }
                            }

                        })
                        ballsdiv2.appendChild(inputbox2)
                        overdiv2.appendChild(ballsdiv2)

                    }
                    document.querySelector('.Team1').innerHTML = Team1.value;
                    document.querySelector('.Team2').innerHTML = Team2.value;
                    document.querySelector('#T1').before(overdiv1)
                    document.querySelector('#T2').before(overdiv2)
                    document.querySelector('.divider').style.display = 'block';
                    ballscreated = true;
                }, 100)
            }
        }

        else {
            if (Team1.value == "") {
                document.querySelector('.pop-up-box').style.visibility = 'visible'
                document.querySelector('.Name-Alert').classList.add('active');
                document.querySelectorAll('.close')[1].addEventListener('click', function () {
                    document.querySelector('.Name-Alert').classList.remove('active');
                    document.querySelector('.pop-up-box').style.visibility = 'hidden'
                })
            }
            else if (Team2.value == "") {
                document.querySelector('.pop-up-box').style.visibility = 'visible'
                document.querySelector('.Name-Alert').classList.add('active');
                document.querySelectorAll('.close')[1].addEventListener('click', function () {
                    document.querySelector('.Name-Alert').classList.remove('active');
                    document.querySelector('.pop-up-box').style.visibility = 'hidden'
                })
            }
            else if (numofoversinput.value = "" || numofoversinput.value == 0) {
                document.querySelector('.pop-up-box').style.visibility = 'visible'
                document.querySelector('.Overs-Alert').classList.add('active');
                numofoversinput.value = "";
                document.querySelectorAll('.close')[2].addEventListener('click', function () {
                    document.querySelector('.Overs-Alert').classList.remove('active');
                    document.querySelector('.pop-up-box').style.visibility = 'hidden'
                })
            }

        }

    })





    function extraballs(ball, reason, placeholder) {
        var extraballsdiv = document.createElement("div")
        extraballsdiv.classList.add("balls", "ex")
        extraballsdiv.setAttribute('id', ball)
        var inputbox = document.createElement("input")
        inputbox.type = "text"
        inputbox.maxLength = 3
        inputbox.placeholder = placeholder
        inputbox.addEventListener("focusout", setruns)
        inputbox.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                this.blur();
                if (!winnerflag) {
                    if (this.parentElement.id[0] == "A") {
                        if (!invalid1 || !invalid2) {

                            if (this.parentElement.nextSibling != null) {
                                this.parentElement.nextSibling.firstChild.disabled = false;
                                this.parentElement.nextSibling.firstChild.focus();
                            }

                            else {
                                this.parentElement.parentElement.nextSibling.children[1].firstChild.disabled = false;
                                this.parentElement.parentElement.nextSibling.children[1].firstChild.focus();
                            }
                        }

                        else if (invalid1 && invalid2) {
                            document.querySelector('.pop-up-box').style.visibility = 'visible'
                            document.querySelector('.Runs-Alert').classList.add('active');
                            document.querySelectorAll('.close')[3].addEventListener('click', function () {
                                document.querySelector('.Runs-Alert').classList.remove('active');
                                document.querySelector('.pop-up-box').style.visibility = 'hidden'
                            })
                            this.value = "";
                            invalid1 = false;
                            invalid2 = false;
                            this.focus();
                        }
                    }

                    if (this.parentElement.id[0] == "B") {
                        if (!invalid3 || !invalid4) {

                            if (this.parentElement.nextSibling != null) {
                                this.parentElement.nextSibling.firstChild.disabled = false;
                                this.parentElement.nextSibling.firstChild.focus();
                            }

                            else {
                                this.parentElement.parentElement.nextSibling.children[1].firstChild.disabled = false;
                                this.parentElement.parentElement.nextSibling.children[1].firstChild.focus();
                            }
                        }

                        else if (invalid3 && invalid4) {
                            document.querySelector('.pop-up-box').style.visibility = 'visible'
                            document.querySelector('.Runs-Alert').classList.add('active');
                            document.querySelectorAll('.close')[3].addEventListener('click', function () {
                                document.querySelector('.Runs-Alert').classList.remove('active');
                                document.querySelector('.pop-up-box').style.visibility = 'hidden'
                            })
                            this.value = "";
                            invalid1 = false;
                            invalid2 = false;
                            this.focus();
                        }
                    }
                }

            }

        })
        extraballsdiv.appendChild(inputbox)
        document.getElementById(ball).after(extraballsdiv)
        document.getElementById(ball).id = reason;
    }

    function setruns() {
        if (this.parentElement.id[0] == 'A') {
            this.value.toUpperCase().replace(parseInt(this.value), '')
            switch (this.value.toUpperCase().replace(parseInt(this.value), '')) {
                case "NB":
                    noballT1++;
                    document.querySelector(".No-Ball").querySelector("h3").innerHTML = noballT1;
                    this.disabled = true;
                    extraballs(this.parentElement.id, "NB", this.placeholder);
                    invalid1 = false;
                    break;

                case "WD":
                    wideballT1++;
                    document.querySelector(".wide-score").querySelector("h3").innerHTML = wideballT1;
                    this.disabled = true;
                    extraballs(this.parentElement.id, "WD", this.placeholder);
                    invalid1 = false;
                    break;

                case "W":
                    wicketT1++
                    this.disabled = true;
                    invalid1 = false;
                    break;

                case ".":
                    this.value = "•"
                    this.disabled = true;
                    invalid1 = false;
                    break;


                default:
                    invalid1 = true;
                    break;

            }

            switch (parseInt(this.value)) {
                case 1:
                    runsT1 += 1;
                    this.disabled = true;
                    invalid2 = false;
                    break;

                case 2:
                    runsT1 += 2;
                    this.disabled = true;
                    invalid2 = false;
                    break;

                case 3:
                    runsT1 += 3;
                    this.disabled = true;
                    invalid2 = false;
                    break;

                case 4:
                    runsT1 += 4;
                    this.disabled = true;
                    invalid2 = false;
                    break;

                case 5:
                    runsT1 += 5;
                    this.disabled = true;
                    invalid2 = false;
                    break;

                case 6:
                    runsT1 += 6;
                    this.disabled = true;
                    invalid2 = false;
                    break;

                default:
                    invalid2 = true;
                    break;
            }
            document.querySelector(".Runs-Score").querySelector("h3").innerHTML = runsT1 + ' - ' + wicketT1;
        }



        else if (this.parentElement.id[0] == 'B') {


            switch (this.value.toUpperCase().replace(parseInt(this.value), '')) {
                case "NB":
                    noballT2++;
                    document.querySelectorAll(".No-Ball")[1].querySelector("h3").innerHTML = noballT2;
                    this.disabled = true;
                    extraballs(this.parentElement.id, "NB", this.placeholder);
                    invalid3 = false;
                    break;

                case "WD":
                    wideballT2++;
                    runsT2++;
                    document.querySelectorAll(".wide-score")[1].querySelector("h3").innerHTML = wideballT2;
                    this.disabled = true;
                    extraballs(this.parentElement.id, "WD", this.placeholder);
                    invalid3 = false;
                    break;

                case "W":
                    wicketT2++;
                    this.disabled = true;
                    invalid3 = false;
                    break;

                case ".":
                    this.value = "•"
                    this.disabled = true;
                    invalid3 = false;
                    break;

                default:
                    invalid3 = true;
                    break;
            }

            switch (parseInt(this.value)) {
                case 1:
                    runsT2 += 1;
                    this.disabled = true;
                    invalid4 = false;
                    break;

                case 2:
                    runsT2 += 2;
                    this.disabled = true;
                    invalid4 = false;
                    break;

                case 3:
                    runsT2 += 3;
                    this.disabled = true;
                    invalid4 = false;
                    break;

                case 4:
                    runsT2 += 4;
                    this.disabled = true;
                    invalid4 = false;
                    break;

                case 5:
                    runsT2 += 5;
                    this.disabled = true;
                    invalid4 = false;
                    break;

                case 6:
                    runsT2 += 6;
                    this.disabled = true;
                    invalid4 = false;
                    break;

                default:
                    invalid4 = true;
                    break;
            }
            document.querySelectorAll(".Runs-Score")[1].querySelector("h3").innerHTML = runsT2 + ' - ' + wicketT2;
        }

        // ---------------------------------------------------------------

        var winname = document.querySelector(".winning-team-name");
        if (T1inningover && T2inningover) {
            if (runsT1 > runsT2) {
                winname.innerText = Team1.value + " Won The Match";
                winnerflag = true;
            }

            else if (runsT2 > runsT1) {
                winname.innerText = Team2.value + " Won The Match";
                winnerflag = true;
            }

            else if (runsT1 == runsT2) {
                winname.innerText = "Match Draw";
                winnerflag = true;
            }
            Winner();
        }

        else if (T1inningover && (runsT2 > runsT1)) {
            winname.innerText = Team2.value + " Won The Match";
            winnerflag = true;

            Winner();
        }

        else if (T2inningover && (runsT1 > runsT2)) {
            winname.innerText = Team1.value + " Won The Match";
            winnerflag = true;
            Winner();
        }
    }

    // Detail Score Function For Mobile Start
    var detail_score = document.querySelectorAll('.detail-score-container');

    for (var i = 0; i < 2; i++) {
        document.querySelectorAll('.detail-score-btn')[i].addEventListener('click', function () {
            this.innerHTML = (this.innerHTML == '<i class="fa-regular fa-square-caret-up"></i>') ? '<i class="fa-regular fa-square-caret-down"></i>' : '<i class="fa-regular fa-square-caret-up"></i>'
            detail_score[this.id].classList.toggle("detail-score-container-active");
        })
    }

    // Detail Score Function For Mobile End


    function Winner() {
        document.querySelector('.pop-up-box').style.visibility = 'visible'
        document.querySelector('.Winner-Alert').classList.add('active');
        document.querySelectorAll('.close')[5].addEventListener('click', function () {
            document.querySelector('.Winner-Alert').classList.remove('active');
            document.querySelector('.pop-up-box').style.visibility = 'hidden'
        })
    }
}