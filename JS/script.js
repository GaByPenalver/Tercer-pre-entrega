document.addEventListener("DOMContentLoaded", function () {
    let dataArray = [
        { id: 1, tarea: "Ir al supermercado", status: true },
        { id: 2, tarea: "Preparar almuerzo", status: false },
        { id: 3, tarea: "Ir al mall", status: true },
    ];

    let myElement = document.getElementById("btn-add");
    
    myElement.addEventListener("click", add_tarea);
    myElement.addEventListener("submit", add_tarea);

    function carga() {
        let body = document.getElementById("tbody");
        body.innerHTML = "";

        let html = "";
        for (const item of dataArray) {
            let status_check = "";
            if (item.status === true) {
                status_check = "checked";
            }
            let status = (html += "<tr>");
            html += "<td>" + item.id + "</td>";
            html += "<td>" + item.tarea + "</td>";
            html += '<td><input class="miCheckbox" type="checkbox" name="" id="" value= "' + item.id + '" ' + status_check + " ></td>";
            html += '<td><button class="btn-delete" type="button" value-id="' + item.id + '" style="color: red; width: 20px;">X</button></td>';
            html += "</tr>";
        }
        body.innerHTML = html;
        let total = document.querySelector(".total");
        total.innerHTML = dataArray.length;

        admin_check();
        delete_tarea();
        contar_registros_ok();
    }

    function generarID() {
        
        const maxID = 100;

        let id;
        do {

            id = Math.floor(Math.random() * maxID) + 1;
        } while (dataArray.some((item) => item.id === id)); 
        return id;
    }
    function add_tarea() {
        let input = document.getElementById("value-nt");
        let input_value = input.value.trim();

        if (input_value !== "" && input_value !== null) {
            let new_element = { id: generarID(), tarea: input.value, status: false };
            dataArray.push(new_element);
        }
        input.value = "";
        carga();
    }

    function contar_registros_ok() {
        let count_tarea_realizada = 0;
        for (const item of dataArray) {
            if (item.status) {
                count_tarea_realizada++;
            }
        }
        let total_registro_ok = document.querySelector(".r-total");
        
        total_registro_ok.innerHTML = count_tarea_realizada;
    }

    function delete_tarea() {
        
        var items_tarea = document.querySelectorAll(".btn-delete");

        items_tarea.forEach(function (item_tarea) {
            item_tarea.addEventListener("click", function () {
                let id_delete = item_tarea.getAttribute("value-id");
                console.log(id_delete);

                dataArray = dataArray.filter(function (dataArrayItem) {
                    return dataArrayItem.id != id_delete;
                });

                carga();
            });
        });
    }
    function admin_check() {
        var checkboxes = document.querySelectorAll(".miCheckbox");
        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener("change", function () {
                let status_check = checkbox.checked;
                let value_check = checkbox.value;
                change_status_check(status_check, value_check);
                carga();
            });
        });
    }

    function change_status_check(status_check, id_tarea) {
        const index = dataArray.findIndex((item) => item.id == id_tarea);

        if (index !== -1) {
            if (typeof status_check === "boolean") {
                dataArray[index].status = status_check;
                console.log("Estado de la tarea editado exitosamente:", dataArray[index]);

            } else {
                console.log("El estado de la tarea debe ser un booleano.");
            }
        } else {
            console.log("No se encontró ninguna tarea con el ID:", id_tarea);
        }
    }

    carga();
});