var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

var entities = [];

for (var i = 0; i < 10; i++) {
    entities.push(new organism());
}

var game = setInterval(on_tick, 33);

function on_tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (e in entities) {
        entities[e].step();
        entities[e].render();
    }
}

console.log(entities)

function organism() {
    return {
        id: guid(),
        position: {
            'x': Math.floor(Math.random() * 100) + 1,
            'y': Math.floor(Math.random() * 100) + 1
        },
        step: function() {
            this.position.x += Math.floor(Math.random() * -3) + 2;
            this.position.y += Math.floor(Math.random() * -3) + 2;
        },
        render: function() {
            ctx.fillRect(this.position.x, this.position.y, 10, 10)
        }
    }
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}