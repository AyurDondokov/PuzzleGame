
(function () {
    var w = 9;
    var h = 6;
    var imageBox = document.querySelector('.image-block');
    var blockContainer = document.querySelector(".blocks-container");
    var blocks = blockContainer.querySelectorAll(".block");
    var readyContainer = blockContainer.querySelector(".ready-container");
    var wayToImage = 'url("./images/image_' + (getRandomInt(3)+1) + '.png")';
    imageBox.style.backgroundImage = wayToImage;
    var currentBlock = null;
    var readyBlock = null;
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function onMouseMove(event){
        if (currentBlock !== null){
            currentBlock.style.left = event.pageX-25 + "px";
            currentBlock.style.top = event.pageY-325 + "px" ;
        }
    }

    function onMouseUp(){
        currentBlock.style.zIndex = 1;
        currentBlock = null;
    }

    function onMouseDown(event){
        if (event.target.isReady === false){
            currentBlock = event.target;
            console.log(currentBlock);
            currentBlock.style.zIndex = 0;
        }
    }

    function mouseUpReady(event){
        readyBlock = event.target;
        if (currentBlock){
            if (readyBlock.x === currentBlock.x && readyBlock.y === currentBlock.y){
                currentBlock.style.top = readyBlock.style.top;
                currentBlock.style.left = readyBlock.style.left;
                currentBlock.isReady = true;
                if (checkWin()){
                    alarm("Вы победили!");
                }
            }
            onMouseUp();
        }
    }

    function checkWin(){
        isWin = true;
        blocks.forEach(element => {
            if (element.isReady === false)
                isWin = false;
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
                item.style.top = blockContainer.style.top + getRandomInt(h)*50 + "px";
                item.style.left = getRandomInt(w)*50+450 + "px";
                item.addEventListener("mouseup", onMouseUp);
                item.addEventListener("mousedown", onMouseDown);

                blockContainer.append(item);
            }
        }
        for (let y = 0; y < h; y++){
            for (let x = 0; x < w; x++){
                let item = document.createElement('span');
                item.className = 'ready-block';            
                item.x = x;
                item.y = y;
                item.style.backgroundImage = wayToImage;
                item.style.backgroundPositionX = -x*50 + "px";
                item.style.backgroundPositionY = -y*50 + "px";
                item.style.top = blockContainer.style.top + y*50 + "px";
                item.style.left = x*50 + "px";
                item.addEventListener("mouseup", mouseUpReady);

                readyContainer.append(item);
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);
    generateBlocks();
})();