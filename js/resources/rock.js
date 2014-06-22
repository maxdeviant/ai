function Rock() {
    return {
        id: guid(),
        type: 'rock',
        position: {
            x: Math.floor(Math.random() * (canvas.width - 10) + 10),
            y: Math.floor(Math.random() * (canvas.height - 10) + 10)
        },
        resourceType: 'stone',
        resourceAmount: 1,
        render: function () {
            ctx.fillStyle = '#666';
            ctx.fillText('R', this.position.x, this.position.y);
        }
    }
}