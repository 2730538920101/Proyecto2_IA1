# Proyecto de Modelos de Machine Learning con Tytus.js

## Objetivos
Este proyecto tiene como objetivo implementar y comparar diferentes modelos de machine learning utilizando la biblioteca Tytus.js. Se incluyen modelos de regresión lineal, regresión polinómica, árbol de decisión, red neuronal, k-vecinos más cercanos (KNN) y k-means. El enfoque se centra en el manejo de datos, el entrenamiento de modelos y la visualización de resultados.

## Alcance
El proyecto abarca las siguientes áreas:
- Implementación de diversos modelos de machine learning.
- Entrenamiento y predicción de resultados a partir de datos CSV.
- Visualización de resultados y tendencias a través de gráficos.
- Uso de múltiples técnicas de evaluación de modelos.

## Herramientas de Desarrollo
- **JavaScript**: Lenguaje de programación utilizado para implementar los modelos.
- **Tytus.js**: Biblioteca para machine learning utilizada en el proyecto.
- **Chart.js**: Biblioteca para la visualización de gráficos.
- **HTML/CSS**: Estructura y estilos de la interfaz de usuario.

## Explicación del Proyecto
El proyecto consiste en un sistema modular que permite entrenar y predecir utilizando diferentes algoritmos de machine learning. A través de un archivo `actions.js`, se gestionan las instancias de los modelos y se controlan las acciones de entrenamiento, predicción y visualización de gráficos.

## Estructura de los csv
# Estructura de los Archivos CSV

Los archivos CSV utilizados en el proyecto deben tener la siguiente estructura para ser procesados adecuadamente por los modelos:

## 1. CSV para Regresión Lineal y Regresión Polinómica
Este archivo debe contener dos columnas: 
- **XTrain**: Los valores independientes (features).
- **YTrain**: Los valores dependientes (target).

**Ejemplo de estructura:**
'''
XTrain;YTrain
0;1
1;4
2;1
3;5
4;3
5;7
6;2
7;7
8;4
9;9
'''
'''
XTrain;YTrain;XToPredict
1.2;2.5;2.1
2.1;3.0;3.5
3.5;4.7;4.8
4.8;6.1;5.5
5.5;7.3;6.3
'''


## 2. CSV para Árbol de Decisión y K-Vecinos Más Cercanos
Este archivo debe incluir múltiples columnas donde cada fila representa un ejemplo de datos. La última columna debe ser la clase o etiqueta del ejemplo:
- **Feature1, Feature2, ..., FeatureN, Class**

**Ejemplo de estructura:**
'''
Encabezados;Entrenamiento;Predict
[Income,WorkTime,Married,Debts,Children,BuyHouse];[[High,Short,No,Yes,No,No],[High,Long,Yes,No,No,Yes],[Low,Long,No,No,No,Yes],[Medium,Short,Yes,No,Several,No],[High,Short,No,No,No,Yes],[High,Long,No,Yes,No,Yes],[Medium,Long,Yes,No,One,Yes],[Low,Long,Yes,Yes,One,No],[Low,Short,No,Yes,One,No],[Medium,Long,Yes,No,Several,Yes],[Low,Short,Yes,Yes,Several,No]];[Medium,Short,No,Yes,No]
'''

'''
Index;X;Y;Z;Group;TargetX;TargetY;TargetZ
A;1;9;2;I;7;5;6
B;9;8;8;III;7;5;6
C;2;8;3;I;7;5;6
D;9;1;8;II;7;5;6
E;2;8;2;I;7;5;6
F;9;8;9;III;7;5;6
G;8;2;9;II;7;5;6
'''


## 3. CSV para K-Means
Este archivo debe tener una estructura similar a la del árbol de decisión, pero se puede usar tanto para datos en 1D como en 2D. Los valores deben ser numéricos para permitir la agrupación:
- **X,Y** (para 2D) o **Value** (para 1D)

**Ejemplo de estructura 2D:**
'''
NumeroClusters;Entrenamiento;NumeroIteraciones
3;[[11,6],[4,2],[15,0],[10,6],[7,8],[9,12],[13,0],[5,1],[0,13],[7,5],[6,1],[3,6],[0,10],[14,10],[6,14],[6,4],[4,9],[5,14],[9,9],[13,8]];3
'''

**Ejemplo de estructura lineal:**
'''
NumeroClusters;Entrenamiento;NumeroIteraciones
3;-99,-92,-89,-87,-83,-82,-78,-76,-70,-62,-57,-55,-50,-42,-35,-33,-32,-30,-27,-17,-12,-10,0,1,2,25,29,33,39,41,53,54,67;3
'''

## 4. CSV para Red Neuronal
Este archivo debe contener las entradas necesarias para la red neuronal, con las siguientes columnas:
- **Num1**: Primer valor de entrada.
- **Num2**: Segundo valor de entrada.

**Ejemplo de estructura:**
'''
Num1;Num2
5;3
'''

### Modelos Implementados
1. **Regresión Lineal**:
   - Implementa un modelo de regresión lineal simple para predecir valores continuos.
   - Entrena el modelo y muestra la pendiente (m) y el intercepto (b).

2. **Regresión Polinómica**:
   - Permite ajustar un modelo de regresión polinómica de grado ajustable.
   - Muestra el error de ajuste (R²).

3. **Árbol de Decisión**:
   - Implementa un árbol de decisión utilizando el algoritmo ID3.
   - Permite entrenar el modelo con datos estructurados.

4. **Red Neuronal**:
   - Implementa una red neuronal simple con múltiples capas.
   - Entrenamiento a través de datos aleatorios con el objetivo de clasificar.

5. **K-Vecinos Más Cercanos (KNN)**:
   - Calcula distancias (Euclidiana y Manhattan) para predicción de clases.
   - Utiliza un conjunto de entrenamiento para evaluar la cercanía.

6. **K-Means**:
   - Agrupa datos en clusters utilizando el algoritmo k-means.
   - Muestra tendencias a través de gráficos para datos en 1D y 2D.

## Conclusiones
El proyecto demuestra la flexibilidad y capacidad de la biblioteca Tytus.js para implementar algoritmos de machine learning en JavaScript. La integración de diferentes modelos permite a los usuarios experimentar con técnicas variadas y visualizar resultados de manera efectiva. Las capacidades de entrenamiento y predicción se complementan con gráficos que facilitan la interpretación de los datos.

## Cómo Ejecutar el Proyecto
1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener instaladas las dependencias necesarias (Tytus.js y Chart.js).
3. Abre el archivo HTML en un navegador para ver la interfaz de usuario.
4. Carga un archivo CSV con los datos requeridos para iniciar el entrenamiento y las predicciones.

