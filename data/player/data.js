

var EVALUDATA = {
	"ShowAnimations": true,
	"AssetsPath": "data/assets/",
	"PHPPath": "data/player/evalu.php",	
	"ShowSimHotspots": true,
	"ReadableData": false,
	"Strings": {
		"AppTitle": "Conocer",
		"WebAppTitle": "Conocer",
		"AppCopyright": "CONSEJO NACIONAL DE NORMALIZACIÓN Y CERTIFICACIÓN DE COMPETENCIAS LABORALES, MÉXICO - ALGUNOS DERECHOS RESERVADOS © 2014",
		"AppClose": "¿Esta usted seguro de cerrar la aplicación?",
		"LoginButton": "ENTRAR >",
		"LoginPlaceholder": "Introduzca aquí su clave de usuario (CURP)",
		"LoginEmpty": "Por favor introduzca su clave de usuario (CURP)",
		"LoginFail": "La clave de usuario no es válida",
		"NextQuestion": "CONTINUAR >",
		"EndTest": "TERMINAR >",
		"GoToRemainingQuestions": "IR A PREGUNTAS PENDIENTES >",
		"LoadingResources": "Cargando recursos. Por favor espere...",
		"ConfirmAnswer": "¿Ésta es su respuesta final?",
		"URLMismatch": "La informacíon introducida en los campos no coincide. Por favor verifique la informacion o deje ambos campos en blanco para continuar con la evaluación y resolver este apartado al final.",
		"RemainingQuestions": "Algunas preguntas no fueron respondidas. A continuación se muestra una lista con las preguntas pendientes",
		"RemainingQuestionsInstruction": "De clic en la pregunta pendiente que desea reponder",
		"RemainingQuestionsSkipButton": "OMITIR LAS PREGUNTAS PENDIENTES Y TERMINAR LA EVALUACIÓN >",
		"RemainingQuestionsSkipWarning": "¿Esta usted seguro de omitir las preguntas pendientes y terminar la evaluación?",
		"MessageWindowOK": "ACEPTAR",
		"MessageWindowNo": "NO",
		"TimeEnded": "El tiempo de la evaluación a expirado. Oprima el botón ACEPTAR para guardar sus resultados.",
		"SavingResults": "Guardando los resultados de su evaluación. Por favor espere...",
		"SavingResultsFail": "ADVERTENCIA: No ha sido posible guardar los resultados de su evaluación en la base de datos. ¿Quiere reintentar guardar sus resultados?",
		"FinishedMessage": "Usted ha concluido la evaluación. Por favor póngase en contacto con su evaluador.",
		"Finished": "FINALIZAR >"
	},
	"Test": {
		"ID": "EC0362",
		"Title": "EC0362 Asesoría en cursos de formación en línea.",
		"Duration": 240,
		"Intros": [
			{
				"html": "intro/index.html",
				"button": "CONTINUAR >"
			},
			{
				"html": "intro/index2.html",
				"button": "EMPEZAR EVALUACIÓN >"
			}
		],
		"Questions": [
			{
				"ID": "0",
				"Text": "Escribe en el paréntesis de la columna izquierda la letra que corresponda a la definición de las herramientas de comunicación y colaboración.",
				"Instruction": "Seleccione la letra correcta en la opción que corresponda.",
				"Feedback": "Observaciones",
				"Value": 0.70,
				"Type": "MATCHING",
				"Data":{
					"Left": [
						{
							"Key": "A",
							"Text": "Blog"
						},
						{
							"Key": "B",
							"Text": "Mensajería en línea"
						},
						{
							"Key": "C",
							"Text": "Foro de discusión"
						},
						{
							"Key": "D",
							"Text": "Navegador Web"
						},
						{
							"Key": "E",
							"Text": "Chat  / Sala Virtual"
						},
						{
							"Key": "F",
							"Text": "Wiki"
						},
						{
							"Key": "G",
							"Text": "Correo electrónico"
						}
						
					],
					"Right": [
						{
							"Key": "C",
							"Text": "Es una aplicación WEB que da soporte a discusiones u opiniones de los alumnos en línea."
						},
						{
							"Key": "F",
							"Text": "Es un sitio WEB cuyas páginas pueden ser editadas por el asesor en línea y los alumnos a través del navegador WEB."
						},
						{
							"Key": "A",
							"Text": "Es un sitio WEB periódicamente actualizado que recopila cronológicamente las opiniones y actividades del asesor en línea y los alumnos."
						},
						{
							"Key": "E",
							"Text": "Comunicación escrita realizada de manera instantánea mediante el uso de un software y a través de internet en los que interactúan el asesor en línea y los alumnos."
						},
						{
							"Key": "G",
							"Text": "Es un servicio de red que permite al asesor en línea y a los alumnos a enviar y recibir mensajes y archivos."
						},
						{
							"Key": "B",
							"Text": "Es un servicio de la plataforma educativa que permite al asesor en línea y a los alumnos a enviar y recibir mensajes y archivos."
						},
						{
							"Key": "D",
							"Text": "Es una aplicación que opera a través de internet, interpretando la información de archivos y sitios WEB, para que estos puedan ser visualizados o leídos."
						}
					]
				}
			},
			{
				"ID": "1",
				"Text": "Conjunto de características pedagógicas y cognitivas que suelen expresarse conjuntamente cuando un alumno debe enfrentar una situación de aprendizaje; es decir, las distintas maneras en que puede aprender.",
				"Instruction": "Seleccione la respuesta correcta.",
				"Feedback": "Observaciones",
				"Value": 1.0,
				"Type": "MULTICHOICE",
				"Data":{
					"MultiSelect": false,
					"Answers": [
						{
							"Text": "a) Estrategias de aprendizaje",
							"Correct": false
						},
						{
							"Text": "b) Estilos de aprendizaje",
							"Correct": true
						},
						{
							"Text": "c) Formas de aprendizaje",
							"Correct": false
						},
						{
							"Text": "d) Estrategias de enseñanza",
							"Correct": false
						}
					]
				}
			},
			{
				"ID": "2",
				"Text": "Estilo de aprendizaje que permite relacionar con más efectividad la información escrita, notas, diagramas y dibujos.",
				"Instruction": "Seleccione la respuesta correcta.",
				"Feedback": "Observaciones",
				"Value": 1.0,
				"Type": "MULTICHOICE",
				"Data":{
					"MultiSelect": false,
					"Answers": [
						{
							"Text": "a) Visual",
							"Correct": true
						},
						{
							"Text": "b) Reflexivo",
							"Correct": false
						},
						{
							"Text": "c) Auditivo",
							"Correct": false
						},
						{
							"Text": "d) Estrategias de enseñanza",
							"Correct": false
						}
					]
				}
			},
			{
				"ID": "3",
				"Text": "Estilo de aprendizaje que permite relacionar con más facilidad la palabra hablada, se tiende a escuchar y luego tomar apuntes o revisar el material escuchado.",
				"Instruction": "Seleccione la respuesta correcta.",
				"Feedback": "Observaciones",
				"Value": 1.0,
				"Type": "MULTICHOICE",
				"Data":{
					"MultiSelect": false,
					"Answers": [
						{
							"Text": "a) Visual",
							"Correct": false
						},
						{
							"Text": "b) Pragmático",
							"Correct": false
						},
						{
							"Text": "c) Auditivo",
							"Correct": true
						},
						{
							"Text": "d) Kinestésico",
							"Correct": false
						}
					]
				}
			},
			{
				"ID": "4",
				"Text": "En este sitio de aprendizaje se aprende efectivamente a través de tocar, del movimiento y del espacio, se prefiere imitar y practicar.",
				"Instruction": "Seleccione la respuesta correcta.",
				"Feedback": "Observaciones",
				"Value": 1.0,
				"Type": "MULTICHOICE",
				"Data":{
					"MultiSelect": false,
					"Answers": [
						{
							"Text": "a) Visual",
							"Correct": false
						},
						{
							"Text": "b) Pragmático",
							"Correct": false
						},
						{
							"Text": "c) Auditivo",
							"Correct": false
						},
						{
							"Text": "d) Kinestésico",
							"Correct": true
						}
					]
				}
			},
			{
				"ID": "5",
				"Text": "Se implica plenamente y sin prejuicios en nuevas experiencias. Son de mente abierta, nada escépticos y acometen con entusiasmo las tareas nuevas.",
				"Instruction": "Seleccione la respuesta correcta.",
				"Feedback": "Observaciones",
				"Value": 1.0,
				"Type": "MULTICHOICE",
				"Data":{
					"MultiSelect": false,
					"Answers": [
						{
							"Text": "a) Activo",
							"Correct": true
						},
						{
							"Text": "b) Auditivo",
							"Correct": false
						},
						{
							"Text": "c) Teórico",
							"Correct": false
						},
						{
							"Text": "d) Kinestésico",
							"Correct": false
						}
					]
				}
			},
			{
				"ID": "6",
				"Text": "Les gusta considerar las experiencias y observarlas desde diferentes perspectivas. Reúnen datos analizándolos con detenimiento antes de llegar a alguna conclusión.",
				"Instruction": "Seleccione la respuesta correcta.",
				"Feedback": "Observaciones",
				"Value": 1.0,
				"Type": "MULTICHOICE",
				"Data":{
					"MultiSelect": false,
					"Answers": [
						{
							"Text": "a) Activo",
							"Correct": false
						},
						{
							"Text": "b) Auditivo",
							"Correct": false
						},
						{
							"Text": "c) Teórico",
							"Correct": false
						},
						{
							"Text": "d) Reflexivo",
							"Correct": true
						}
					]
				}
			},
			{
				"ID": "7",
				"Text": "Adaptan e integran las observaciones dentro de teorías lógicas y complejas se enfocan los problemas de forma vertical, escalonada, por etapas lógicas.",
				"Instruction": "Seleccione la respuesta correcta.",
				"Feedback": "Observaciones",
				"Value": 1.0,
				"Type": "MULTICHOICE",
				"Data":{
					"MultiSelect": false,
					"Answers": [
						{
							"Text": "a) Visual",
							"Correct": false
						},
						{
							"Text": "b) Pragmático",
							"Correct": false
						},
						{
							"Text": "c) Auditivo",
							"Correct": false
						},
						{
							"Text": "d) Teórico",
							"Correct": true
						}
					]
				}
			},
			{
				"ID": "8",
				"Text": "Su punto fuerte es la aplicación práctica de las ideas. Descubren el aspecto positivo de las nuevas ideas y aprovechan la primera oportunidad para experimentarlas.",
				"Instruction": "Seleccione la respuesta correcta.",
				"Feedback": "Observaciones",
				"Value": 1.0,
				"Type": "MULTICHOICE",
				"Data":{
					"MultiSelect": false,
					"Answers": [
						{
							"Text": "a) Visual",
							"Correct": false
						},
						{
							"Text": "b) Pragmático",
							"Correct": true						},
						{
							"Text": "c) Auditivo",
							"Correct": false
						},
						{
							"Text": "d) Teórico",
							"Correct": false
						}
					]
				}
			},
			{
				"ID": "9",
				"Text": "Escribe en el paréntesis la letra de la estrategia de enseñanza – aprendizaje que corresponda con la definición de la izquierda.",
				"Instruction": "Seleccione la letra correcta en la opción que corresponda.",
				"Feedback": "Observaciones",
				"Value": 1.0,
				"Type": "MATCHING",
				"Data":{
					"Left": [
						{
							"Key": "A",
							"Text": "Aprendizaje orientado a proyectos"
						},
						{
							"Key": "B",
							"Text": "Aprendizaje basado en casos"
						},
						{
							"Key": "C",
							"Text": "Aprendizaje basado en problemas"
						},
						{
							"Key": "D",
							"Text": "Estrategias de enseñanza - aprendizaje"
						},
						{
							"Key": "E",
							"Text": "Aprendizaje colaborativo"
						
						}
						
					],
					"Right": [
						{
							"Key": "B",
							"Text": "Es una estrategia constituida por un conjunto de experiencias o situaciones -  problemas de la vida real presentadas en forma narrativa, su finalidad es reflexionar sobre el curso de acción elegido y proponer acciones alternativas antes tales situaciones."
						},
						{
							"Key": "D",
							"Text": "Son procedimientos que un estudiante emplea en forma consiente, controlada e intencional como instrumentos flexibles para aprender significativamente y solucionar problemas."
						},
						{
							"Key": "E",
							"Text": "Los alumnos forman “pequeños equipos” después de haber recibido instrucciones del asesor. Dentro de cada equipo los estudiantes intercambian información y trabajan en una tarea hasta que todos sus miembros la han entendido y terminado."
						},
						{
							"Key": "A",
							"Text": "Es una estrategia que involucra a los estudiantes en proyectos complejos del mundo real, y se enfoca en los conceptos y principios de una o varias disciplinas para la solución de problemas u otras tareas significativas."
						},
						{
							"Key": "C",
							"Text": "Es una estrategia en la que tanto la adquisición de conocimientos como el desarrollo de habilidades y actitudes resulta importante, en el grupo pequeño de alumnos se reúne, con la facilitación de un Asesor, a analizar y resolver un problema seleccionado o diseñado especialmente para el logro de ciertos objetivos de aprendizaje."
						}
					]
				}
			},
						{
				"ID": "0",
				"Text": "Ingresar a la dirección URL de enlace a la plataforma educativa, con usuario y contraseña de asesor en línea.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "1",
				"Text": "Accediendo a uno de los recursos: vídeo, documento, audio o presentaciones electrónicas.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "2",
				"Text": "Cerrar el navegador",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},	
			{
				"ID": "3",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Utiliza_Navegador_ fecha de envío (Día-Mes- Año).<B><br><p>Ejemplo: Pérez_Utiliza_Navegador_031114<p/></B> Copie la liga creada y péguela dos veces en los apartados siguientes. <br>Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación"
				}
			},
			{
				"ID": "4",
				"Text": "Señalando las herramientas de comunicación y colaboración, como mínimo tres de los siguientes elementos: foros de discusión, chat, correo electrónico, mensajería interna, sala virtual, wiki, blog.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{	
				"ID": "5",
				"Text": "Señalando las herramientas de gestión de contenidos: materiales, actividades, tareas, calendario.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "6",
				"Text": "Señalando las herramientas de seguimiento de evaluación: plantilla de calificaciones, informe de actividad del alumno, perfiles del asesor y del participante.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "7",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato:  <br><br>Apellido paterno_Señalando_Herramientas_ fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Señalando_Herramientas_031114<p/></br> Copie la liga creada y péguela dos veces en los apartados siguientes. <br>Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "8",
				"Text": "Accediendo a las herramientas de comunicación y colaboración, enviando mensajes desde al menos tres de los siguientes elementos: foros de discusión, chat, correo electrónico, mensajería interna, sala virtual, wiki, blog.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "9",
				"Text": "Accediendo a las herramientas de gestión de contenidos: materiales, actividades, tareas, calendario.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "10",
				"Text": "Accediendo a las herramientas de seguimiento y evaluación: plantilla de calificaciones, informe de actividad del alumno, perfiles del asesor y del participante.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "11",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Accediendo_Herramientas_ fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Accediendo_Herramientas_031114</B><p/> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "12",
				"Text": "Abriendo un archivo de procesador de textos, editando el documento y guardando el archivo.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "13",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Ofimática_Procesador textos_ fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Ofimática_Procesador textos_031114</B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "14",
				"Text": "Abriendo un archivo de procesador de hoja de cálculo, editando el documento y guardando el archivo.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "15",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Ofimática_Hoja cálculo_ fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Ofimática_Hoja cálculo_031114 </p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "16",
				"Text": "Abriendo un archivo de presentación, editando el documento y guardando el archivo.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "17",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Ofimática_Presentación_ fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Ofimática_Presentación_031114</p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "18",
				"Text": "Abriendo un archivo de documentos con formato portátil PDF y guardando el archivo.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "19",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Ofimática_Documentos PDF_ fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Ofimática_Documentos PDF_031114 </p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "20",
				"Text": "Enviando un mensaje al inicio de cada actividad con las instrucciones y tiempo de entrega, a través de una de las herramientas de colaboración o comunicación de la plataforma educativa.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "21",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Enviando_Mensajes e instrucciones_ fecha de envío (Día-Mes- Año).<br><B><p>Ejemplo: Pérez_Enviando_Mensajes e instrucciones_031114</p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "22",
				"Text": "Accediendo a las herramientas de colaboración para revisar la participación grupal o individual en cuanto a las realización de las actividades indicadas en la plataforma educativa.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "23",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Revisión_Grupales o individuales_fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Revisión_Grupales o individuales_031114</p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "24",
				"Text": "Enviando un mensaje de motivación a los participantes acerca del desarrollo de sus actividades mediante al menos una herramienta de colaboración o comunicación de la plataforma educativa.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "25",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Mensajes_Motivación_fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Mensajes_Motivación_031114 </p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "26",
				"Text": "Enviando un mensaje de retroalimentación al participante acerca del desarrollo de sus actividades mediante al menos una herramienta de colaboración o comunicación de la plataforma educativa.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "27",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Mensajes_Retroalimentación_fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Mensajes_Motivación_031114</p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "28",
				"Text": "Respondiendo mediante mensajes las dudas sobre los contenidos del curso en línea a través de al menos una herramienta de comunicación.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "29",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Mensajes_Responder dudas_fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Mensajes_Responder dudas_031114</p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación"
				}
			},
			{
				"ID": "30",
				"Text": "Sugiriendo material complementario que fortaleza el contenido del curso en línea, a través de mensajes de al menos una herramienta de comunicación.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "31",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Sugerir_Materiales_fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Sugerir_Materiales dudas_031114</p></B> Copie la liga creada y péguela dos veces en los apartados siguientes.Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "32",
				"Text": "Ingresando al registro de acceso de los participantes para comprobar su actividad en la plataforma educativa.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "33",
				"Text": "Enviando un mensaje de invitación para ingresar a la plataforma educativa a los participantes que no lo han hecho.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "34",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Actividades_Mensajes invitación_fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Actividaes_Mensaje invitación_031114 </p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "35",
				"Text": "Accediendo al registro de participación de una actividad de los participantes en la plataforma educativa",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "36",
				"Text": "Enviando un mensaje de recordatorio para la realización de las actividades dentro del periodo establecido en el calendario.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "37",
				"Text": "La manera en que apoya y ayuda a los alumnos en la ejecución de una actividad y/o tarea.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "38",
				"Text": "La manera en que ofrece alternativas de solución de cuestionamientos durante el desarrollo del curso.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "39",
				"Text": "La manera en que evalúa los trabajos de acuerdo a los instrumentos establecidos en el curso.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "40",
				"Text": "La manera en que se dispone para comprender y atender las diferencias entre y con los participantes.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "41",
				"Text": "La manera en que dirige los mensajes a los participantes empleando en su redacción un lenguaje cortes y respetuoso.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "42",
				"Text": "La manera en que realiza el seguimiento de las actividades de los participantes para lograr los objetivos del curso.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "43",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Accediendo_Mensajes recordatorio_fecha de envío (Día-Mes- Año).<br><B><p> Ejemplo: Pérez_Accediendo_Mensaje recordatorio_031114</p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "44",
				"Text": "Calificando las actividades de aprendizaje con base en los instrumentos de evaluación.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "45",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Calificando_Actividades_fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Calificando_Actividades_031114 </p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "46",
				"Text": "Accediendo a la tabla de calificaciones del curso en línea.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "47",
				"Text": "Descargando la tabla de calificaciones en formato de hoja de cálculo.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "48",
				"Text": "La manera en que ofrece alternativas de solución de cuestionamientos durante el desarrollo del curso.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "49",
				"Text": "La manera en que realiza el trabajo de acuerdo a los lineamientos establecidos en el curso.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "50",
				"Text": "Suba el video a su cuenta de la herramienta en línea como Youtube o cualquiera de su preferencia. Para identificarlo, recuerde que la liga tiene el siguiente formato: <br><br>Apellido paterno_Accediendo_Tabla calificaciones_fecha de envío (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Accediendo_Tabla calificaciones_031114</p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "51",
				"Text": "Incluye nombre del curso.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "52",
				"Text": "Incluye nombre del asesor.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "53",
				"Text": "Refiere fecha de realización del formato.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "54",
				"Text": "Contiene número consecutivo de cada participante.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "55",
				"Text": "Incluye desglose de cada una de las actividades realizadas por los participantes.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "56",
				"Text": "Refiere calificación obtenida por cada actividad y cada participantes.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "57",
				"Text": "Incluye promedio final obtenido por cada participante.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "58",
				"Text": "Incluye firma del asesor.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "59",
				"Text": "Está generada en formato impreso, digital o ambos.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "60",
				"Text": "Ud. abrió cuenta a Dropbox (o cualquier otra herramienta de su preferencia) donde subió el archivo “EC0362 Plantilla de Calificacionesdoc.x”. En la herramienta se generó una liga al documento. Para identificarla, recuerde que la liga tiene el siguiente formato:<br><br>Apellido_paterno_Plantilla_Calificaciones _ fecha de subido a la nueve (Día-Mes- Año).<br><B><p> Ejemplo: Pérez_Plantilla_Calificaciones_031114</p></B> Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			},
			{
				"ID": "61",
				"Text": "Incluye el nombre del curso.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "62",
				"Text": "Incluye el nombre del asesor.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "63",
				"Text": "Refiere fecha de realización del informe.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "64",
				"Text": "Describe resumen del desarrollo del curso.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "65",
				"Text": "Incluye platillas de calificaciones como anexo.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "66",
				"Text": "Describe propuesta de mejora del curso.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "67",
				"Text": "Incluye firma del asesor.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador. ",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "68",
				"Text": "Esta generada en formato impreso, digital o ambos.",
				"Instruction": "",
				"Feedback": "Este reactivo es calificado manualmente por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": true,
				"Type": "URL",
				"Data":{
					"Text": "",
					"Verify": ""
				}
			},
			{
				"ID": "69",
				"Text": "Ud. abrió cuenta a Dropbox (o cualquier otra herramienta de su preferencia) donde subió el archivo “EC0362 Informe final evaluación del curso.docx”. En la herramienta se generó una liga al documento. Para identificarla, recuerde que la liga tiene el siguiente formato: <br><br>Apellido_paterno_Informe_Final_ fecha de subido a la nueve (Día-Mes- Año). <br><B><p>Ejemplo: Pérez_Informe_Final_031114</p></B>  Copie la liga creada y péguela dos veces en los apartados siguientes. Una vez que lo haya pegado, haga clic en el botón Continuar> para avanzar en su evaluación.",
				"Instruction": "Intruduzca el vinculo absoluto a su video en YouTube en ambos campos.",
				"Feedback": "Este reactivo tiene que ser calificado por el evaluador.",
				"Value": 1.0,
				"Valued": true,
				"Hidden": false,
				"Type": "URL",
				"Data":{
					"Text": "Escriba aquí el vínculo a su video en YouTube.",
					"Verify": "Escriba nuevamente aquí el vínculo a su video en YouTube como verificación."
				}
			}
		]
	}
}




