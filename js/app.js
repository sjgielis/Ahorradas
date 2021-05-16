prompt("funciono")
const btnNewOperation = document.getElementById('btn-new-operation') 
const btnCancelOperation = document.getElementById('btn-cancel-operation'); 
const btnAddOperation = document.getElementById('btn-add-operation');
const btnBalance = document.getElementById('btn-balance');
const btnCategories = document.getElementById('btn-categories');
const btnReports = document.getElementById('btn-reports');
const operationDescription = document.getElementById("operation-description");
const operationAmount = document.getElementById("operation-amount");
const operationType = document.getElementById("operation-type");
const operationCategories = document.getElementById("operation-categories");
const addNewOperation = document.getElementById('add-new-operation')
const withoutOperations = document.getElementById("without-operations");
const operationList = document.getElementById("operations-list");
const operationDate = document.getElementById('operation-date');
const sectionReports = document.getElementById('section-reports'); 
const sectionCategories = document.getElementById('section-categories');
const editCategorySection = document.getElementById("edit-category-section");
const btnShowFilters = document.getElementById('btn-show-filters');
const btnHideFilters = document.getElementById('btn-hide-filters');
const filters = document.getElementById('filters');
const sectionBalance = document.getElementById('balance-section');
const formOperation = document.getElementById('form-operation');

// Funcion Nav-Burger Responsive
const burgerMenu = document.getElementById('navbar-burger')
const navbarBasicExample = document.getElementById('navbarBasicExample')

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('is-active')
    navbarBasicExample.classList.toggle('is-active')
})

// Funcion Time
const fechaFiltros = document.getElementById("filters-date");

const date = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
}
fechaFiltros.value = date();
operationDate.value = date();

btnBalance.addEventListener('click', () => {
    sectionBalance.classList.remove('is-hidden')
    sectionReports.classList.add('is-hidden')
    sectionCategories.classList.add('is-hidden')
    formOperation.classList.add('is-hidden')
    formEditOperation.classList.add('is-hidden')
});

btnReports.addEventListener("click", () => {
    sectionBalance.classList.add("is-hidden");
    formOperation.classList.add("is-hidden");
    sectionReports.classList.remove("is-hidden");
    sectionCategories.classList.add("is-hidden");
    formEditOperation.classList.add('is-hidden')
    filtrarOperaciones()
  });


btnCategories.addEventListener('click', () => {
    sectionBalance.classList.add('is-hidden')
    sectionReports.classList.add('is-hidden')
    sectionCategories.classList.remove('is-hidden')
    formOperation.classList.add('is-hidden')
    formEditOperation.classList.add('is-hidden')
  });


//Nueva operación 

btnNewOperation.addEventListener('click', () => {
    sectionBalance.classList.add('is-hidden')
    sectionReports.classList.add('is-hidden')
    formOperation.classList.remove('is-hidden')
})

btnCancelOperation.addEventListener('click', () => {
    formOperation.classList.add('is-hidden')
    sectionBalance.classList.remove('is-hidden')
})

const resetFormOperation = () => {
    operationDescription.value = '';
    operationAmount.value = 0;
    operationType.value = 'Gasto';
    operationCategories.value = categories[0].nombre
    operationDate.value = date();
}

// funcion mostrar y ocultar filtros

btnHideFilters.addEventListener('click', () => {
    filters.classList.add('is-hidden')
    btnHideFilters.classList.add('is-hidden')
    btnShowFilters.classList.remove('is-hidden')
})
btnShowFilters.addEventListener('click', () => {
    filters.classList.remove('is-hidden')
    btnHideFilters.classList.remove('is-hidden')
    btnShowFilters.classList.add('is-hidden')
})
let operations = [];

btnAddOperation.addEventListener('click', () => {
    const newOperation = {
        id: uuid.v4(),
        descripcion: operationDescription.value,
        monto: parseInt(operationAmount.value),
        tipo: operationType.value,
        categoria: operationCategories.value,
        fecha: operationDate.value
    }

    if (newOperation.tipo === 'Gasto') {
        newOperation.monto = Number(newOperation.monto) * (- 1)
    }

    operations.push(newOperation);
    localStorage.setItem('operacionesStorage', JSON.stringify(operations));
    const getOperacionesStorage = JSON.parse(localStorage.getItem('operacionesStorage'))
    operationsHtml(getOperacionesStorage);
    balanceHTML(getOperacionesStorage);
    filtrarOperaciones();

    resetFormOperation();
    formOperation.classList.add('is-hidden')
    sectionBalance.classList.remove('is-hidden')
})


// chequea el array operations

const checkOperations = (arrOperaciones) => {
    if (arrOperaciones.length === 0) {
        operationList.classList.add("is-hidden");
        withoutOperations.classList.remove("is-hidden");
    } else {
        withoutOperations.classList.add("is-hidden");
        operationList.classList.remove("is-hidden");
    }
};

//Pintar en html

