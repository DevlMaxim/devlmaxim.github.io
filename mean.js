			r_n = 4; //Начальное кол. строк
			c_n = 4; //Начальное кол. столбцов
			function start_point(){ //Начальная отрисовка квадрата
				var add = document.getElementById('top_block');				
				for(i=0;i<r_n;i++){
					for(j=0; j<c_n; j++){
					add.insertAdjacentHTML('beforeEnd','<div class="block" id="r_'+ (i+1) +'_c_'+(j+1)+'" style="left: '+(3+ (53*j))+'px; top:'+(3+(53*i))+'px;" onmouseover="hover('+ (i+1) +','+(j+1)+')" ></div>');
					}
				}
				var all_block = document.getElementById('all_block'); //Рисуем рамку c width and height 321px
				all_block.style.width = '321px';
				all_block.style.height = '321px';
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
				for(i=1; i<=c_n; i++){
				var del_row = document.getElementById('r_'+ r_n +'_c_'+i);
				del_row.parentNode.removeChild(del_row);
				}
				r_n--;
				document.getElementById('add_r').style.cssText='top: '+(68+(53*r_n))+'px; left: 64px;';
				document.getElementById('top_block').style.height=(53*r_n)+'px';
				var location_del = document.getElementById('del_r').style.top; //Получаем значение свойства top для кнопки удаления
				var location_del_numb= location_del.substring(0, location_del.indexOf('p')); //Получаем значение top для кнопки удалить без px
				var location_row = document.getElementById('r_'+r_n+'_c_1').style.top; //Получаем значение свойства top для последнего квадрата
				var location_row_numb = location_row.substring(0, location_row.indexOf('p')); //Получаем значение top для последнего квадрата без px
				if((location_del_numb-111) > location_row_numb){ //Сдвигаем кнопку, если была удалена последняя строка
					document.getElementById('del_r').style.top = 11+(53*r_n)+'px';
				}
				var visible_row = document.getElementById('del_r');
				if(document.getElementById('r_2_c_1')){ //Видимость кнопки 
					visible_row.style.display = 'block';
				}else{
					visible_row.style.display = 'none';
				}
			}
			function del_cClick(button){ //Обработка кнопки "Удалить столбец"
				for(i=1; i<=r_n; i++){
				var del_row = document.getElementById('r_'+ i +'_c_'+c_n);
				del_row.parentNode.removeChild(del_row);
				}
				c_n--;
				document.getElementById('add_c').style.cssText='left: '+(68+(53*c_n))+'px; top: 64px;';
				document.getElementById('top_block').style.width=(53*c_n)+'px';
				var location_del = document.getElementById('del_c').style.left;//Получаем значение свойства top для кнопки удаления
				var location_del_numb = location_del.substring(0, location_del.indexOf('p')); //Получаем значение top для кнопки удалить без px
				var location_col = document.getElementById('r_1_c_'+c_n).style.left; //Получаем значение свойства top для последнего квадрата
				var location_col_numb = location_col.substring(0, location_col.indexOf('p'));//Получаем значение top для последнего квадрата без px
				if((location_del_numb-111) > location_col_numb){ //Сдвигаем кнопку, если был удален последний столбец
					document.getElementById('del_c').style.left = 11+(53*c_n)+'px';
				}
				var visible_col = document.getElementById('del_c');
				if(document.getElementById('r_1_c_2')){ //Видимость кнопки 
					visible_col.style.display = 'block';
				}else{
					visible_col.style.display = 'none';
				}
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
