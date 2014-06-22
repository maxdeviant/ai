var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

var blueprints = {
    house: House().materials
}

var entities = {
    organisms: [],
    resources: [],
    structures: []
};

var townHall = new TownHall();

entities.structures.push(townHall);

for (var i = 0; i < 10; i++) {
    entities.organisms.push(new Organism());
    entities.resources.push(new Tree());
    entities.resources.push(new Rock());
}

console.log(entities)

var game = setInterval(onTick, 33);

function onTick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (i in entities.organisms) {
        entities.organisms[i].step();
    }

    for (i in entities) {
        for (j in entities[i]) {
            entities[i][j].render();
        }
    }

    if (Math.random() < 0.02) {
        entities.resources.push(new Tree());
    }
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}