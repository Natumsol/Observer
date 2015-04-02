/** 
 * @description 观察者模式的简单实现
 * @author Yoghurts
 * @github:http://github.com/natumsol
 */

/**
 * [观察者列表]
 */
function ObverserList() {
  if (!(this instanceof ObverserList)) {
    return new ObverserList();
  } else {
    this.observers = [];
  }
}

ObverserList.prototype.add = function(observer) {
  this.observers.push(observer);
}
ObverserList.prototype.empty = function() {
  this.observers = [];
}
ObverserList.prototype.indexOf = function(observer) {
  for (var i = 0; i < this.observers.length; i++) {
    if (observer === this.observers[i])
      return i;
  }
    return -1;
  
}
ObverserList.prototype.get = function(index) {
  if (index >= 0 && index < this.observers.length) {
    return this.observers[index];
  }
  return null;
}
ObverserList.prototype.remove = function(observer) {
  this.observers.splice(this.indexOf(observer), 1);
}
ObverserList.prototype.count = function() {
  return this.observers.length;
}
/**
 *[目标Object的实现]
 */
function Subject() {
  if (!(this instanceof Subject)) {
    return new Subject();
  } else {
    this.obverserList = new ObverserList();
  }
}
Subject.prototype.addObserver = function(observer) {
  this.obverserList.add(observer);
}
Subject.prototype.removeObserver = function(observer) {
  this.obverserList.remove(observer);
}
Subject.prototype.empty = function() {
  this.obverserList.empty();
}
Subject.prototype.notify = function(status) {
  //TODO
  for (var i = 0; i < this.obverserList.count(); i++) {
    this.obverserList.get(i).update(status);
  }
}

/**
 * [Observer的实现]
 */

function Observer() {
  if (!(this instanceof Observer)) {
    return new Observer();
  } else {
    this.status = "";
  }
}

Observer.prototype.update = function(status) {
  this.style.background = status;
}

function extend(obj, src) {
  for (var item in src) {
    if (!obj[item]) obj[item] = src[item];
  }
}

function randomColor() {
  var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
  if (rand.length == 6) {
    return rand;
  } else {
    return randomColor();
  }
}


window.onload = function() {
  var subject = $("#subject");
  extend(subject, new Subject());
  $("#add").addEventListener("click", function() {
    var node = document.createElement("div");
    node.className = "observer";
    extend(node, new Observer())
    subject.addObserver(node);
    $("#Observers_container").appendChild(node);
    $("#ObserversList").options.add(new Option("观察者" + subject.obverserList.count(),subject.obverserList.count())); //这个兼容IE与firefox
  }, true);

  setInterval(function() {
    var color = "#" + randomColor();
    subject.style.background = color;
    subject.notify(color);
  }, 1000);

  $("#remove").addEventListener("click", function(){
    var index = $("#ObserversList").value;
    var node = subject.obverserList.get(index - 1);
    $("#Observers_container").removeChild(node);
    subject.obverserList.remove(node);
    $("#ObserversList").options.remove($("#ObserversList").selectedIndex);
    $.slice.call($("option", $("#ObserversList"))).forEach(function(value, key, array){
        value.value = key + 1;
        value.innerHTML = "观察者" + value.value ;
    });
  },true)

  $("#menu_trigger_container").addEventListener("click", function(){
    $("#menu").classList.toggle("menu_open");
    $("#content").classList.toggle("menu_open_content");
  },true)

}