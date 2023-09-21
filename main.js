(function () {
    //создаём и возвращаем заголовк приложения 
    function createAppTitle(title) {
        //помещаем в переменную элемеент h2
        let appTitle = document.createElement('h2');
        appTitle.classList.add('mb-3', 'mt-3')
        //заполняем заголовок переменой для возможности легко его поменять
        appTitle.innerHTML = title;
        //возвращаем заголовок
        return appTitle
    }

    //создаём и возвращаем форму для создания дела
    function createTodoItemForm() {
        //создаём форму
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWriper = document.createElement('div');
        let button = document.createElement('button');

        //стилизуем форму
        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название дела';
        input.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary', 'ms-3');
        button.textContent = 'Добавить дело';

        //заполняем форму контентом
        buttonWriper.append(button);
        form.append(input, buttonWriper);

        //возвращаем форму
        return {
            form,
            input,
            button,
        };

    }

    function createSupBtn() {
        let supBtnDiv = document.createElement('div')
        let buttonFilterEven = document.createElement('button')
        let buttonFilterNotEven = document.createElement('button')
        let buttonDelFirst = document.createElement('button')
        let buttonDelLast = document.createElement('button')

        supBtnDiv.classList.add('d-flex', 'mb-3', 'justify-content-around')
        buttonFilterEven.classList.add('btn', 'btn-warning');
        buttonFilterNotEven.classList.add('btn', 'btn-warning');
        buttonFilterNotEven.textContent = 'Не чётные'
        buttonFilterEven.textContent = 'Чётные'
        buttonDelFirst.classList.add('btn', 'btn-danger')
        buttonDelLast.classList.add('btn', 'btn-danger')
        buttonDelFirst.textContent = 'Удалить первый'
        buttonDelLast.textContent = 'Удалить последний'

        supBtnDiv.append(buttonFilterEven, buttonFilterNotEven, buttonDelFirst, buttonDelLast,)

        return {
            supBtnDiv,
            buttonFilterEven,
            buttonFilterNotEven,
            buttonDelFirst,
            buttonDelLast
        }
    }

    //создаём и возвращаем список
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list
    }

    //создаем карточку дела
    function createTodoItem(obj) {
        //создаём элемнет списка
        let item = document.createElement('li')
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        item.textContent = obj.name;

        //кнопки для управления делом
        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        //стилизуем кнопки
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готов';
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить';

        //вкладываем кнопки
        buttonGroup.append(doneButton, deleteButton);
        item.append(buttonGroup);

        //возвращаем
        return {
            item,
            doneButton,
            deleteButton,
        }
    }

    //возвращаем данные в видее строки
    function objToJson(obj) {
        return JSON.stringify(obj)
    }
    //возвращаем строку в виде данных
    function jsonToObj(obj) {
        return JSON.parse(obj)
    }
    //возвращаем данные из LocalStorage
    function getListObj() {
        return localStorage.getItem('list')
    }
    //записываем данные в LocalStorage
    function setListObj(obj) {
        localStorage.setItem('list', obj)
    }
    //добавление в ЛС
    function addToArrObj(obj) {
        //получаем состояние листа
        let arrObj = getListObj();
        //запись массива
        arrObj = arrObj ? jsonToObj(arrObj) : [];
        arrObj.push(obj)
        setListObj(objToJson(arrObj))
    }
    //удаление из ЛС
    function removeFromList(id) {

        let arrObj = jsonToObj(getListObj())

        let newArrObj = []
        for (let i = 0; i < arrObj.length; i++) {
            if (arrObj[i].id !== id) {
                newArrObj.push(arrObj[i])
            }
        }
        setListObj(objToJson(newArrObj))
    }
    //удаление из ЛС последнего элемента
    function removeFromListFirst() {

        let arrObj = jsonToObj(getListObj())

        arrObj.shift()

        setListObj(objToJson(arrObj))
    }
    function removeFromListLast() {

        let arrObj = jsonToObj(getListObj())

        arrObj.pop()

        setListObj(objToJson(arrObj))
    }
    //щётчик id
    let i = 1
    function counter(obj) {
        i = obj.id + 1
    }

    //получаем доступ к DOMlthtde html страницы
    document.addEventListener('DOMContentLoaded', function () {
        //находим контейнер в котором будет размещаться приложение
        let container = document.getElementById('todo-app');

        //вызываем созданные выше функции
        let todoAppTitle = createAppTitle('Список дел');
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        let supBtn = createSupBtn();

        //заполняем контейнер созданными элементами
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(supBtn.supBtnDiv);
        container.append(todoList);

        //возвращаем данные из ЛС
        let data = getListObj()
        let listArr = []

        if (data !== "" && data !== null) {

            listArr = jsonToObj(data)
            let todoItem = createTodoItem(listArr[0])
            todoList.append(todoItem.item)
            for (let i = 1; i < listArr.length; i++) {
                let todoItem = createTodoItem(listArr[i])
                todoList.append(todoItem.item)
                todoItem.doneButton.addEventListener('click', function () {
                    todoItem.item.classList.toggle('list-group-item-success');
                });
                supBtn.buttonFilterNotEven.addEventListener('click', function () {
                    if(listArr[i].id%2){
                        todoItem.item.classList.toggle('list-group-item-warning');
                    }
                });
                supBtn.buttonFilterEven.addEventListener('click', function () {
                    if(listArr[i].id%2===0){
                        todoItem.item.classList.toggle('list-group-item-warning');
                    }
                });
                todoItem.deleteButton.addEventListener('click', function () {
                    if (confirm('Вы уверены?')) {
                        todoItem.item.remove();
                        removeFromList(listArr[i].id)
                    }
                });
            }
            todoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    removeFromList(listArr[0].id)
                }
            });
            supBtn.buttonFilterEven.addEventListener('click', function () {
                if(listArr[0].id%2===0){
                    todoItem.item.classList.toggle('list-group-item-warning');
                }
            });
            todoItem.doneButton.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success');
            });
            supBtn.buttonFilterNotEven.addEventListener('click', function () {
                if(listArr[0].id%2){
                    todoItem.item.classList.toggle('list-group-item-warning');
                }
            });
            supBtn.buttonDelLast.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    removeFromListLast()
                    todoItem.item.remove();
                }
            });
            supBtn.buttonDelFirst.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    removeFromListFirst()
                }
            });

        }

        //созздаём событие при нажатии на энетр или кнопку
        todoItemForm.form.addEventListener('submit', function (e) {
            //убираем перезагруззку страницы
            e.preventDefault();

            //если импут пуст игнорируем создание элемента
            if (!todoItemForm.input.value) {
                return
            }


            let obj = {
                id: i,
                name: todoItemForm.input.value,
            }

            counter(obj)

            addToArrObj(obj)

            //помещаем в переменную результат выполнения функции
            let todoItem = createTodoItem(obj)

            //создаёём и добавляем в список новое дело
            todoList.append(todoItem.item);

            //обнуляем поле
            todoItemForm.input.value = '';
        });

    });

})();