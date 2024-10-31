document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const modelSelect = document.getElementById('model-select');
    const parametersContainer = document.getElementById('parameters');
    const trainButton = document.getElementById('train-button');
    const predictButton = document.getElementById('predict-button');
    const showChartButton = document.getElementById('show-chart-button');

    // Cambia el contenido de parámetros según el modelo seleccionado
    modelSelect.addEventListener('change', () => {
        const selectedModel = modelSelect.value;
        showModelParameters(selectedModel);
    });

    // Función para mostrar los parámetros específicos del modelo
    function showModelParameters(model) {
        parametersContainer.innerHTML = ''; // Limpiar contenido

        switch(model) {
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
                    <label>Parámetros:</label>
                    <input type="text" id="parameters" placeholder="Lista de nombres de parámetros">
                    <label>Entrenamiento:</label>
                    <input type="text" id="training" placeholder="Matriz de entrenamiento">
                    <label>Predict:</label>
                    <input type="text" id="predict" placeholder="Lista de valores para predecir">
                `;
                break;

            case 'naive-bayes':
                parametersContainer.innerHTML = `
                    <label>Valores:</label>
                    <input type="text" id="values" placeholder="Matriz de valores porcentuales">
                    <label>Valores Deseados:</label>
                    <input type="text" id="desired-values" placeholder="Lista de valores porcentuales">
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

    // Eventos para botones
    trainButton.addEventListener('click', () => {
        console.log("Entrenando modelo seleccionado");
    });

    predictButton.addEventListener('click', () => {
        console.log("Realizando predicciones");
    });

    showChartButton.addEventListener('click', () => {
        console.log("Mostrando gráfica");
    });
});
