var canvas = document.getElementById('screen').getContext('2d');

var entities = [];

for (var i = 0; i < 10; i++) {
    entities.push(new organism())
}

for (e in entities) {
    entities[e].render()
}

console.log(entities)

function organism() {
    return {
        'id': guid(),
        'position': {
            'x': Math.floor(Math.random() * 100) + 1,
            'y': Math.floor(Math.random() * 100) + 1
        },
        'render': function() {
            canvas.fillRect(this.position.x, this.position.y, 10, 10)
        }
    }
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}