const operationsHtml = (operations) => {
    checkOperations(operations);
    addNewOperation.innerHTML = '';
    let box;
    for (let i = 0; i < operations.length; i++) {
        if (operations[i].tipo === 'Gasto') {
            box = `
        <div id="${operations[i].id}" class ="columns mt-3 m-0">
        <div class="column is-3 is-size-6">${operations[i].descripcion}</div>
        <div class="column is-2 is-size-7 "><span class="has-text-success has-text-weight-medium has-background-info-light p-1">${operations[i].categoria}</span></div>
        <div class="column is-3 is-size-6">${operations[i].fecha}</div>
        <div class="column is-2 is-size-6 has-text-danger ">${operations[i].monto}</div>
        <div class="column is-2 px-0">
        <a class="is-size-7 mr-1" onclick="editOperation('${operations[i].id}')">Editar</a>
        <a class="is-size-7" onclick="deleteOperation('${operations[i].id}')">Eliminar</a>
        </div>
    </div>
        `
        } else {
            box = `
         <div id="${operations[i].id}" class ="columns mt-3 m-0">
         <div class="column is-3 is-size-6">${operations[i].descripcion}</div>
         <div class="column is-2 is-size-7 "><span class="has-text-success has-text-weight-medium has-background-info-light p-1">${operations[i].categoria}</span></div>
         <div class="column is-3 is-size-6">${operations[i].fecha}</div>
         <div class="column is-2 is-size-6 has-text-success">${operations[i].monto}</div>
         <div class="column is-2 px-0">
         <a class="is-size-7 mr-1" onclick="editOperation('${operations[i].id}')">Editar</a>
         <a class="is-size-7" onclick="deleteOperation('${operations[i].id}')">Eliminar</a>
         </div>
     </div>
         `
        }
        addNewOperation.insertAdjacentHTML('beforeend', box);
    }
};

operations = JSON.parse(localStorage.getItem('operacionesStorage')) ?? operations
operationsHtml(operations);


//Editar una nueva operacion
const btnEditOperation = document.getElementById('btn-edit-operation');
const formEditOperation = document.getElementById('form-edit-operation') 
const operationEditDescription = document.getElementById("operation-edit-description")
const operationEditAmount = document.getElementById("operation-edit-amount");
const operationEditType = document.getElementById("operation-edit-type");
const operationEditCategories = document.getElementById("operation-edit-categories");
const operationEditDate = document.getElementById('operation-edit-date');

//esconder la seccion que edita categoria
const hideSectionsOperation = () => {
    sectionCategories.classList.add("is-hidden");
    sectionReports.classList.add("is-hidden");
    formOperation.classList.add("is-hidden");
    sectionBalance.classList.add("is-hidden");
    editCategorySection.classList.add("is-hidden");
    formEditOperation.classList.remove("is-hidden");
};

const showSectionOperation = () => {
    sectionCategories.classList.add("is-hidden");
    sectionReports.classList.add("is-hidden");
    formOperation.classList.add("is-hidden");
    sectionBalance.classList.remove("is-hidden");
    editCategorySection.classList.add("is-hidden");
    formEditOperation.classList.add("is-hidden");

};

//EDITAR operaciones
let position; 
const editOperation = (operation) => {
    hideSectionsOperation();
    position = operations.findIndex((e) => e.id == operation);
    operationEditDescription.value = operations[position].descripcion
    operationEditAmount.value = operations[position].monto
    operationEditType.value = operations[position].tipo
    operationEditCategories.value = operations[position].categoria
    operationEditDate.value = operations[position].fecha

    if ( operationEditType.value === 'Gasto') {
        operationEditAmount.value = Number(operations[position].monto) * -1;
    }

    return position;
};

btnEditOperation.addEventListener('click', () => {
    operations[position].descripcion = operationEditDescription.value;
    operations[position].monto = operationEditAmount.value;
    operations[position].tipo = operationEditType.value;
    operations[position].categoria = operationEditCategories.value;
    operations[position].fecha = operationEditDate.value;

    if (operations[position].tipo === 'Gasto') {
        operations[position].monto = Number(operationEditAmount.value) * -1;
    }


    localStorage.setItem('operacionesStorage', JSON.stringify(operations));
    operationsHtml(operations);
    balanceHTML(operations);
    filtrarOperaciones();
    reportes(operations);

    showSectionOperation();
})

//eliminar operaciones
const deleteOperation = (operation) => {
    const value = operations.findIndex((elem) => elem.id == operation);
    if (value >= 0) {
        operations.splice(value, 1);
        localStorage.setItem('operacionesStorage', JSON.stringify(operations));
        operationsHtml(operations);
        balanceHTML(operations);
        filtrarOperaciones();
        reportes(operations);
    }

};

