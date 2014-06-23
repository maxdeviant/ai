function Organism(sex) {
    return {
        id: guid(),
        type: 'organism',
        sex: sex || Math.random() < 0.5 ? 'male' : 'female',
        position: {
            x: Math.floor(Math.random() * canvas.width) + 1,
            y: Math.floor(Math.random() * canvas.height) + 1
        },
        task: 'idle',
        target: '',
        inventory: {},
        step: function () {
            if (this.task === 'idle') {
                if (this.resourceExists()) {
                    this.findClosestResource();
                }

                if (this.materialsAvailable('house')) {
                    this.getBuildingMaterials('house');
                }

                this.idle();
            }

            if (this.task === 'gather') {
                this.gather();
            }

            if (this.task === 'haul') {
                this.haul();
            }

            if (this.task === 'build') {
                this.build('house');
            }
        },
        routeToTarget: function () {
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

            this.checkBlocked();
        },
        checkBlocked: function () {
            var margin = 2;

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
        targetExists: function (type) {
            for (var i = 0; i < entities[type].length; i++) {
                if (entities[type][i].id === this.target.id) {
                    return true;
                }
            }

            return false;
        },
        idle: function () {
            this.position.x += Math.floor(Math.random() * -3) + 2;
            this.position.y += Math.floor(Math.random() * -3) + 2;
            this.checkBlocked();
        },
        resourceExists: function () {
            return entities.resources.length > 0 ? true : false;
        },
        findClosestResource: function () {
            var closestResource = shortestDist = null;

            for (i in entities.resources) {
                var dist = Math.sqrt(Math.pow(this.position.x - entities.resources[i].position.x, 2), Math.pow(this.position.y - entities.resources[i].position.y, 2));
                if (dist < shortestDist || shortestDist === null) {
                    shortestDist = dist;
                    closestResource = entities.resources[i];
                }
            }

            if (closestResource !== null) {
                this.task = 'gather';
                this.target = closestResource;
            }
        },
        gather: function () {
            if (!this.targetExists('resources')) {
                this.task = 'idle';
                this.findClosestResource();
            }

            this.routeToTarget();

            if (this.position.x === this.target.position.x && this.position.y === this.target.position.y) {
                for (var i = 0; i < entities.resources.length; i++) {
                    if (entities.resources[i].id === this.target.id) {
                        if (this.inventory[entities.resources[i].resourceType] === undefined) {
                            this.inventory[entities.resources[i].resourceType] = entities.resources[i].resourceAmount;
                        } else {
                            this.inventory[entities.resources[i].resourceType] += entities.resources[i].resourceAmount;
                        }

                        entities.resources.splice(i, 1);

                        this.task = 'haul';
                        this.target = townHall;

                        break;
                    }
                }
            }
        },
        haul: function () {
            this.routeToTarget();

            if (this.position.x === this.target.position.x && this.position.y === this.target.position.y) {
                var keys = Object.keys(this.inventory);

                for (i in keys) {
                    if (this.target.stockpile[keys[i]] === undefined) {
                        this.target.stockpile[keys[i]] = this.inventory[keys[i]];
                    } else {
                        this.target.stockpile[keys[i]] += this.inventory[keys[i]];
                    }

                    this.inventory[keys[i]] = 0;
                }

                this.task = 'idle';
                this.target = '';
            }
        },
        materialsAvailable: function (structure) {
            for (i in blueprints[structure]) {
                var resourceType = Object.keys(blueprints[structure]);
                var resourceAmount = blueprints[structure][i];
                
                if (townHall.stockpile[resourceType] < resourceAmount) {
                    return false;
                }
            }

            return true;
        },
        getBuildingMaterials: function (structure) {
            this.target = townHall;

            this.routeToTarget();

            if (this.position.x === this.target.position.x && this.position.y === this.target.position.y) {
                for (i in blueprints[structure]) {
                    var resourceType = Object.keys(blueprints[structure]);
                    var resourceAmount = blueprints[structure][i];
                    
                    if (townHall.stockpile[resourceType] >= resourceAmount) {
                        townHall.stockpile[resourceType] -= resourceAmount;

                        if (this.inventory[resourceType] === undefined) {
                            this.inventory[resourceType] = resourceAmount;
                        } else {
                            this.inventory[resourceType] += resourceAmount;
                        }
                    }
                }

                this.target = {
                    position: {
                        x: Math.floor(Math.random() * (canvas.width - 10) + 10),
                        y: Math.floor(Math.random() * (canvas.height - 10) + 10)
                    }
                };

                this.task = 'build';
                this.build(structure);
            }
        },
        build: function (structure) {
            this.routeToTarget();

            var haveMaterials = true;

            if (this.position.x === this.target.position.x && this.position.y === this.target.position.y) {
                for (i in blueprints[structure]) {
                    var resourceType = Object.keys(blueprints[structure]);
                    var resourceAmount = blueprints[structure][i];

                    if (this.inventory[resourceType] < resourceAmount) {
                        haveMaterials = false;
                    }
                }

                if (haveMaterials) {
                    entities.structures.push(new House(this.position.x, this.position.y));
                }

                this.task = 'idle';
                this.target = '';
            }
        },
        render: function () {
            if (this.sex === 'male') {
                ctx.fillStyle = '#175ca9';
            } else {
                ctx.fillStyle = '#cc638c';
            }

            ctx.fillText('O', this.position.x, this.position.y);
        }
    }
}