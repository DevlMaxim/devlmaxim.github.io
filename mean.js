			r_n = 4; //Начальное кол. строк
			c_n = 4; //Начальное кол. столбцов
			function start_point(){ //Начальная отрисовка квадрата
				var add = document.getElementById('top_block');				
				for(i=0;i<r_n;i++){
					for(j=0; j<c_n; j++){
					add.insertAdjacentHTML('beforeEnd','<div class="block" id="r_'+ (i+1) +'_c_'+(j+1)+'" style="left: '+(3+ (53*j))+'px; top:'+(3+(53*i))+'px;" onmouseover="hover('+ (i+1) +','+(j+1)+')" ></div>');
					}
				}
			}
			function add_rClick(button){ //Обработка кнопки "Добавить строку"
				var new_row = document.getElementById('top_block');
				for(i=0; i<c_n; i++){
					new_row.insertAdjacentHTML('beforeEnd','<div class="block" id="r_'+ (r_n+1) +'_c_'+(i+1)+'" style="left: '+(3+ (53*i))+'px; top:'+(3+(53*r_n))+'px;" onmouseover="hover('+ (r_n+1) +','+(i+1)+')" ></div>');
				}
				r_n++;
				document.getElementById('add_r').style.cssText='top: '+(68+(53*r_n))+'px; left: 64px;';
				document.getElementById('top_block').style.height=(53*r_n)+'px';
			}
			function add_cClick(button){ //Обработка кнопки "Добавить столбец"
				var new_col = document.getElementById('top_block');
				for(i=0; i<r_n; i++){
					new_col.insertAdjacentHTML('beforeEnd','<div class="block" id="r_'+ (i+1) +'_c_'+(c_n+1)+'" style="left: '+(3+ (53*c_n))+'px; top:'+(3+(53*i))+'px;" onmouseover="hover('+ (i+1) +','+(c_n+1)+')" ></div>');
				}
				c_n++;
				document.getElementById('add_c').style.cssText='left: '+(68+(53*c_n))+'px; top: 64px;';
				document.getElementById('top_block').style.width=(53*c_n)+'px';
			}
			function del_rClick(button){ //Обработка кнопки "Удалить строку"
				var location_del = document.getElementById('del_r').style.top; //Получаем значение свойства top для кнопки удаления
				var location_del_numb= location_del.substring(0, location_del.indexOf('p')); //Получаем значение top для кнопки удалить без px
				var position_row = (location_del_numb-10)/53; //Получаем номер строки
				for(i=1; i<=c_n; i++){
				var del_row = document.getElementById('r_'+ position_row +'_c_'+i); //Находим нужный блок, нужной строки
				del_row.parentNode.removeChild(del_row); //Удаляем ту самую строку
					for(j=position_row; j<r_n; j++){ //Сдвигаем столбцы 
					var refresh_row = document.getElementById('r_'+ (j+1) +'_c_'+i);//Находим столбец выше
					refresh_row.id='r_'+ j +'_c_'+i; //Переприсваиваем ему новый id
					refresh_row.style.top=3+(53*(j-1))+'px'; //Переприсваиваем ему новый top
					refresh_row.removeAttribute('onmouseover'); //Удаляем старый обработчик событий
					refresh_row.setAttribute('onmouseover', 'hover('+ j +','+i+')'); //Добавляем новый, с новыми координатами
					}
				}
				r_n--;
				document.getElementById('add_r').style.cssText='top: '+(68+(53*r_n))+'px; left: 64px;';
				document.getElementById('top_block').style.height=(53*r_n)+'px';
				var visible_row = document.getElementById('del_r');
				if(document.getElementById('r_2_c_1')){ //Видимость кнопки 
					visible_row.style.display = 'block';
				}else{
					visible_row.style.display = 'none';
				}
				visible_row.style.display = 'none';//после нажатия прячем
			}
			function del_cClick(button){ //Обработка кнопки "Удалить столбец"
				var location_del = document.getElementById('del_c').style.left;//Получаем значение свойства top для кнопки удаления
				var location_del_numb = location_del.substring(0, location_del.indexOf('p')); //Получаем значение top для кнопки удалить без px
				var position_col = (location_del_numb-10)/53; //Получаем номер строки
				for(i=1; i<=r_n; i++){
				var del_row = document.getElementById('r_'+ i +'_c_'+position_col);
				del_row.parentNode.removeChild(del_row);
					for(j=position_col; j<c_n; j++){ //Сдвигаем столбцы 
					var refresh_row = document.getElementById('r_'+ i +'_c_'+(j+1));//Находим столбец выше
					refresh_row.id='r_'+ i +'_c_'+j; //Переприсваиваем ему новый id
					refresh_row.style.left=3+(53*(j-1))+'px'; //Переприсваиваем ему новый top
					refresh_row.removeAttribute('onmouseover'); //Удаляем старый обработчик событий
					refresh_row.setAttribute('onmouseover', 'hover('+ i +','+j+')'); //Добавляем новый, с новыми координатами
					}
				}
				c_n--;
				document.getElementById('add_c').style.cssText='left: '+(68+(53*c_n))+'px; top: 64px;';
				document.getElementById('top_block').style.width=(53*c_n)+'px';
				var visible_col = document.getElementById('del_c');
				if(document.getElementById('r_1_c_2')){ //Видимость кнопки 
					visible_col.style.display = 'block';
				}else{
					visible_col.style.display = 'none';
				}
				visible_col.style.display = 'none';//после нажатия прячем
			}
			function hover(row,col){ //Обработка при навидении на блок 
				var visible_row = document.getElementById('del_r');
				if(document.getElementById('r_2_c_1')){ //Видимость кнопки 
					visible_row.style.display = 'block';
				}else{
					visible_row.style.display = 'none';
				}
				visible_row.style.top = 63+(53*(row-1))+'px'; //Исходя из координат сдвигаем кнопку удаления строки
				var visible_col = document.getElementById('del_c');
				if(document.getElementById('r_1_c_2')){ //Видимость кнопки 
					visible_col.style.display = 'block';
				}else{
					visible_col.style.display = 'none';
				}
				visible_col.style.left = 63+(53*(col-1))+'px';//Исходя из координат сдвигаем кнопку удаления столбца
			}
			function block_output(){
				var block_output_row = document.getElementById('del_r');
				var block_output_col = document.getElementById('del_c');
				var width_block = 12+((c_n+2)*53);
				var height_block = 12+((r_n+2)*53);
				var add_right_block = 12+((c_n+1)*53);
				var add_bottom_block = 12+((r_n+1)*53);
					if((event.pageX >9 && event.pageY >9) && (event.pageX <width_block && event.pageY <height_block))
					{
						if(event.pageX <60 && event.pageY <60){//левый верхний угол
							block_output_row.style.display = 'none';
							block_output_col.style.display = 'none';
						}else if(event.pageX >add_right_block && event.pageY <60){//правый верхний угол по x изменяем видимость для кнопки del справа
							block_output_row.style.display = 'none';
							block_output_col.style.display = 'none';
						}else if(event.pageX<60 && event.pageY >add_bottom_block){//левый нижний угол по у изменяем видимость для кнопки del справа
							block_output_row.style.display = 'none';
							block_output_col.style.display = 'none';
						}else if(event.pageX >add_right_block && event.pageY >114){//область справа под кнопкой add
							block_output_row.style.display = 'none';
							block_output_col.style.display = 'none';
						}else if(event.pageX >115 && event.pageY > add_bottom_block){//область снизу под кнопкой add
							block_output_row.style.display = 'none';
							block_output_col.style.display = 'none';
						}
					}else{
					block_output_row.style.display = 'none';
					block_output_col.style.display = 'none';
					}
			}
			function leave_button(){
				document.getElementById('del_r').style.display = 'none';
				document.getElementById('del_c').style.display = 'none';
			}