//Seccion operaciones
const inputCategories = document.getElementById('category-name'); 
const btnAddCategories = document.getElementById('btn-add-category');
const categoriesList = document.getElementById('categories-list'); 
const filtersCategories = document.getElementById('filters-categories'); 
const inputEditCategory = document.getElementById("edit-category-name");
const btnEditCategory = document.getElementById("btn-edit-category");
const btnCancelEditCategory = document.getElementById('btn-cancel-edit-category')




//Array DEL OBJETO CATEGORIAS
let categories = [
    { id: uuid.v4(), nombre: "Comida" },
    { id: uuid.v4(), nombre: "Educacion" },
    { id: uuid.v4(), nombre: "Salidas" },
    { id: uuid.v4(), nombre: "Servicios" },
    { id: uuid.v4(), nombre: "Trabajo" },
    { id: uuid.v4(), nombre: "Transporte" }
];

// pintar en la seccion categorias en los select
const categoriesHTML = (categories) => {
    categoriesList.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        const categoria = `
    <div class="columns m-0 is-justify-content-space-between is-9 is-offset-3">
      <div class="column is-size-7 is-10"><span class="has-background-info-dark has-text-white radius p-1">${categories[i].nombre}</span></div>
      <div class="column is-2 px-0">
      <a href="#" class="is-size-7 mr-2" onclick="editCategory('${categories[i].id}')" >Editar</a>
      <a href="#" class="is-size-7" onclick="deleteCategory('${categories[i].id}')">Eliminar</a>
      </div>
    </div>
    `
        categoriesList.insertAdjacentHTML('beforeend', categoria)
    }
}

categories = JSON.parse(localStorage.getItem('categoriasStorage')) ?? categories
categoriesHTML(categories);

//pintar el HTML en la seccion de nueva operacion y filtros
const categoriesSelect = (categories) => {
    operationCategories.innerHTML = '';
    filtersCategories.innerHTML = `<option>Todas</option>`;
    for (let i = 0; i < categories.length; i++) {
        const categoria = `
       <option>${categories[i].nombre}</option>
        `
        operationCategories.insertAdjacentHTML('beforeend', categoria);
        filtersCategories.insertAdjacentHTML('beforeend', categoria);
        operationEditCategories.insertAdjacentHTML('beforeend', categoria);
    }
}
categoriesSelect(categories);


//Funcion boton AGREGAR en categorias
btnAddCategories.addEventListener('click', () => {
    const newCategory = inputCategories.value;
    categories.push({ id: uuid.v4(), nombre: newCategory });

    localStorage.setItem('categoriasStorage', JSON.stringify(categories))
    const getCategoriesStorage = JSON.parse(localStorage.getItem('categoriasStorage'))
    categoriesHTML(getCategoriesStorage);
    categoriesSelect(getCategoriesStorage);

    inputCategories.value = '';
});


//esconder seccion editar categoria
const hideSectionsEdit = () => {
    sectionCategories.classList.add("is-hidden");
    sectionReports.classList.add("is-hidden");
    formOperation.classList.add("is-hidden");
    sectionBalance.classList.add("is-hidden");
    editCategorySection.classList.remove("is-hidden");
};

const hideEditSection = () => {
    sectionCategories.classList.remove("is-hidden");
    sectionReports.classList.add("is-hidden");
    formOperation.classList.add("is-hidden");
    sectionBalance.classList.add("is-hidden");
    editCategorySection.classList.add("is-hidden");
};



//editar categoria
let resultado;
const editCategory = (category) => {
    hideSectionsEdit();
    const index = categories.findIndex((elem) => elem.id === category);
    inputEditCategory.value = categories[index].nombre;
    resultado = { i: index, valor: inputEditCategory.value };
    return resultado
};

btnEditCategory.addEventListener("click", () => {
    categories[resultado.i].nombre = inputEditCategory.value;
    localStorage.setItem("categoriasStorage", JSON.stringify(categories));
    categoriesHTML(categories);
    categoriesSelect(categories);

    operations.forEach(() => {
        const posicion = operations.findIndex(
            (operation) => operation.categoria === resultado.valor);
        if (posicion >= 0) {
            operations[posicion].categoria = inputEditCategory.value
            localStorage.setItem("operacionesStorage", JSON.stringify(operations))
        }
        operationsHtml(operations);
        balanceHTML(operations);
    });

    hideEditSection();
});



//eliminar categoria
const deleteCategory = (category) => {
    const categoryName = categories.find((elem) => elem.id === category);

    const value = categories.findIndex((elem) => elem.id === category);
    if (value >= 0) {
        categories.splice(value, 1);
        localStorage.setItem('categoriasStorage', JSON.stringify(categories))
        categoriesHTML(categories);
        categoriesSelect(categories);
    }

    operations.forEach(() => {
        const index = operations.findIndex(
            (operation) => operation.categoria === categoryName.nombre
        );
        if (index >= 0) {
            operations.splice(index, 1);
            localStorage.setItem("operacionesStorage", JSON.stringify(operations))
        }
        operationsHtml(operations);
        balanceHTML(operations);
    });

};


