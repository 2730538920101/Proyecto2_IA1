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
                    <label>Porcentaje A:</label>
                    <input type="text" id="porcentajeA" placeholder="Porcentaje A">
                    <label>Porcentaje B:</label>
                    <input type="text" id="porcentajeB" placeholder="Porcentaje B">
                    <label>Porcentaje C:</label>
                    <input type="text" id="porcentajeC" placeholder="Porcentaje C">
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
                console.log("Contenido del archivo CSV:", text); // Ver el contenido del CSV
                csvData = parseCSV(text);
                console.log("Datos CSV:", csvData); // Ver datos leídos

                // Determinar automáticamente el modelo basado en los encabezados del CSV
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
        if (data.length > 0) {
            const headers = Object.keys(data[0]);
            if (headers.includes('XTrain') && headers.includes('YTrain') && headers.includes('XToPredict')) {
                modelSelect.value = 'polynomial-regression';
                showModelParameters('polynomial-regression');
                fillParameters(data, 'polynomial-regression');
            } else if (headers.includes('XTrain') && headers.includes('YTrain')) {
                modelSelect.value = 'linear-regression';
                showModelParameters('linear-regression');
                fillParameters(data, 'linear-regression');
            } else if (headers.includes('Encabezados') && headers.includes('Entrenamiento') && headers.includes('Predict')) {
                modelSelect.value = 'decision-tree';
                showModelParameters('decision-tree');
                fillParameters(data, 'decision-tree');
            } else if (headers.includes('Valores') && headers.includes('PorcentajeA') && headers.includes('PorcentajeB') && headers.includes('PorcentajeC')) {
                modelSelect.value = 'naive-bayes';
                showModelParameters('naive-bayes');
                fillParameters(data, 'naive-bayes');
            } else if (headers.includes('Entrenamiento') && headers.includes('Punto') && headers.includes('Euclideano') && headers.includes('Manhattan')) {
                modelSelect.value = 'knn';
                showModelParameters('knn');
                fillParameters(data, 'knn');
            } else if (headers.includes('NumeroClusters') && headers.includes('Entrenamiento') && headers.includes('NumeroIteraciones')) {
                modelSelect.value = 'kmeans';
                showModelParameters('kmeans');
                fillParameters(data, 'kmeans');
            } else if (headers.includes('Num1') && headers.includes('Num2')) {
                modelSelect.value = 'neural-network';
                showModelParameters('neural-network');
                fillParameters(data, 'neural-network');
            } else {
                alert('El CSV no coincide con ningún modelo conocido.');
            }
        }
    }

    function fillParameters(data, selectedModel) {
        switch (selectedModel) {
            case 'linear-regression':
                const linearX = data.map(row => row.XTrain).join(',');
                const linearY = data.map(row => row.YTrain).join(',');
                document.getElementById('xtrain').value = linearX;
                document.getElementById('ytrain').value = linearY;
                break;

            case 'polynomial-regression':
                const polyX = data.map(row => row.XTrain).join(',');
                const polyY = data.map(row => row.YTrain).join(',');
                const polyXToPredict = data.map(row => row.XToPredict).join(',');
                document.getElementById('xtrain').value = polyX;
                document.getElementById('ytrain').value = polyY;
                document.getElementById('xtopredict').value = polyXToPredict;
                break;

            case 'decision-tree':
                const decisionHeaders = data.map(row => row.Encabezados).join(',');
                const decisionTraining = data.map(row => row.Entrenamiento).join(';'); // Cambiado a ";" para formato matriz
                const decisionPredict = data.map(row => row.Predict).join(','); 
                document.getElementById('headers').value = decisionHeaders;
                document.getElementById('training').value = decisionTraining;
                document.getElementById('predict').value = decisionPredict;
                break;

            case 'naive-bayes':
                const naiveValues = data.map(row => row.Valores).join(',');
                const naivePorcentajeA = data.map(row => row.PorcentajeA).join(',');
                const naivePorcentajeB = data.map(row => row.PorcentajeB).join(',');
                const naivePorcentajeC = data.map(row => row.PorcentajeC).join(',');
                document.getElementById('values').value = naiveValues;
                document.getElementById('porcentajeA').value = naivePorcentajeA;
                document.getElementById('porcentajeB').value = naivePorcentajeB;
                document.getElementById('porcentajeC').value = naivePorcentajeC;
                break;

            case 'neural-network':
                const neuralNum1 = data.map(row => row.Num1).join(',');
                const neuralNum2 = data.map(row => row.Num2).join(',');
                document.getElementById('num1').value = neuralNum1;
                document.getElementById('num2').value = neuralNum2;
                break;

            case 'kmeans':
                const kmeansClusters = data.map(row => row.NumeroClusters).join(',');
                const kmeansTraining = data.map(row => row.Entrenamiento).join(';'); // Cambiado a ";" para formato matriz
                const kmeansIterations = data.map(row => row.NumeroIteraciones).join(',');
                document.getElementById('clusters').value = kmeansClusters;
                document.getElementById('training').value = kmeansTraining;
                document.getElementById('iterations').value = kmeansIterations;
                break;

            case 'knn':
                const knnTraining = data.map(row => row.Entrenamiento).join(';'); // Cambiado a ";" para formato matriz
                const knnPoint = data.map(row => row.Punto).join(',');
                const knnEuclidean = data.map(row => row.Euclidean).join(',');
                const knnManhattan = data.map(row => row.Manhattan).join(',');
                document.getElementById('training').value = knnTraining;
                document.getElementById('point').value = knnPoint;
                document.getElementById('euclidean').value = knnEuclidean;
                document.getElementById('manhattan').value = knnManhattan;
                break;

            default:
                break;
        }
    }

    // Entrenamiento del modelo
    trainButton.addEventListener('click', () => {
        const selectedModel = modelSelect.value;
        const errors = validateInputs(selectedModel);

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        switch (selectedModel) {
            case 'linear-regression':
                trainLinearRegression();
                break;

            case 'polynomial-regression':
                trainPolynomialRegression();
                break;

            case 'decision-tree':
                trainDecisionTree();
                break;

            case 'naive-bayes':
                trainNaiveBayes();
                break;

            case 'neural-network':
                trainNeuralNetwork();
                break;

            case 'kmeans':
                trainKMeans();
                break;

            case 'knn':
                trainKNN();
                break;

            default:
                alert('Modelo no válido.');
        }
    });

    // Función de validación
    function validateInputs(model) {
        const errors = [];

        switch (model) {
            case 'linear-regression':
                const xTrain = document.getElementById('xtrain').value.split(',').map(Number);
                const yTrain = document.getElementById('ytrain').value.split(',').map(Number);
                if (xTrain.length !== yTrain.length) {
                    errors.push('La longitud de XTrain y YTrain debe ser igual.');
                }
                break;

            case 'polynomial-regression':
                const polyXTrain = document.getElementById('xtrain').value.split(',').map(Number);
                const polyYTrain = document.getElementById('ytrain').value.split(',').map(Number);
                const polyXToPredict = document.getElementById('xtopredict').value.split(',').map(Number);
                if (polyXTrain.length !== polyYTrain.length) {
                    errors.push('La longitud de XTrain y YTrain debe ser igual.');
                }
                if (polyXToPredict.length === 0) {
                    errors.push('XToPredict no puede estar vacío.');
                }
                break;

            case 'decision-tree':
                const decisionTraining = document.getElementById('training').value.split(';').map(row => row.split(',').map(Number));
                const decisionPredict = document.getElementById('predict').value.split(',').map(Number);
                if (decisionTraining.length === 0) {
                    errors.push('La matriz de entrenamiento no puede estar vacía.');
                }
                if (decisionPredict.length === 0) {
                    errors.push('La lista de valores para predecir no puede estar vacía.');
                }
                break;

            case 'naive-bayes':
                const naiveValues = document.getElementById('values').value.split(',').map(Number);
                const porcentajeA = Number(document.getElementById('porcentajeA').value);
                const porcentajeB = Number(document.getElementById('porcentajeB').value);
                const porcentajeC = Number(document.getElementById('porcentajeC').value);
                if (naiveValues.length === 0) {
                    errors.push('Los valores no pueden estar vacíos.');
                }
                if (porcentajeA + porcentajeB + porcentajeC !== 100) {
                    errors.push('Los porcentajes A, B y C deben sumar 100.');
                }
                break;

            case 'neural-network':
                // Aquí puedes agregar validaciones específicas para redes neuronales
                break;

            case 'kmeans':
                const kmeansClusters = Number(document.getElementById('clusters').value);
                const kmeansIterations = Number(document.getElementById('iterations').value);
                if (isNaN(kmeansClusters) || kmeansClusters <= 0) {
                    errors.push('El número de clusters debe ser un número positivo.');
                }
                if (isNaN(kmeansIterations) || kmeansIterations <= 0) {
                    errors.push('El número de iteraciones debe ser un número positivo.');
                }
                break;

            case 'knn':
                const knnTraining = document.getElementById('training').value.split(';').map(row => row.split(',').map(Number));
                const knnPoint = document.getElementById('point').value.split(',').map(Number);
                if (knnTraining.length === 0) {
                    errors.push('La matriz de entrenamiento no puede estar vacía.');
                }
                if (knnPoint.length === 0) {
                    errors.push('El punto de comparación no puede estar vacío.');
                }
                break;

            default:
                break;
        }

        return errors;
    }

    function trainLinearRegression() {
        // Lógica para entrenar el modelo de regresión lineal
        console.log('Entrenando regresión lineal...');
    }

    function trainPolynomialRegression() {
        // Lógica para entrenar el modelo de regresión polinómica
        console.log('Entrenando regresión polinómica...');
    }

    function trainDecisionTree() {
        // Lógica para entrenar el modelo de árbol de decisión
        console.log('Entrenando árbol de decisión...');
    }

    function trainNaiveBayes() {
        // Lógica para entrenar el modelo Naive Bayes
        console.log('Entrenando Naive Bayes...');
    }

    function trainNeuralNetwork() {
        // Lógica para entrenar la red neuronal
        console.log('Entrenando red neuronal...');
    }

    function trainKMeans() {
        // Lógica para entrenar el modelo K-means
        console.log('Entrenando K-means...');
    }

    function trainKNN() {
        // Lógica para entrenar el modelo KNN
        console.log('Entrenando KNN...');
    }
});
