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
//Operaciones
const inputCategories = document.getElementById('category-name'); 
const btnAddCategories = document.getElementById('btn-add-category');
const categoriesList = document.getElementById('categories-list'); 
const filtersCategories = document.getElementById('filters-categories'); 
const inputEditCategory = document.getElementById("edit-category-name");
const btnEditCategory = document.getElementById("btn-edit-category");
const btnCancelEditCategory = document.getElementById('btn-cancel-edit-category')
// Balance
const balanceGanancia = document.getElementById('balance-ganancia');
const balanceTotal = document.getElementById('balance-total');
const balanceGasto = document.getElementById('balance-gasto');
// Filtros
const filtersType = document.getElementById("filters-type");
const filtersOrder = document.getElementById("filters-order");
// reportes
const conReportes = document.getElementById('with-reports');
const sinReportes = document.getElementById('without-reports');
const resumenCategGanancia = document.getElementById('resumen-categ-mayor-ganancia');
const resumenCategGasto = document.getElementById('resumen-categ-mayor-gasto');
const resumenCategBalance= document.getElementById('resumen-categ-mayor-balance');
const resumenMesGanancia = document.getElementById('resumen-mes-mayor-ganancia');
const resumenMesGasto = document.getElementById('resumen-mes-mayor-gasto');
const reporteTotalCateg = document.getElementById('report-categories-total');
const reporteTotalMes = document.getElementById('report-mes-total');

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

//Balance

const balanceData = (operaciones) => {
    return operaciones.reduce((balance, operacion) => {
        if (operacion.tipo === 'Ganancia') {
            return {
                ...balance,
                ganancias: balance.ganancias + operacion.monto,
                total: balance.total + operacion.monto,
            }
        }

        if (operacion.tipo === 'Gasto') {
            return {
                ...balance,
                gastos: balance.gastos + operacion.monto,
                total: balance.total + operacion.monto,
            }
        }
    },
        {
            ganancias: 0,
            gastos: 0,
            total: 0,
        }
    )
}


//Pintar section balance en HTML
const balanceHTML = (operaciones) => {
    const objBalance = balanceData(operaciones);
    balanceTotal.classList.remove('has-text-success', 'has-text-danger')

    if (objBalance.total > 0) {
        balanceTotal.classList.add('has-text-success');
        balanceTotal.classList.remove('has-text-danger')
    }
    if (objBalance.total < 0) {
        balanceTotal.classList.remove('has-text-success');
        balanceTotal.classList.add('has-text-danger')
    }

    balanceGanancia.innerHTML = `$ ${objBalance['ganancias']}`;
    balanceGasto.innerHTML = `$ ${objBalance['gastos']}`;
    balanceTotal.innerHTML = `$${objBalance['total']}`;
}

// Filtros

const filtrarTipo = (tipo, operaciones) => {
    const result = operaciones.filter((operacion) => operacion.tipo === tipo);
    return result;
};


const filtrarCategoria = (categoria, operaciones) => {
    const result = operaciones.filter((operacion) => operacion.categoria === categoria);
    return result;
};


const filtrarFechaMayorOIgual = (fecha, operaciones) => {
    const result = operaciones.filter(
        (operacion) => new Date(operacion.fecha).getTime() >= new Date(fecha).getTime());
    return result;
};




const ordenarMasMenosReciente = (operacion, orden) => {
    let result
    if (orden === 'ASC') {
        result = [...operacion].sort((a, b) => a.fecha > b.fecha ? 1 : -1)
    } else {
        result = [...operacion].sort((a, b) => a.fecha < b.fecha ? 1 : -1)
    }
    return result
}


const ordenarMayorMenorMonto = (operacion, orden) => {
    let result
    if (orden === 'menor') {
        result = [...operacion].sort((a, b) => a.monto > b.monto ? 1 : -1)
    } else {
        result = [...operacion].sort((a, b) => a.monto < b.monto ? 1 : -1)
    }
    return result
};


const ordenarAZ_ZA = (operacion, orden) => {
    let result
    if (orden === 'A-Z') {
        result = [...operacion].sort((a, b) => a.descripcion > b.descripcion ? 1 : -1)
    } else {
        result = [...operacion].sort((a, b) => a.descripcion < b.descripcion ? 1 : -1)
    }
    return result
};


