document.getElementById("NameSpot").innerHTML=localStorage.getItem("elNombre");
document.getElementById("HeightSpot").innerHTML=localStorage.getItem("HeightValue");
document.getElementById("WeightSpot").innerHTML=localStorage.getItem("WeightValue");

//υπολογισμος συνολικης αποστασης
var Rd = localStorage.getItem("Rtest");
var Sd = localStorage.getItem("Stest");
var Cd = localStorage.getItem("Ctest");
var Totdis = parseInt(Cd)+parseInt(Rd)+parseInt(Sd);
localStorage.setItem("TOTALdistance",Totdis);
document.getElementById("Total_Distance").innerHTML=(localStorage.getItem("TOTALdistance")/1000)+' km';

//υπολογισμός συνολικού χρόνου
var Rt = localStorage.getItem("Rttime");
var St = localStorage.getItem("Sttime");
var Ct = localStorage.getItem("Cttime");
var Et = localStorage.getItem("Ettime");
var Tottim = parseInt(Ct)+parseInt(Rt)+parseInt(St)+parseInt(Et);
localStorage.setItem("TOTALtime",Tottim);
document.getElementById("Total_Time").innerHTML=(localStorage.getItem("TOTALtime")/60).toFixed(2)+' hours ('+localStorage.getItem("TOTALtime")+ ' minutes)';

//υπολογισμος bmi
var h = localStorage.getItem("HeightValue");
var w = localStorage.getItem("WeightValue");
var bmi = (parseFloat(w)/parseFloat(h*h)).toFixed(1);
localStorage.setItem("BMIvalue",bmi);
document.getElementById("bmi").innerHTML=localStorage.getItem("BMIvalue");

//αποτελεσμα ΒΜΙ
if(bmi<=18.5){document.getElementById("bmiRes").innerHTML="(Underweight)"}
else if(bmi<=24.9){document.getElementById("bmiRes").innerHTML="(Normal)"}
else if(bmi<=29.9){document.getElementById("bmiRes").innerHTML="(Overweight)"}
else if (bmi>30){document.getElementById("bmiRes").innerHTML="(Obese)"}

//visit count και quotes
var qArray = ['“Strength does not come from physical capacity. It comes from an indomitable will.” -Mahatma Gandhi',
                '“If you want something you’ve never had, you must be willing to do something you’ve never done.” -Thomas Jefferson',
                '“Once you are exercising regularly, the hardest thing is to stop it.” –Erin Gray',
                '“All progress takes place outside the comfort zone.” -Michael John Bobak',
                '“I don’t count my sit-ups. I only start counting when it starts hurting because they’re the only ones that count.” -Muhammad Ali',
                '“Go the extra mile. It’s never crowded.” -Wayne Dyer',
                '“You just can’t beat the person who never gives up.” -Babe Ruth',
                '“Do something today that your future self will thank you for.” -Sean Patrick Flanery',
                '“Your health account, your bank account, they’re the same thing. The more you put in, the more you can take out.” -Jack LaLanne',
                '“Don’t say ‘I can’t.’ Say, ‘I presently struggle with’.” -Tony Horton',
                '“We are what we repeatedly do. Excellence then is not an act but a habit.” -Aristotle',
                '“Your body can stand almost anything. It’s your mind that you have to convince.” -Andrew Murphy'];
if(sessionStorage.clickcount>11){sessionStorage.clickcount=0;}
if (sessionStorage.clickcount)
  {
  sessionStorage.clickcount=Number(sessionStorage.clickcount)+1;
  
  }
else
  {
  sessionStorage.clickcount=1;
  }
  for (let i=0; i<12;i++){
  if((sessionStorage.clickcount)==i+1){document.getElementById("quoteTXT").innerHTML=qArray[i]}}
/*document.write("You have clicked the button " + sessionStorage.clickcount + " times."); */


//για την εικόνα  
document.querySelector('#fileInput').addEventListener("change", function(){
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem("recentImage", reader.result);
  });

  reader.readAsDataURL(this.files[0]);

});

document.addEventListener("DOMContentLoaded", () => {
  const recentImageURL = localStorage.getItem("recentImage");
  if(recentImageURL){
    document.querySelector("#imgPreview").setAttribute("src", recentImageURL);
  }
})

//κουμπί καθαρισμού του localStorage
function deleteAll() {
  if (confirm('Are you sure you want to delete everything? \nThis will remove every record in the app.')) {
      localStorage.clear();
      alert('All records have been deleted.')
  }
}