class Сube {
    constructor(rows, column) {
        this.rows = rows;
        this.column = column;
    }
    paintCube() { //Начальная отрисовка квадрата
        let add = document.createElement('div');
        add.id = 'top_block';
        add.addEventListener('mouseleave', () => {this.unvisibleDelButtonTimer();});
        document.body.appendChild(add);
        for (let i = 0; i < this.rows; i++) {
            let neededRow = document.createElement('div');
            neededRow.id = 'row' + (i + 1);
            add.appendChild(neededRow);
            for (let j = 0; j < this.column; j++) {
                this.createBlockElement('div', 'size-block block', neededRow, i, j);
            }
        }
        this.createTableElement('button', 'size-block buttons add', 'add_c', '+', add);
        this.createTableElement('button', 'size-block buttons add', 'add_r', '+', add);
        this.createTableElement('button', 'size-block buttons del', 'del_c', '-', add);
        this.createTableElement('button', 'size-block buttons del', 'del_r', '-', add);
    }
    createBlockElement(elementType, className, neededRow, positionX, positionY) {
        let addBlock = document.createElement(elementType);
        addBlock.className = className;
        addBlock.addEventListener('mouseover', () => {this.visibleDelButton(positionX, positionY);});
        neededRow.appendChild(addBlock);
    }
    createTableElement(elementType, className, idButton, value, add) {
        let addButton = document.createElement(elementType);
        addButton.className = className;
        addButton.id = idButton;
        addButton.innerHTML = value;
        if(idButton === 'add_r')
         addButton.addEventListener('click', () => { this.addColumnButton(); }, false);
        else if(idButton === 'add_c')
         addButton.addEventListener('click', () => { this.addRowButton(); }, false);
        else if(idButton === 'del_c')
         addButton.addEventListener('click', () => { this.delColumnButton(); }, false);
        else if(idButton === 'del_r')
         addButton.addEventListener('click', () => { this.delRowButton(); }, false);  
        add.appendChild(addButton);
    }
    visibleDelButton(positionX,positionY){
        let visibleRowButton = document.getElementById('del_r');
        if(document.getElementById('row2')){
            visibleRowButton.style.display = 'block';
            visibleRowButton.style.top = 2+(52*positionX)+'px';
        }else
            visibleRowButton.style.display = 'none';
        let visibleColumnButton = document.getElementById('del_c');
        if(document.getElementById('row1').children[1]){
            visibleColumnButton.style.display = 'block';
            visibleColumnButton.style.left = 1+(52*positionY)+'px';
        }else
            visibleColumnButton.style.display = 'none';
    }
    unvisibleDelButtonTimer(){
        let timerId = setTimeout(this.unvisibleDelButton, 100);
        let add = document.getElementById('top_block');
        add.addEventListener('mouseenter', () => {clearTimeout(timerId);});
    }
    unvisibleDelButton(){
        let delRow = document.getElementById('del_r');
        delRow.style.display = 'none';
        let delColumn = document.getElementById('del_c');
        delColumn.style.display = 'none';
    }
    addRowButton(){ //Обработка кнопки "Добавить строку"
        let add = document.getElementById('top_block');
        let neededRow = document.createElement('div');
        neededRow.id= 'row'+(this.rows+1);
        add.appendChild(neededRow);
        let i = this.rows;
	for(let j=0; j<this.column; j++){
            let addBlock = document.createElement('div');
            addBlock.className='size-block block';
            addBlock.addEventListener('mouseover', () => {this.visibleDelButton(i, j);});
            neededRow.appendChild(addBlock);
        }
        this.rows++;
    }
    addColumnButton(){ //Обработка кнопки "Добавить столбец"
        let j = this.column;
        for(let i = 0; i<this.rows; i++){
            let numberRow = document.getElementById('row'+(i+1));
            let addBlock = document.createElement('div');
            addBlock.className = 'size-block block';
            addBlock.addEventListener('mouseover', () => {this.visibleDelButton(i, j);});
            numberRow.appendChild(addBlock);
        }
        this.column++;
	}
    delColumnButton(){
        let positionButton = document.getElementById('del_c').style.left;
        positionButton = positionButton.substring(0, positionButton.indexOf('p'));
        positionButton = (positionButton-1)/52;
        for(let i = 0; i<this.rows; i++){
            let div = document.getElementById('row'+(i+1)).children[positionButton];
            div.parentNode.removeChild(div);
            for(let j = positionButton; j<(this.column-1); j++){
                div = document.getElementById('row'+(i+1)).children[j];
                div.addEventListener('mouseover', () => {this.visibleDelButton(i, j);});
            }
        }
        this.column--;
        this.unvisibleDelButton();
    }
    delRowButton(positionX){
        let positionButton = document.getElementById('del_r').style.top;
        positionButton = positionButton.substring(0, positionButton.indexOf('p'));
        positionButton = (positionButton-2)/52;
        let div = document.getElementById('row'+(positionButton+1));
        div.parentNode.removeChild(div);
        for(let i = (positionButton+1); i<this.rows; i++){
            let newIdRow = document.getElementById('row'+(i+1));
            newIdRow.id = 'row'+i;
            for(let j = 0; j<this.column; j++){
                div = document.getElementById('row'+i).children[j];
                div.addEventListener('mouseover', () => {this.visibleDelButton(i-1, j);});
            }
        }
        this.rows--;
        this.unvisibleDelButton();
    }
    
}