const filtrarOperaciones = () => {
    const tipo = filtersType.value;
    const categoria = filtersCategories.value;
    const fecha = fechaFiltros.value;
    const orden = filtersOrder.value;

    let operaciones = operations;

    if (tipo !== "Todas") {
        operaciones = filtrarTipo(tipo, operaciones);
    }

    if (categoria !== "Todas") {
        operaciones = filtrarCategoria(categoria, operaciones);
    }

    operaciones = filtrarFechaMayorOIgual(fecha, operaciones);


    switch (orden) {
        case "Mas Reciente":
            operaciones = ordenarMasMenosReciente(operaciones, "DESC")
            break;
        case "Menos Reciente":
            operaciones = ordenarMasMenosReciente(operaciones, "ASC")
            break;
        case "Menor Monto":
            operaciones = ordenarMayorMenorMonto(operaciones, "menor")
            break;
        case "Mayor Monto":
            operaciones = ordenarMayorMenorMonto(operaciones, "mayor")
            break;
        case "A-Z":
            operaciones = ordenarAZ_ZA(operaciones, "A-Z")
            break;
        case "Z-A":
            operaciones = ordenarAZ_ZA(operaciones, "Z-A")
            break;
        default:
            break;
    }
    operationsHtml(operaciones)
    balanceHTML(operaciones)
    reportes(operaciones)
   
}

filtersType.addEventListener("change", filtrarOperaciones);
filtersCategories.addEventListener("change", filtrarOperaciones);
fechaFiltros.addEventListener('change', filtrarOperaciones);
filtersOrder.addEventListener('change', filtrarOperaciones);


//Reportes

const reportes = (operaciones) => {
    if (
      filtrarTipo("Ganancia", operaciones).length &&
      filtrarTipo("Gasto", operaciones).length
    ) {
      sinReportes.classList.add("is-hidden");
      conReportes.classList.remove("is-hidden");
    } else {
      sinReportes.classList.remove("is-hidden");
      conReportes.classList.add("is-hidden");
    }
    gastosGananciasCateg(operaciones);
    gastosGananciasMes(operaciones);
  };

  
let resultGastosGananciasCateg = {};

const gastosGananciasCateg = (operaciones) =>{
  const parcial = [];

  for (let i = 0; i < categories.length; i++) {
    const categoriaGanancia = operaciones.filter(operacion => operacion.categoria === categories[i].nombre && operacion.tipo === 'Ganancia').reduce((inicial, current) => Number(inicial) + Number(current.monto) ,0)

    const categoriaGasto = operaciones.filter(operacion => operacion.categoria === categories[i].nombre && operacion.tipo === 'Gasto').reduce((inicial, current) => Number(inicial) + Number(current.monto) ,0)

    const categoriaBalance = categoriaGanancia + categoriaGasto
    parcial.push({nombre: categories[i].nombre, ganancia: categoriaGanancia, gasto: categoriaGasto, balance: categoriaBalance})
  }

  resultGastosGananciasCateg = parcial.filter(elemen => elemen.ganancia > 0 || elemen.gasto < 0 )
  console.log(resultGastosGananciasCateg);

  const max = Math.max(...resultGastosGananciasCateg.map(valor => valor.ganancia))
  const mayorGanancia = resultGastosGananciasCateg.find(elemen => elemen.ganancia === max)
  resumenHTML(mayorGanancia, resumenCategGanancia, 'ganancia', 'has-text-success')

  const min = Math.min(...resultGastosGananciasCateg.map(valor => valor.gasto))
  const mayorGasto = resultGastosGananciasCateg.find(elemen => elemen.gasto === min)
  resumenHTML(mayorGasto, resumenCategGasto, 'gasto', 'has-text-danger')

  
  const maxBalance = Math.max(...resultGastosGananciasCateg.map(valor => valor.balance))
  const mayorBalance = resultGastosGananciasCateg.find(elemen => elemen.balance === maxBalance)
  resumenHTML(mayorBalance, resumenCategBalance, 'balance')

  

  totalesPorCategHTML(resultGastosGananciasCateg)
  return resultGastosGananciasCateg
 
};


