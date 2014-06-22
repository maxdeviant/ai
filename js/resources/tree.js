function tree() {
    return {
        id: guid(),
        type: 'tree',
        position: {
            x: Math.floor(Math.random() * (canvas.width - 10) + 10),
            y: Math.floor(Math.random() * (canvas.height - 10) + 10)
        },
        render: function () {
            ctx.fillStyle = '#276700';
            ctx.fillText('T', this.position.x, this.position.y);
        }
    }
}