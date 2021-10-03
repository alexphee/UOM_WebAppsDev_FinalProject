function passValues(){
   var Height  = document.getElementById("InsHeight").value;
    var Position  = document.getElementById("InsWeight").value;
   localStorage.setItem("HeightValue",Height);
    localStorage.setItem("WeightValue",Position);
    return false;
}