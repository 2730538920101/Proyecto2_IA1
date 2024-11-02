document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const modelSelect = document.getElementById('model-select');
    const parametersContainer = document.getElementById('parameters');
    const trainButton = document.getElementById('trainButton');
    const predictButton = document.getElementById('predictButton');
    const showChartButton = document.getElementById('showChartButton');

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

    predictButton.addEventListener('click', () => {
        const selectedModel = modelSelect.value;
        const errors = validateInputs(selectedModel);

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        switch (selectedModel) {
            case 'linear-regression':
                predictLinearRegression();
                break;

            case 'polynomial-regression':
                predictPolynomialRegression();
                break;

            case 'decision-tree':
                predictDecisionTree();
                break;

            case 'naive-bayes':
                predictNaiveBayes();
                break;

            case 'neural-network':
                predictNeuralNetwork();
                break;

            case 'kmeans':
                predictKMeans();
                break;

            case 'knn':
                predictKNN();
                break;

            default:
                alert('Modelo no válido.');
        }
    });

    showChartButton.addEventListener('click', () => {
        const selectedModel = modelSelect.value;
        const errors = validateInputs(selectedModel);

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        switch (selectedModel) {
            case 'linear-regression':
                graphLinearRegression();
                break;

            case 'polynomial-regression':
                graphPolynomialRegression();
                break;

            case 'decision-tree':
                graphDecisionTree();
                break;

            case 'naive-bayes':
                graphNaiveBayes();
                break;

            case 'neural-network':
                graphNeuralNetwork();
                break;

            case 'kmeans':
                graphKMeans();
                break;

            case 'knn':
                graphKNN();
                break;

            default:
                alert('Modelo no válido.');
        }
    });

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

    
    function predictLinearRegression() {
        // Lógica para predecir el modelo de regresión lineal
        console.log('Prediciendo regresión lineal...');
    }

    function predictPolynomialRegression() {
        // Lógica para predecir el modelo de regresión polinómica
        console.log('Prediciendo regresión polinómica...');
    }

    function predictDecisionTree() {
        // Lógica para predecir el modelo de árbol de decisión
        console.log('Prediciendo árbol de decisión...');
    }

    function predictNaiveBayes() {
        // Lógica para predecir el modelo Naive Bayes
        console.log('Prediciedo Naive Bayes...');
    }

    function predictNeuralNetwork() {
        // Lógica para predecir la red neuronal
        console.log('Prediciendo red neuronal...');
    }

    function predictKMeans() {
        // Lógica para predecir el modelo K-means
        console.log('Prediciendo K-means...');
    }

    function predictKNN() {
        // Lógica para predecir el modelo KNN
        console.log('Prediciendo KNN...');
    }

    function graphLinearRegression() {
        // Lógica para graficar el modelo de regresión lineal
        console.log('Graficando regresión lineal...');
    }

    function graphPolynomialRegression() {
        // Lógica para graficar el modelo de regresión polinómica
        console.log('Graficando regresión polinómica...');
    }

    function graphDecisionTree() {
        // Lógica para graficar el modelo de árbol de decisión
        console.log('Graficando árbol de decisión...');
    }

    function graphNaiveBayes() {
        // Lógica para graficar el modelo Naive Bayes
        console.log('Graficando Naive Bayes...');
    }

    function graphNeuralNetwork() {
        // Lógica para graficar la red neuronal
        console.log('Graficando red neuronal...');
    }

    function graphKMeans() {
        // Lógica para graficar el modelo K-means
        console.log('Graficando K-means...');
    }

    function graphKNN() {
        // Lógica para graficar el modelo KNN
        console.log('Graficando KNN...');
    }


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
                const decisionHeaders = document.getElementById('headers').value.split(',');
                const training = document.getElementById('training').value.split(';').map(row => row.split(','));
                const predict = document.getElementById('predict').value.split(',');
                 if (training.some(row => row.length !== decisionHeaders.length)) {
                    errors.push('Todas las filas de entrenamiento deben tener la misma longitud que el número de encabezados.');
                }
                if (predict.length === 0) {
                    errors.push('El campo Predict no puede estar vacío.');
                }
                break;

            case 'naive-bayes':
                const naiveValues = document.getElementById('values').value.split(',');
                const naivePercentages = [
                    document.getElementById('porcentajeA').value,
                    document.getElementById('porcentajeB').value,
                    document.getElementById('porcentajeC').value
                ].map(Number);
                if (naiveValues.length === 0) {
                    errors.push('El campo Valores no puede estar vacío.');
                }
                if (naivePercentages.some(p => isNaN(p))) {
                    errors.push('Todos los porcentajes deben ser números.');
                }
                break;

            case 'neural-network':
                const num1 = Number(document.getElementById('num1').value);
                const num2 = Number(document.getElementById('num2').value);
                if (isNaN(num1) || isNaN(num2)) {
                    errors.push('Ambos valores deben ser números.');
                }
                break;

            case 'kmeans':
                const clusters = Number(document.getElementById('clusters').value);
                const kmeansTraining = document.getElementById('training').value.split(';').map(row => row.split(','));
                if (isNaN(clusters) || clusters <= 0) {
                    errors.push('El número de clusters debe ser un número positivo.');
                }
                if (kmeansTraining.some(row => row.length < 2)) {
                    errors.push('Cada fila de entrenamiento debe tener al menos dos valores.');
                }
                break;

            case 'knn':
                const knnTraining = document.getElementById('training').value.split(';').map(row => row.split(','));
                const knnPoint = document.getElementById('point').value.split(',').map(Number);
                if (knnTraining.length === 0) {
                    errors.push('El campo Entrenamiento no puede estar vacío.');
                }
                if (knnPoint.length === 0) {
                    errors.push('El campo Punto no puede estar vacío.');
                }
                break;

            default:
                errors.push('Modelo no válido.');
                break;
        }
        return errors;
    }
    

});