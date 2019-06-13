class Square {
    constructor(rows, column) {
        this.rows = rows;
        this.column = column;
        this.paintCube();
        this.addColumnButton; //Кнопка добавления столбцов
        this.addRowButton; //Кнопка добавления строк
        this.delColumnButton; //Кнопка удаления столбцов
        this.delRowButton; //Кнопка удаления строк
    }
    paintCube() { //Начальная отрисовка квадрата
        let add = document.createElement('div');
        add.className = 'main_block';
        add.addEventListener('mouseleave', () => {this.timerForDelButton(add);});
        document.body.appendChild(add);
        for (let i = 0; i < this.rows; i++) {
            let neededRow = document.createElement('div');
            add.appendChild(neededRow);
            for (let j = 0; j < this.column; j++) {
                this.createBlockElement('div', 'size-block block', neededRow, i, j, add);
            }
        }
        this.addRowButton = this.createTableElement('button', 'size-block buttons add add_c', () => { this.addRow(add); }, '+', add);
        this.addColumnButton = this.createTableElement('button', 'size-block buttons add add_r', () => { this.addColumn(add); }, '+', add);
        this.delColumnButton = this.createTableElement('button', 'size-block buttons del del_c', () => { this.delColumn(add); }, '-', add);
        this.delRowButton = this.createTableElement('button', 'size-block buttons del del_r', () => { this.delRow(add); }, '-', add);
    }
    createBlockElement(elementType, className, neededRow, positionX, positionY, add) { //Создание блоков
        let addBlock = document.createElement(elementType);
        addBlock.className = className;
        addBlock.addEventListener('mouseover', () => {this.showDelButton(positionX, positionY, add);});
        neededRow.appendChild(addBlock);
    }
    createTableElement(elementType, className, handler, value, add) { //Создание кнопок-управления
        let addButton = document.createElement(elementType);
        addButton.className = className;
        addButton.innerHTML = value;
        addButton.addEventListener('click', handler, false);  
        add.appendChild(addButton);
        return addButton;
    }
    timerForDelButton(add){ //таймер исчезновения кнопок удаления
        let timerId = setTimeout(()=>{this.hideDelButton();}, 100);
        add.addEventListener('mouseenter', () => {clearTimeout(timerId);});
    }
    hideDelButton(){ //Скрытие кнопок удаления
        this.delColumnButton.style.display = 'none';
        this.delRowButton.style.display = 'none';
    }
    showDelButton(positionX, positionY, add){ //Отображение кнопок удаления и их позиционирование 
        if(add.children[1].children[0]){
            this.delRowButton.style.display = 'block';
            this.delRowButton.style.top = 2+(52*positionX)+'px';
        }else
            this.delRowButton.style.display = 'none';
        if(add.children[0].children[1]){
            this.delColumnButton.style.display = 'block';
            this.delColumnButton.style.left = 2+(52*positionY)+'px';
        }else
            this.delColumnButton.style.display = 'none';
    }
    addRow(add){ //Обработка кнопки "Добавить строку"
        let neededRow = document.createElement('div');
        add.insertBefore(neededRow, add.children[this.rows]);
        let i = this.rows;
		for(let j=0; j<this.column; j++){
            let addBlock = document.createElement('div');
            addBlock.className='size-block block';
            addBlock.addEventListener('mouseover', () => {this.showDelButton(i, j, add);});
            neededRow.appendChild(addBlock);
        }
        this.rows++;
    }
    addColumn(add){ //Обработка кнопки "Добавить столбец"
        let j = this.column;
        for(let i = 0; i<this.rows; i++){
            let numberRow = add.children[i];
            let addBlock = document.createElement('div');
            addBlock.className = 'size-block block';
            addBlock.addEventListener('mouseover', () => {this.showDelButton(i, j, add);});
            numberRow.appendChild(addBlock);
        }
        this.column++;
	}
    delColumn(add){ //Обработка кнопки "Удалить столбец"
       let positionButton = this.delColumnButton.style.left;
        positionButton = positionButton.substring(0, positionButton.indexOf('p'));
        positionButton = (positionButton-2)/52;
        this.column--;
        for(let i = 0; i<this.rows; i++){
            let div = add.children[i].children[positionButton];
            div.parentNode.removeChild(div);
            for(let j = positionButton; j<this.column; j++){
                div = add.children[i].children[j];
                div.addEventListener('mouseover', () => {this.showDelButton(i, j, add);});
            }
        }
        this.hideDelButton(); //После клика скрываем кнопки удаления
    }
    delRow(add){ //Обработка кнопки "Удалить строку"
        let positionButton = this.delRowButton.style.top;
        positionButton = positionButton.substring(0, positionButton.indexOf('p'));
        positionButton = (positionButton-2)/52;
        let div = add.children[positionButton];
        div.parentNode.removeChild(div);
        this.rows--;
        for(let i = positionButton; i<this.rows; i++){
            for(let j = 0; j<this.column; j++){
                div = add.children[i].children[j];
                div.addEventListener('mouseover', () => {this.showDelButton(i, j, add);});
            }
        }
        this.hideDelButton(); //После клика скрываем кнопки удаления
    }
}
