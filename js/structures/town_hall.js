function TownHall() {
    return {
        id: guid(),
        type: 'town_hall',
        position: {
            x: Math.floor(Math.random() * (canvas.width - 10) + 10),
            y: Math.floor(Math.random() * (canvas.height - 10) + 10)
        },
        stockpile: {},
        render: function () {
            ctx.fillStyle = '#000000';
            ctx.fillText('H', this.position.x, this.position.y);
        }
    }
}