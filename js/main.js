var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

var entities = {
    organisms: [],
    resources: []
};

for (var i = 0; i < 10; i++) {
    entities.organisms.push(new organism());
    entities.resources.push(new tree())
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

function organism() {
    return {
        id: guid(),
        type: 'organism',
        position: {
            x: Math.floor(Math.random() * canvas.width) + 1,
            y: Math.floor(Math.random() * canvas.height) + 1
        },
        target: '',
        step: function () {
            if (this.target === '') {
                this.findClosestResource();
            }

            if (this.target !== '') {
                if (this.position.x < this.target.position.x) {
                    this.position.x += 1;
                }

                if (this.position.x > this.target.position.x) {
                    this.position.x -= 1;
                }

                if (this.position.y < this.target.position.y) {
                    this.position.y += 1;
                }

                if (this.position.y > this.target.position.y) {
                    this.position.y -= 1;
                }

                if (this.position.x === this.target.position.x && this.position.y === this.target.position.y) {
                    for (var i = 0; i < entities.resources.length; i++) {
                        if (entities.resources[i].id === this.target.id) {
                            entities.resources.splice(i, 1);
                            this.target = '';
                            break;
                        }
                    }
                }
            } else {
                this.position.x += Math.floor(Math.random() * -3) + 2;
                this.position.y += Math.floor(Math.random() * -3) + 2;
            }
            
            var margin = 10;

            if (this.position.x <= margin) {
                this.position.x += 1;
            }

            if (this.position.x >= canvas.width - margin) {
                this.position.x -= 1;
            }

            if (this.position.y <= margin) {
                this.position.y += 1;
            }

            if (this.position.y >= canvas.height - margin) {
                this.position.y -= 1;
            }
        },
        findClosestResource: function () {
            if (this.target === '') {
                var closestResource = shortestDist = null;

                for (r in entities.resources) {
                    var dist = Math.sqrt(Math.pow(this.position.x - entities.resources[r].position.x, 2), Math.pow(this.position.y - entities.resources[r].position.y, 2));
                    if (dist < shortestDist || shortestDist === null) {
                        shortestDist = dist;
                        closestResource = entities.resources[r];
                    }
                }

                if (closestResource !== null) {
                    this.target = closestResource;
                }
            }
        },
        render: function () {
            ctx.fillStyle = '#000000'
            ctx.fillText('O', this.position.x, this.position.y)
        }
    }
}

function tree() {
    return {
        id: guid(),
        type: 'tree',
        position: {
            x: Math.floor(Math.random() * canvas.width - 10) + 1,
            y: Math.floor(Math.random() * canvas.height - 10) + 1
        },
        render: function () {
            ctx.fillStyle = '#276700';
            ctx.fillText('T', this.position.x, this.position.y);
        }
    }
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}