const totalesPorCategHTML = (array) =>{
  reporteTotalCateg.innerHTML = " ";
  for (let i = 0; i < array.length; i++) {
    const box = `
    <div class="columns has-text-weight-medium m-0 is-mobile">
            <div class="column has-text-centered is-3">${array[i].nombre}</div>
            <div class="column has-text-centered has-text-success is-3">$${array[i].ganancia}</div>
            <div class="column has-text-centered has-text-danger is-3">$${array[i].gasto}</div>
            <div class="column has-text-centered is-3">$${array[i].balance}</div>
          </div>
    `
    reporteTotalCateg.insertAdjacentHTML("beforeend", box);
    
  }
}

const resumenHTML = (objeto, caja, tipo, color) => {
  caja.innerHTML = ' ';
 
  const box = `
  <div class="columns" >
  <div class="column"><span class="has-background-info-dark is-size-7 has-text-white radius p-1">${objeto.nombre}</span></div>
    <div class="column ${color}">$${objeto[tipo]}</div>
  </div>
  `
  caja.insertAdjacentHTML("beforeend", box);
}

// Reporte por mes

const obtenerResumenMeses = (operaciones) => {
    const resumen = {
      mayorGanancia: {
        fecha: "",
        monto: 0,
      },
      mayorGasto: {
        fecha: "",
        monto: 0,
      },
    };
  
    return operaciones.reduce((resumen, operacion) => {
      if (
        operacion.tipo === "Ganancia" &&
        operacion.monto > resumen.mayorGanancia.monto
      ) {
        resumen.mayorGanancia.fecha = operacion.fecha;
        resumen.mayorGanancia.monto = operacion.monto;
      }
  
      if (
        operacion.tipo === "Gasto" &&
        operacion.monto < resumen.mayorGasto.monto
      ) {
        resumen.mayorGasto.fecha = operacion.fecha;
        resumen.mayorGasto.monto = operacion.monto;
      }
  
      resumenMesesHTML(resumen, resumenMesGanancia, "mayorGanancia","has-text-success");
      resumenMesesHTML(resumen, resumenMesGasto, "mayorGasto", "has-text-danger");
      return resumen;
    }, resumen);
  };
  
  const resumenMesesHTML = (objeto, caja, tipo, color) => {
    caja.innerHTML = " ";
  
    const box = `
    <div class="columns has-text-weight-medium m-0 is-mobile">
      <div class="column has-text-right is-9 m-0">${objeto[tipo].fecha}</div>
      <div class="column has-text-right m-0 ${color}">$${objeto[tipo].monto}</div>
    </div>
    `;
    caja.insertAdjacentHTML("beforeend", box);
  };
  
  const totalesPorMesHTML = (objeto) => {
    reporteTotalMes.innerHTML = "";
  
    for (const key in objeto) {
      const box = `
      <div class="columns has-text-weight-medium m-0 is-mobile">
              <div class="column has-text-centered is-3">${key}</div>
              <div class="column has-text-centered has-text-success is-3">$${objeto[key].ganancia}</div>
              <div class="column has-text-centered has-text-danger is-3">$${objeto[key].gasto}</div>
              <div class="column has-text-centered is-3">$${objeto[key].balance}</div>
            </div>
      `;
      reporteTotalMes.insertAdjacentHTML("beforeend", box);
    }
  };
  
  const obtenerTotalesPorMes = (operaciones) => {
    return operaciones.reduce((totales, operacion) => {
      let fecha = new Date(operacion.fecha);
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
      const mes_Anio = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
  
      if (!totales[mes_Anio]) {
        totales[mes_Anio] = {
          ganancia: 0,
          gasto: 0,
          balance: 0,
        };
      }
  
      totales[mes_Anio][operacion.tipo.toLowerCase()] += Number(operacion.monto);
  
      if (operacion.tipo === "Ganancia") {
        totales[mes_Anio].balance += Number(operacion.monto);
      } else {
        totales[mes_Anio].balance += Number(operacion.monto);
      }
  
      totalesPorMesHTML(totales);
  
      return totales;
    }, {});
  };
  
  
  const gastosGananciasMes = (operaciones) => {
    obtenerResumenMeses(operaciones);
    obtenerTotalesPorMes(operaciones);
  };
  
  
  reportes(operations);
  filtrarOperaciones();
