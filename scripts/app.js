
(function () {
    var w = 9;
    var h = 6;
    var imageBox = document.querySelector('.image-block');
    var blockContainer = document.querySelector(".blocks-container");
    var readyContainer = blockContainer.querySelector(".ready-container");
    var wayToImage = 'url("./images/image_' + (getRandomInt(3)+1) + '.png")';
    imageBox.style.backgroundImage = wayToImage;
    var currentBlock = null;
    var readyBlock = null;
    var blocks = null;
    var offsetX = 25;
    var offsetY = parseInt(getComputedStyle(imageBox).marginBottom) + parseInt(getComputedStyle(imageBox).height) + 25;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function onMouseMove(event){
        if (currentBlock !== null){
            currentBlock.style.left = event.pageX-offsetX + "px";
            currentBlock.style.top = event.pageY-offsetY + "px" ;
        }
    }

    function onMouseUp(event){
        if (currentBlock){
            currentBlock.style.zIndex = 2;
            elemBelow = event.target;
            if (elemBelow.classList.contains('ready-block'))
                mouseUpReady(elemBelow);
            currentBlock.style.pointerEvents='auto';
            currentBlock = null;
        }
    }

    function onMouseDown(event){
        if (event.target.isReady === false){
            blocks.forEach(element => {
                element.style.zIndex = 1;
            })
            currentBlock = event.target;
            console.log(currentBlock);
            currentBlock.style.zIndex = 2;
            currentBlock.style.pointerEvents='none';
            
        }
    }
    function mouseUpReady(block){
        readyBlock = block;
        if (currentBlock){
            if (readyBlock.x === currentBlock.x && readyBlock.y === currentBlock.y){
                currentBlock.style.top = readyBlock.style.top;
                currentBlock.style.left = readyBlock.style.left;
                currentBlock.isReady = true;
                if (checkWin()){
                    alarm("Вы победили!");
                }
            }
        }
    }
    function checkWin(){
        let isWin = true;
        blocks.forEach(element => {
            if (element.isReady === false)
                {
                    console.log(isWin);
                    isWin = false;
                }
        return isWin;
        });
    }
    function generateBlocks(){
        for (let y = 0; y < h; y++){
            for (let x = 0; x < w; x++){
                let item = document.createElement('span');
                item.className = 'block';
                item.x = x;
                item.y = y;
                item.isReady = false;
                item.style.backgroundImage = wayToImage;
                item.style.backgroundPositionX = -x*50 + "px";
                item.style.backgroundPositionY = -y*50 + "px";
                item.style.top = Math.random() * 300 + "px";
                item.style.left = 450 + Math.random() * 450 + "px";
                item.addEventListener("mouseup", onMouseUp);
                item.addEventListener("mousedown", onMouseDown);
                blockContainer.append(item);

                let readyCell = document.createElement('span');
                readyCell.className = 'ready-block';            
                readyCell.x = x;
                readyCell.y = y;
                readyCell.style.backgroundImage = wayToImage;
                readyCell.style.backgroundPositionX = -x*50 + "px";
                readyCell.style.backgroundPositionY = -y*50 + "px";
                readyCell.style.top = blockContainer.style.top + y*50 + "px";
                readyCell.style.left = x*50 + "px";

                readyContainer.append(readyCell);
            }
        }
        blocks = blockContainer.querySelectorAll('.block');
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    generateBlocks();
})();