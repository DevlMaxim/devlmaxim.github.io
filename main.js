class Square {
    constructor(rows, column) {
        this.rows = rows;
        this.column = column;
        this.paintCube();
        this.interval = 2;
        this.blockAndInterval = 52;
    }
    paintCube() { //Начальная отрисовка квадрата
        this.add = document.createElement('div');
        this.add.className = 'main_block';
        this.add.addEventListener('mouseleave', () => {this.timerForDelButton();});
        document.body.appendChild(this.add);
        for (let i = 0; i < this.rows; i++) {
            this.neededRow = document.createElement('div');
            this.add.appendChild(this.neededRow);
            for (let j = 0; j < this.column; j++) {
                this.createBlockElement(i, j);
            }
        }
        this.addRowButton = this.createTableElement('size-block buttons add add_c', () => { this.addRow(); }, '+');
        this.addColumnButton = this.createTableElement('size-block buttons add add_r', () => { this.addColumn(); }, '+');
        this.delColumnButton = this.createTableElement('size-block buttons del del_c', () => { this.delColumn(); }, '-');
        this.delRowButton = this.createTableElement('size-block buttons del del_r', () => { this.delRow(); }, '-');
    }
    createBlockElement(positionX, positionY) { //Создание блоков
        let addBlock = document.createElement('div');
        addBlock.className = 'size-block block';
        addBlock.addEventListener('mouseover', () => {this.showDelButton(positionX, positionY);});
        this.neededRow.appendChild(addBlock);
    }
    createTableElement(className, handler, value) { //Создание кнопок-управления
        let addButton = document.createElement('button');
        addButton.className = className;
        addButton.innerHTML = value;
        addButton.addEventListener('click', handler, false);  
        this.add.appendChild(addButton);
        return addButton;
    }
    timerForDelButton() { //таймер исчезновения кнопок удаления
        let timerId = setTimeout(()=>{this.hideDelButton();}, 100);
        this.add.addEventListener('mouseenter', () => {clearTimeout(timerId);});
    }
    hideDelButton() { //Скрытие кнопок удаления
        this.delColumnButton.style.display = 'none';
        this.delRowButton.style.display = 'none';
    }
    showDelButton(positionX, positionY) { //Отображение кнопок удаления и их позиционирование 
        if(this.add.children[1].children[0]) {
            this.delRowButton.style.display = 'block';
            this.delRowButton.style.top = this.interval+(this.blockAndInterval*positionX)+'px';
        } else
            this.delRowButton.style.display = 'none';
        if(this.add.children[0].children[1]) {
            this.delColumnButton.style.display = 'block';
            this.delColumnButton.style.left = this.interval+(this.blockAndInterval*positionY)+'px';
        } else
            this.delColumnButton.style.display = 'none';
    }
    addRow() { //Обработка кнопки "Добавить строку"
        let neededRow = document.createElement('div');
        this.add.insertBefore(neededRow, this.add.children[this.rows]);
        let i = this.rows;
	for(let j=0; j<this.column; j++) {
            let addBlock = document.createElement('div');
            addBlock.className='size-block block';
            addBlock.addEventListener('mouseover', () => {this.showDelButton(i, j);});
            neededRow.appendChild(addBlock);
        }
        this.rows++;
    }
    addColumn() { //Обработка кнопки "Добавить столбец"
        let j = this.column;
        for(let i = 0; i<this.rows; i++) {
            let numberRow = this.add.children[i];
            let addBlock = document.createElement('div');
            addBlock.className = 'size-block block';
            addBlock.addEventListener('mouseover', () => {this.showDelButton(i, j);});
            numberRow.appendChild(addBlock);
        }
        this.column++;
    }
    delColumn() { //Обработка кнопки "Удалить столбец"
       let positionButton = this.delColumnButton.style.left;
        positionButton = positionButton.substring(0, positionButton.indexOf('p'));
        positionButton = (positionButton-this.interval)/this.blockAndInterval;
        this.column--;
        for(let i = 0; i<this.rows; i++) {
            let div = this.add.children[i].children[positionButton];
            div.parentNode.removeChild(div);
            for(let j = positionButton; j<this.column; j++) {
                div = this.add.children[i].children[j];
                div.addEventListener('mouseover', () => {this.showDelButton(i, j);});
            }
        }
        this.hideDelButton(); //После клика скрываем кнопки удаления
    }
    delRow() { //Обработка кнопки "Удалить строку"
        let positionButton = this.delRowButton.style.top;
        positionButton = positionButton.substring(0, positionButton.indexOf('p'));
        positionButton = (positionButton-this.interval)/this.blockAndInterval;
        let div = this.add.children[positionButton];
        div.parentNode.removeChild(div);
        this.rows--;
        for(let i = positionButton; i<this.rows; i++) {
            for(let j = 0; j<this.column; j++) {
                div = this.add.children[i].children[j];
                div.addEventListener('mouseover', () => {this.showDelButton(i, j);});
            }
        }
        this.hideDelButton(); //После клика скрываем кнопки удаления
    }
}
