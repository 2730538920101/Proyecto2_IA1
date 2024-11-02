import { train, predict, graph, tendence } from './actions.js';
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const modelSelect = document.getElementById('model-select');
    const parametersContainer = document.getElementById('parameters');
    const trainButton = document.getElementById('trainButton');
    const predictButton = document.getElementById('predictButton');
    const showChartButton = document.getElementById('showChartButton');
    const showTendenceButton = document.getElementById('showTendenceButton');

    let csvData = [];

    const modelConfig = {
        'linear-regression': {
            params: `
                <label>XTrain:</label><input type="text" id="xtrain" placeholder="Lista de valores numéricos">
                <label>YTrain:</label><input type="text" id="ytrain" placeholder="Lista de valores numéricos">`,
            fill: fillLinearRegression,
            validate: validateLinearRegression
        },
        'polynomial-regression': {
            params: `
                <label>XTrain:</label><input type="text" id="xtrain" placeholder="Lista de valores numéricos">
                <label>YTrain:</label><input type="text" id="ytrain" placeholder="Lista de valores numéricos">
                <label>XToPredict:</label><input type="text" id="xtopredict" placeholder="Lista de valores numéricos">`,
            fill: fillPolynomialRegression,
            validate: validatePolynomialRegression
        },
        'decision-tree': {
            params: `
                <label>Encabezados:</label><input type="text" id="headers" placeholder="Lista de nombres de encabezados">
                <label>Entrenamiento:</label><input type="text" id="training" placeholder="Matriz de entrenamiento">
                <label>Predict:</label><input type="text" id="predict" placeholder="Lista de valores para predecir">`,
            fill: fillDecisionTree,
            validate: validateDecisionTree
        },
        'naive-bayes': {
            params: `
                <label>Valores:</label><input type="text" id="values" placeholder="Lista de valores">
                <label>Porcentaje A:</label><input type="text" id="porcentajeA" placeholder="Porcentaje A">
                <label>Porcentaje B:</label><input type="text" id="porcentajeB" placeholder="Porcentaje B">
                <label>Porcentaje C:</label><input type="text" id="porcentajeC" placeholder="Porcentaje C">`,
            fill: fillNaiveBayes,
            validate: validateNaiveBayes
        },
        'neural-network': {
            params: `
                <label>Num1:</label><input type="number" id="num1" placeholder="Primer valor numérico">
                <label>Num2:</label><input type="number" id="num2" placeholder="Segundo valor numérico">`,
            fill: fillNeuralNetwork,
            validate: validateNeuralNetwork
        },
        'kmeans': {
            params: `
                <label>Número de Clusters:</label><input type="number" id="clusters" placeholder="Número de clusters">
                <label>Entrenamiento:</label><input type="text" id="training" placeholder="Matriz de entrenamiento">
                <label>Número de Iteraciones:</label><input type="number" id="iterations" placeholder="Número de iteraciones">`,
            fill: fillKMeans,
            validate: validateKMeans
        },
        'knn': {
            params: `
                <label>Entrenamiento:</label><input type="text" id="training" placeholder="Matriz de entrenamiento">
                <label>Punto:</label><input type="text" id="point" placeholder="Registro de comparación">
                <label>Euclideano:</label><input type="number" id="euclidean" placeholder="Distancia Euclideana">
                <label>Manhattan:</label><input type="text" id="manhattan" placeholder="Valores Manhattan">`,
            fill: fillKNN,
            validate: validateKNN
        }
    };

    // Mostrar parámetros según el modelo seleccionado
    modelSelect.addEventListener('change', () => {
        const selectedModel = modelSelect.value;
        showModelParameters(selectedModel);
    });

    function showModelParameters(model) {
        parametersContainer.innerHTML = modelConfig[model]?.params || '<p>Seleccione un modelo para ver sus parámetros.</p>';
    }

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
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
                obj[headers[index]] = value;
            });
            return obj;
        }).filter(row => Object.keys(row).length > 0);
        return data;
    }

    function determineModel(data) {
        const headers = data.length > 0 ? Object.keys(data[0]) : [];
        let selectedModel = null;

        if (headers.includes('XTrain') && headers.includes('YTrain') && headers.includes('XToPredict')) {
            selectedModel = 'polynomial-regression';
        } else if (headers.includes('XTrain') && headers.includes('YTrain')) {
            selectedModel = 'linear-regression';
        } else if (headers.includes('Encabezados') && headers.includes('Entrenamiento') && headers.includes('Predict')) {
            selectedModel = 'decision-tree';
        } else if (headers.includes('Valores') && headers.includes('PorcentajeA') && headers.includes('PorcentajeB') && headers.includes('PorcentajeC')) {
            selectedModel = 'naive-bayes';
        } else if (headers.includes('Num1') && headers.includes('Num2')) {
            selectedModel = 'neural-network';
        } else if (headers.includes('NumeroClusters') && headers.includes('Entrenamiento') && headers.includes('NumeroIteraciones')) {
            selectedModel = 'kmeans';
        } else if (headers.includes('Entrenamiento') && headers.includes('Punto') && headers.includes('Euclideano') && headers.includes('Manhattan')) {
            selectedModel = 'knn';
        }

        if (selectedModel) {
            modelSelect.value = selectedModel;
            showModelParameters(selectedModel);
            modelConfig[selectedModel].fill(data);
        } else {
            alert('El CSV no coincide con ningún modelo conocido.');
        }
    }

    // Funciones de llenado de datos
    function fillLinearRegression(data) {
        document.getElementById('xtrain').value = data.map(row => row.XTrain).join(',');
        document.getElementById('ytrain').value = data.map(row => row.YTrain).join(',');
    }

    function fillPolynomialRegression(data) {
        document.getElementById('xtrain').value = data.map(row => row.XTrain).join(',');
        document.getElementById('ytrain').value = data.map(row => row.YTrain).join(',');
        document.getElementById('xtopredict').value = data.map(row => row.XToPredict).join(',');
    }

    function fillDecisionTree(data) {
        document.getElementById('headers').value = data.map(row => row.Encabezados).join(',');
        document.getElementById('training').value = data.map(row => row.Entrenamiento).join(';');
        document.getElementById('predict').value = data.map(row => row.Predict).join(',');
    }

    function fillNaiveBayes(data) {
        document.getElementById('values').value = data.map(row => row.Valores).join(',');
        document.getElementById('porcentajeA').value = data.map(row => row.PorcentajeA).join(',');
        document.getElementById('porcentajeB').value = data.map(row => row.PorcentajeB).join(',');
        document.getElementById('porcentajeC').value = data.map(row => row.PorcentajeC).join(',');
    }

    function fillNeuralNetwork(data) {
        document.getElementById('num1').value = data.map(row => row.Num1).join(',');
        document.getElementById('num2').value = data.map(row => row.Num2).join(',');
    }

    function fillKMeans(data) {
        document.getElementById('clusters').value = data.map(row => row.NumeroClusters).join(',');
        document.getElementById('training').value = data.map(row => row.Entrenamiento).join(';');
        document.getElementById('iterations').value = data.map(row => row.NumeroIteraciones).join(',');
    }

    function fillKNN(data) {
        document.getElementById('training').value = data.map(row => row.Entrenamiento).join(';');
        document.getElementById('point').value = data.map(row => row.Punto).join(',');
        document.getElementById('euclidean').value = data.map(row => row.Euclideano).join(',');
        document.getElementById('manhattan').value = data.map(row => row.Manhattan).join(',');
    }

    // Funciones de validación
    function validateLinearRegression() {
        const errors = [];
        const xTrain = document.getElementById('xtrain').value.split(',').map(Number);
        const yTrain = document.getElementById('ytrain').value.split(',').map(Number);
        if (xTrain.length !== yTrain.length) {
            errors.push('La longitud de XTrain y YTrain debe ser igual.');
        }
        return errors;
    }

    function validatePolynomialRegression() {
        const errors = [];
        const xTrain = document.getElementById('xtrain').value.split(',').map(Number);
        const yTrain = document.getElementById('ytrain').value.split(',').map(Number);
        const xToPredict = document.getElementById('xtopredict').value.split(',').map(Number);
        if (xTrain.length !== yTrain.length) {
            errors.push('La longitud de XTrain y YTrain debe ser igual.');
        }
        if (xToPredict.length === 0) {
            errors.push('XToPredict no puede estar vacío.');
        }
        return errors;
    }

    function validateDecisionTree() {
        const errors = [];
        const headers = document.getElementById('headers').value.split(',');
        const training = document.getElementById('training').value.split(';').map(row => row.split(','));
        const predict = document.getElementById('predict').value.split(',');
        if (predict.length === 0) {
            errors.push('El campo Predict no puede estar vacío.');
        }
        return errors;
    }

    function validateNaiveBayes() {
        const errors = [];
        const values = document.getElementById('values').value.split(',');
        const porcentajeA = document.getElementById('porcentajeA').value;
        const porcentajeB = document.getElementById('porcentajeB').value;
        const porcentajeC = document.getElementById('porcentajeC').value;
        if (!values.length) errors.push('El campo Valores no puede estar vacío.');
        if ([porcentajeA, porcentajeB, porcentajeC].some(p => isNaN(p))) {
            errors.push('Todos los porcentajes deben ser números.');
        }
        return errors;
    }

    function validateNeuralNetwork() {
        const errors = [];
        const num1 = Number(document.getElementById('num1').value);
        const num2 = Number(document.getElementById('num2').value);
        if (isNaN(num1) || isNaN(num2)) {
            errors.push('Ambos valores deben ser números.');
        }
        return errors;
    }

    function validateKMeans() {
        const errors = [];
        const clusters = Number(document.getElementById('clusters').value);
        const training = document.getElementById('training').value.split(';').map(row => row.split(','));
        if (isNaN(clusters) || clusters <= 0) {
            errors.push('El número de clusters debe ser un número positivo.');
        }
        if (training.some(row => row.length < 2)) {
            errors.push('Cada fila de entrenamiento debe tener al menos dos valores.');
        }
        return errors;
    }

    function validateKNN() {
        const errors = [];
        const training = document.getElementById('training').value.split(';').map(row => row.split(','));
        const point = document.getElementById('point').value.split(',').map(Number);
        if (!training.length) errors.push('El campo Entrenamiento no puede estar vacío.');
        if (!point.length) errors.push('El campo Punto no puede estar vacío.');
        return errors;
    }

    // Manejo de acciones
    function handleAction(action) {
        const selectedModel = modelSelect.value;
        const model = modelConfig[selectedModel];
        if (model) {
            const errors = model.validate();
            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }
            // Llama a la función correspondiente del archivo actions.js
            switch (action) {
                case 'train':
                    train(csvData); // Pasar los datos cargados
                    break;
                case 'predict':
                    predict(csvData); // Pasar los datos cargados
                    break;
                case 'graph':
                    graph(csvData); // Pasar los datos cargados
                    break;
                case 'tendence':
                    tendence(csvData); // Pasar los datos cargados
                    break;
                default:
                    alert('Acción no válida.');
            }
        } else {
            alert('Modelo no válido.');
        }
    }

    trainButton.addEventListener('click', () => handleAction('train'));
    predictButton.addEventListener('click', () => handleAction('predict'));
    showChartButton.addEventListener('click', () => handleAction('graph'));
    showTendenceButton.addEventListener('click', () => handleAction('tendence'));
});
