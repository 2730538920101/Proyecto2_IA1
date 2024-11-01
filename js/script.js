document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const modelSelect = document.getElementById('model-select');
    const parametersContainer = document.getElementById('parameters');
    const trainButton = document.getElementById('train-button');

    let csvData = []; // Para almacenar los datos CSV

    // Cambia el contenido de parámetros según el modelo seleccionado
    modelSelect.addEventListener('change', () => {
        const selectedModel = modelSelect.value;
        showModelParameters(selectedModel);
    });

    // Función para mostrar los parámetros específicos del modelo
    function showModelParameters(model) {
        parametersContainer.innerHTML = ''; // Limpiar contenido

        switch (model) {
            case 'linear-regression':
                parametersContainer.innerHTML = `
                    <label>XTrain:</label>
                    <input type="text" id="xtrain" placeholder="Lista de valores numéricos">
                    <label>YTrain:</label>
                    <input type="text" id="ytrain" placeholder="Lista de valores numéricos">
                `;
                break;

            case 'polynomial-regression':
                parametersContainer.innerHTML = `
                    <label>XTrain:</label>
                    <input type="text" id="xtrain" placeholder="Lista de valores numéricos">
                    <label>YTrain:</label>
                    <input type="text" id="ytrain" placeholder="Lista de valores numéricos">
                    <label>XToPredict:</label>
                    <input type="text" id="xtopredict" placeholder="Lista de valores numéricos">
                `;
                break;

            case 'decision-tree':
                parametersContainer.innerHTML = `
                    <label>Encabezados:</label>
                    <input type="text" id="headers" placeholder="Lista de nombres de encabezados">
                    <label>Entrenamiento:</label>
                    <input type="text" id="training" placeholder="Matriz de entrenamiento">
                    <label>Predict:</label>
                    <input type="text" id="predict" placeholder="Lista de valores para predecir">
                `;
                break;

            case 'naive-bayes':
                parametersContainer.innerHTML = `
                    <label>Valores:</label>
                    <input type="text" id="values" placeholder="Lista de valores">
                    <div id="percentage-container">
                        <label>Porcentajes:</label>
                    </div>
                `;
                break;

            case 'neural-network':
                parametersContainer.innerHTML = `
                    <label>Num1:</label>
                    <input type="number" id="num1" placeholder="Primer valor numérico">
                    <label>Num2:</label>
                    <input type="number" id="num2" placeholder="Segundo valor numérico">
                `;
                break;

            case 'kmeans':
                parametersContainer.innerHTML = `
                    <label>Número de Clusters:</label>
                    <input type="number" id="clusters" placeholder="Número de clusters">
                    <label>Entrenamiento:</label>
                    <input type="text" id="training" placeholder="Matriz de entrenamiento">
                    <label>Número de Iteraciones:</label>
                    <input type="number" id="iterations" placeholder="Número de iteraciones">
                `;
                break;

            case 'knn':
                parametersContainer.innerHTML = `
                    <label>Entrenamiento:</label>
                    <input type="text" id="training" placeholder="Matriz de entrenamiento">
                    <label>Punto:</label>
                    <input type="text" id="point" placeholder="Registro de comparación">
                    <label>Euclideano:</label>
                    <input type="number" id="euclidean" placeholder="Distancia Euclideana">
                    <label>Manhattan:</label>
                    <input type="text" id="manhattan" placeholder="Valores Manhattan">
                `;
                break;

            default:
                parametersContainer.innerHTML = '<p>Seleccione un modelo para ver sus parámetros.</p>';
                break;
        }
    }

    // Cargar el archivo CSV
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const text = e.target.result;
                csvData = parseCSV(text);
                determineModel(csvData);
            };
            reader.readAsText(file);
        }
    });

    function parseCSV(text) {
        const rows = text.split('\n').map(row => {
            const regex = /("([^"]|"")*"|[^;]+)/g;
            return row.match(regex).map(value => value.replace(/^"|"$/g, '').replace(/""/g, '"').trim());
        });

        const headers = rows[0].map(header => header.trim());
        const data = rows.slice(1).map(row => {
            const obj = {};
            row.forEach((value, index) => {
                // Ajustar el formato para CSVs específicos
                if (value.startsWith("[") && value.endsWith("]")) {
                    const items = value.slice(1, -1).split(",").map(item => item.trim());
                    obj[headers[index]] = items; // Almacena como array
                } else {
                    obj[headers[index]] = value;
                }
            });
            return obj;
        }).filter(row => Object.keys(row).length > 0);
        return data;
    }

    function determineModel(data) {
        if (data.length > 0) {
            const headers = Object.keys(data[0]);

            // Verifica si hay un encabezado llamado 'Valores' y encabezados que comienzan con 'Porcentaje'
            const naiveBayesHeaders = headers.filter(header => header.startsWith('Porcentaje'));

            if (headers.includes('Valores') && naiveBayesHeaders.length > 0) {
                modelSelect.value = 'naive-bayes';
                showModelParameters('naive-bayes');
                fillParameters(data, 'naive-bayes');
                renderDynamicPercentages(naiveBayesHeaders); // Llama a la función para renderizar porcentajes dinámicamente
                return;
            }

            const models = {
                'polynomial-regression': ['XTrain', 'YTrain', 'XToPredict'],
                'linear-regression': ['XTrain', 'YTrain'],
                'decision-tree': ['Encabezados', 'Entrenamiento', 'Predict'],
                'knn': ['Entrenamiento', 'Punto', 'Euclideano', 'Manhattan'],
                'kmeans': ['NumeroClusters', 'Entrenamiento', 'NumeroIteraciones'],
                'neural-network': ['Num1', 'Num2']
            };

            for (const [model, modelHeaders] of Object.entries(models)) {
                if (modelHeaders.every(header => headers.includes(header))) {
                    modelSelect.value = model;
                    showModelParameters(model);
                    fillParameters(data, model);
                    return;
                }
            }

            alert('El CSV no coincide con ningún modelo conocido.');
        }
    }

    function renderDynamicPercentages(headers) {
        const percentageContainer = document.getElementById('percentage-container');
        percentageContainer.innerHTML = ''; // Limpiar contenedor de porcentajes

        headers.forEach((header, index) => {
            const percentageInput = document.createElement('input');
            percentageInput.type = 'text';
            percentageInput.id = `percentage${index}`;
            percentageInput.placeholder = `${header}`;
            percentageContainer.appendChild(percentageInput);
        });
    }

    function fillParameters(data, selectedModel) {
        switch (selectedModel) {
            case 'linear-regression':
            case 'polynomial-regression':
                document.getElementById('xtrain').value = data.map(row => row.XTrain).join(',');
                document.getElementById('ytrain').value = data.map(row => row.YTrain).join(',');
                if (selectedModel === 'polynomial-regression') {
                    document.getElementById('xtopredict').value = data.map(row => row.XToPredict).join(',');
                }
                break;

            case 'decision-tree':
                document.getElementById('headers').value = data[0].Encabezados; // Asume que es solo uno
                document.getElementById('training').value = data.map(row => row.Entrenamiento).join(';');
                document.getElementById('predict').value = data.map(row => row.Predict).join(',');
                break;

            case 'naive-bayes':
                document.getElementById('values').value = data[0].Valores.join(','); // Solo un conjunto de valores
                const percentageInputs = Array.from(document.querySelectorAll('#percentage-container input'));
                percentageInputs.forEach((input, index) => {
                    const percentageValue = data[0][`Porcentaje${String.fromCharCode(65 + index)}`];
                    if (percentageValue !== undefined) {
                        input.value = percentageValue;
                    }
                });
                break;

            case 'neural-network':
                document.getElementById('num1').value = data[0].Num1; // Solo un valor
                document.getElementById('num2').value = data[0].Num2; // Solo un valor
                break;

            case 'kmeans':
                document.getElementById('clusters').value = data[0].NumeroClusters; // Solo un valor
                document.getElementById('training').value = data.map(row => row.Entrenamiento).join(';');
                document.getElementById('iterations').value = data[0].NumeroIteraciones; // Solo un valor
                break;

            case 'knn':
                document.getElementById('training').value = data.map(row => row.Entrenamiento).join(';');
                document.getElementById('point').value = data[0].Punto; // Solo un valor
                document.getElementById('euclidean').value = data[0].Euclideano; // Solo un valor
                document.getElementById('manhattan').value = data[0].Manhattan; // Solo un valor
                break;

            default:
                break;
        }
    }

    trainButton.addEventListener('click', () => {
        alert('Entrenamiento comenzado con los parámetros: ' + JSON.stringify(getParameters()));
    });

    function getParameters() {
        const selectedModel = modelSelect.value;
        const parameters = {};

        switch (selectedModel) {
            case 'linear-regression':
                parameters.XTrain = document.getElementById('xtrain').value.split(',').map(Number);
                parameters.YTrain = document.getElementById('ytrain').value.split(',').map(Number);
                break;

            case 'polynomial-regression':
                parameters.XTrain = document.getElementById('xtrain').value.split(',').map(Number);
                parameters.YTrain = document.getElementById('ytrain').value.split(',').map(Number);
                parameters.XToPredict = document.getElementById('xtopredict').value.split(',').map(Number);
                break;

            case 'decision-tree':
                parameters.Encabezados = document.getElementById('headers').value.split(',');
                parameters.Entrenamiento = document.getElementById('training').value.split(';').map(row => row.split(','));
                parameters.Predict = document.getElementById('predict').value.split(',');
                break;

            case 'naive-bayes':
                parameters.Valores = document.getElementById('values').value.split(',');
                parameters.Porcentajes = Array.from(document.querySelectorAll('#percentage-container input')).map(input => Number(input.value));
                break;

            case 'neural-network':
                parameters.Num1 = Number(document.getElementById('num1').value);
                parameters.Num2 = Number(document.getElementById('num2').value);
                break;

            case 'kmeans':
                parameters.NumeroClusters = Number(document.getElementById('clusters').value);
                parameters.Entrenamiento = document.getElementById('training').value.split(';').map(row => row.split(','));
                parameters.NumeroIteraciones = Number(document.getElementById('iterations').value);
                break;

            case 'knn':
                parameters.Entrenamiento = document.getElementById('training').value.split(';').map(row => row.split(','));
                parameters.Punto = document.getElementById('point').value.split(',');
                parameters.Euclideano = Number(document.getElementById('euclidean').value);
                parameters.Manhattan = document.getElementById('manhattan').value.split(',');
                break;

            default:
                break;
        }

        return parameters;
    }
});
