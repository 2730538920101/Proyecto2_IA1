// Crear instancia del modelo de regresión lineal
let linearModel;
let xTrain;
let yTrain;
// Crear instancia del modelo de regresión polinómica
let polynomialModel;
let polyDegree = 2; // Ejemplo: grado del polinomio, ajustable
let polyXTrain, polyYTrain;

// Crear instancia del modelo de árbol de decisión
let decisionTreeModel;

// Crear instancia del modelo de red neuronal
let neuralNetwork;
let neuralLayers = [2, 4, 3, 2]; // Ejemplo de capas (input, hidden, output)




// Funciones para cada acción de cada modelo
export function train(data, modelType) {
    console.log('Ejecutando entrenamiento del modelo:', modelType);
    console.log('Datos cargados:', data);
    // Aquí puedes agregar lógica específica para cada modelo
    switch (modelType) {
        case 'linear-regression':
            console.log('Entrenando modelo de regresión lineal.');
            xTrain = data.map(item => parseFloat(item.XTrain));
            yTrain = data.map(item => parseFloat(item.YTrain));
            linearModel = new LinearRegression();
            linearModel.fit(xTrain, yTrain); // Ajustar el modelo
            
            // Mostrar los resultados de entrenamiento
            const trainingResults = `Modelo entrenado con m: ${linearModel.m.toFixed(2)}, b: ${linearModel.b.toFixed(2)}`;
            console.log(trainingResults);
            document.getElementById('results').innerHTML += `<p>${trainingResults}</p>`;
            break;
        case 'polynomial-regression':
            console.log('Entrenando modelo de regresión polinómica.');
            polyXTrain = data.map(item => parseFloat(item.XTrain));
            polyYTrain = data.map(item => parseFloat(item.YTrain));
            polynomialModel = new PolynomialRegression();
            polynomialModel.fit(polyXTrain, polyYTrain, polyDegree); // Ajustar el modelo

            // Mostrar los resultados de entrenamiento
            const polyTrainingResults = `Modelo polinómico entrenado con R²: ${polynomialModel.getError().toFixed(2)}`;
            console.log(polyTrainingResults);
            document.getElementById('results').innerHTML += `<p>${polyTrainingResults}</p>`;
            break;
        case 'decision-tree':
            console.log('Entrenando modelo de árbol de decisión.');
            // Asegúrate de que los datos tengan la estructura correcta
            const formattedData = data.map(item => Object.values(item)); // Convertir a matriz si es necesario
            decisionTreeModel = new DecisionTreeID3(formattedData);
            decisionTreeModel.train(formattedData); // Entrenar el modelo
            console.log('Modelo de árbol de decisión entrenado.');
            document.getElementById('results').innerHTML += `<p>Modelo de árbol de decisión entrenado.</p>`;
            break;
        case 'naive-bayes':
            console.log('Entrenando modelo de Naive Bayes.');
            break;
        case 'neural-network':
            console.log('Entrenando red neuronal.');
            neuralNetwork = new NeuralNetwork(neuralLayers);
            for (let i = 0; i < 10000; i++) {
                // Generar datos aleatorios para entrenar
                let numero1 = Math.random();
                let numero2 = Math.random();
                // Entrenar con los datos de ejemplo (ajusta según tus necesidades)
                neuralNetwork.Entrenar([numero1, numero2], (numero1 > numero2 ? [1, 0] : [0, 1]));
            }
            console.log('Red neuronal entrenada.');
            document.getElementById('results').innerHTML += `<p>Red neuronal entrenada.</p>`;
            break;
        case 'kmeans':
            console.log('Entrenando modelo de k-means.');
            break;
        case 'knn':
            console.log('Entrenando modelo de k-vecinos más cercanos.');
            break;
        default:
            console.log('Modelo no reconocido.');
    }
}

