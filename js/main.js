var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

var entities = {
    organisms: [],
    resources: [],
    structures: []
};

entities.structures.push(new TownHall());

for (var i = 0; i < 10; i++) {
    entities.organisms.push(new Organism());
    entities.resources.push(new Tree());
}

console.log(entities)

var game = setInterval(onTick, 33);

function onTick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (o in entities.organisms) {
        entities.organisms[o].step();
    }

    for (e in entities) {
        for (x in entities[e]) {
            entities[e][x].render();
        }
    }
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}