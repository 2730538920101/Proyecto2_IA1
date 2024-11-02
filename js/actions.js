// Crear instancia del modelo de regresión lineal
let linearModel;
let xTrain;
let yTrain;
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
            break;
        case 'decision-tree':
            console.log('Entrenando árbol de decisión.');
            break;
        case 'naive-bayes':
            console.log('Entrenando modelo de Naive Bayes.');
            break;
        case 'neural-network':
            console.log('Entrenando red neuronal.');
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
            console.log('Realizando predicción con regresión polinómica.');
            break;
        case 'decision-tree':
            console.log('Realizando predicción con árbol de decisión.');
            break;
        case 'naive-bayes':
            console.log('Realizando predicción con modelo de Naive Bayes.');
            break;
        case 'neural-network':
            console.log('Realizando predicción con red neuronal.');
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
            console.log('Graficando modelo de regresión lineal.');
            const labels = xTrain.map((_, index) => index + 1);
            const predictedValues = linearModel.predict(xTrain);
            
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
            console.log('Mostrando gráfico de regresión polinómica.');
            break;
        case 'decision-tree':
            console.log('Mostrando gráfico de árbol de decisión.');
            break;
        case 'naive-bayes':
            console.log('Mostrando gráfico de Naive Bayes.');
            break;
        case 'neural-network':
            console.log('Mostrando gráfico de red neuronal.');
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
            console.log('No existe una funcion de tendencia de regresión lineal.');
            break;
        case 'polynomial-regression':
            console.log('Mostrando tendencia de regresión polinómica.');
            break;
        case 'decision-tree':
            console.log('Mostrando tendencia de árbol de decisión.');
            break;
        case 'naive-bayes':
            console.log('Mostrando tendencia de Naive Bayes.');
            break;
        case 'neural-network':
            console.log('Mostrando tendencia de red neuronal.');
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
