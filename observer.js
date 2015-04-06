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
    return this.observers.splice(this.indexOf(observer), 1);
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
        this.GUID = (new Date()).getTime();
    }
}

Observer.prototype.update = function(status) {
    $(".show_observer", this)[0].style.background = status;
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
    } // 生成随机色


window.onload = function() {
    var subject = $("#subject");
    extend(subject, new Subject());
    $("#add").addEventListener("click", function() {
        var node = document.createElement("div");
        node.className = "observer";
        extend(node, new Observer());
        node.id = node.GUID;
        var node2 = document.createElement("div");
        node2.className = "show_observer";
        node2.innerHTML = "观察者Observer " + (1 + subject.obverserList.count());
        node.appendChild(node2);
        var node3 = document.createElement("span");
        node3.className = "close";
        node.appendChild(node3);
        subject.addObserver(node);
        $("#Observers_container").appendChild(node);
        // $("#ObserversList").options.add(new Option("观察者" + subject.obverserList.count(),subject.obverserList.count())); //这个兼容IE与firefox
    }, true);

    setInterval(function() {
        var color = "#" + randomColor();
        subject.style.background = color;
        subject.notify(color);
    }, 1000);

    function reSortIndex() {
        for (var i = 0; i < subject.obverserList.count(); i++) {
            $(".show_observer", subject.obverserList.get(i))[0].innerHTML = "观察者Observer " + (1 + i);
        }
    }
    window.garbages = [];
    window.obversers = [];
    document.addEventListener("click", function(event) {
        if (!event) event = window.event;
        if (event.target.className == "close") {
            var node = event.target.parentNode;
            node.classList.add("null");
            $(".show_observer", node)[0].innerHTML = "";
            garbages.push(node);
            subject.obverserList.remove(node);
            reSortIndex();
        }
    }, false)

    setInterval(function() {
            for (var i = 0; i < garbages.length; i++) {
                $("#Observers_container").removeChild(garbages.pop(i));
            }
            console.log("垃圾回收成功！");
        },
        10000); //垃圾回收

    $("#empty").addEventListener("click", function() {
        for (var i = 0; i < subject.obverserList.count(); i++) {
            var node = subject.obverserList.get(i);
            node.classList.add("null");
            $(".show_observer", node)[0].innerHTML = "";
            garbages.push(node);

        }
        subject.obverserList.empty();
    });
    $("#decoupling").addEventListener("click", function() {
        for (var i = 0; i < subject.obverserList.count(); i++) {
            obversers.push(subject.obverserList.get(i))
        }
        subject.empty();
    })
    $("#notify").addEventListener("click", function() {
        for (var i = 0; i < obversers.length; i++) {
            subject.addObserver(obversers[i]);
        }
    })
    $("#about").addEventListener("click", function() {
        window.location.href = "http://yoghurts.github.io/about/";
    })
}