export function predict(data, modelType) {
    
    console.log('Ejecutando predicción del modelo:', modelType);
    console.log('Datos cargados:', data);
    switch (modelType) {
        case 'linear-regression':
            if (!linearModel) {
                console.log('El modelo no ha sido entrenado aún.');
                return;
            }
            console.log('Realizando predicción con regresión lineal.');
            console.log('Valores calculados - m:', linearModel.m, 'b:', linearModel.b);
            
            const predictions = xTrain.map(x => linearModel.predict([x])[0]); // Usar xTest para predecir
            console.log('Predicciones:', predictions);
            
            // Mostrar resultados de la predicción
            const predictionResults = `Predicciones: ${predictions.join(', ')}`;
            document.getElementById('results').innerHTML += `<p>${predictionResults}</p>`;
            break;
        case 'polynomial-regression':
            if (!polynomialModel) {
                console.log('El modelo no ha sido entrenado aún.');
                return;
            }
            console.log('Realizando predicción con regresión polinómica.');

            const polyPredictions = polyXTrain.map(x => polynomialModel.predict([x])[0]);
            console.log('Predicciones:', polyPredictions);

            // Mostrar resultados de la predicción
            const polyPredictionResults = `Predicciones polinómicas: ${polyPredictions.join(', ')}`;
            document.getElementById('results').innerHTML += `<p>${polyPredictionResults}</p>`;
            break;
        case 'decision-tree':
            if (!decisionTreeModel) {
                console.log('El modelo no ha sido entrenado aún.');
                return;
            }
            console.log('Realizando predicción con árbol de decisión.');
            const treePredictions = data.map(item => decisionTreeModel.predict(item, decisionTreeModel.root));
            console.log('Predicciones del árbol de decisión:', treePredictions);
            // Mostrar resultados de la predicción
            const treePredictionResults = `Predicciones del árbol de decisión: ${treePredictions.join(', ')}`;
            document.getElementById('results').innerHTML += `<p>${treePredictionResults}</p>`;
            break;
        case 'naive-bayes':
            console.log('Realizando predicción con modelo de Naive Bayes.');
            break;
        case 'neural-network':
            if (!neuralNetwork) {
                console.log('La red neuronal no ha sido entrenada aún.');
                return;
            }
            console.log('Realizando predicción con red neuronal.');
            const neuralPredictions = data.map(item => {
                const input = [parseFloat(item.Num1), parseFloat(item.Num2)]; // Usar los valores del CSV
                return neuralNetwork.Predecir(input);
            });
            console.log('Predicciones de la red neuronal:', neuralPredictions);
            // Mostrar resultados de la predicción
            const neuralPredictionResults = `Predicciones: ${neuralPredictions.map(p => p.join(', ')).join(' | ')}`;
            document.getElementById('results').innerHTML += `<p>${neuralPredictionResults}</p>`;
            break;
        case 'kmeans':
            console.log('Realizando predicción con modelo de k-means.');
            break;
        case 'knn':
            console.log('Realizando predicción con k-vecinos más cercanos.');
            break;
        default:
            console.log('Modelo no reconocido.');
    }
}

export function graph(data, modelType) {
    console.log('Mostrando gráfico del modelo:', modelType);
    console.log('Datos cargados:', data);
    // Limpiar el canvas previo
    const ctx = document.getElementById('chart').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    switch (modelType) {
        case 'linear-regression':
            if (!linearModel || !xTrain || !yTrain) {
                console.log('El modelo de regresión lineal no ha sido entrenado o los datos son insuficientes.');
                return;
            }

            console.log('Graficando modelo de regresión lineal.');
            const labels = xTrain.map((_, index) => index + 1);
            const predictedValues = linearModel.predict(xTrain);

            console.log('Datos reales:', yTrain);
            console.log('Predicciones:', predictedValues);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Datos Reales',
                            data: yTrain,
                            borderColor: 'blue',
                            fill: false
                        },
                        {
                            label: 'Predicciones',
                            data: predictedValues,
                            borderColor: 'red',
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            break;
        case 'polynomial-regression':
            console.log('Graficando modelo de regresión polinómica.');
            const labels2 = polyXTrain.map((_, index) => index + 1);
            const polyPredictedValues = polynomialModel.predict(polyXTrain);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels2,
                    datasets: [
                        {
                            label: 'Datos Reales',
                            data: polyYTrain,
                            borderColor: 'blue',
                            fill: false
                        },
                        {
                            label: 'Predicciones',
                            data: polyPredictedValues,
                            borderColor: 'red',
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            break;
        case 'decision-tree':
            console.log('Mostrando gráfico de árbol de decisión.');
            break;
        case 'naive-bayes':
            alert('No existe un gráfico de Naive Bayes.');
            break;
        case 'neural-network':
            alert('No existe un gráfico de red neuronal.');
            break;
        case 'kmeans':
            console.log('Mostrando gráfico de k-means.');
            break;
        case 'knn':
            console.log('Mostrando gráfico de k-vecinos más cercanos.');
            break;
        default:
            console.log('Modelo no reconocido.');
    }
}

export function tendence(data, modelType) {
    console.log('Mostrando tendencia del modelo:', modelType);
    console.log('Datos cargados:', data);
    switch (modelType) {
        case 'linear-regression':
            alert('No existe una funcion de tendencia de regresión lineal.');
            break;
        case 'polynomial-regression':
            alert('No existe una funcion de tendencia de regresión polinómica.');
            break;
        case 'decision-tree':
            console.log('Mostrando tendencia de árbol de decisión.');
            break;
        case 'naive-bayes':
            console.log('Mostrando tendencia de Naive Bayes.');
            break;
        case 'neural-network':
            alert('No existe una funcion de tendencia de red neuronal.');
            break;
        case 'kmeans':
            console.log('Mostrando tendencia de k-means.');
            break;
        case 'knn':
            console.log('Mostrando tendencia de k-vecinos más cercanos.');
            break;
        default:
            console.log('Modelo no reconocido.');
    }
}
