export type PollActions = 
    //Agregar contenido a la encuesta
    { type: 'pollcontent', content: string} | 
    //Agregar contenido a la pregunta. Recibe un payload compuesto por el indice de la
    //pregunta y el contenido de la pregunta
    { type: 'questioncontent', payload: {index: number, content: string} } |
    //Agregar contenido a la respuesta. Recibe un payload compuesto por el indice de la
    //pregunta asociada, el indice de la respuesta y el contenido de la respuesta
    { type: 'answercontent', payload: {index: number, answerIndex: number, content: string} } |
    //Cambiar el tipo de la pregunta. Recibe un payload compuesto por el indice de la
    //pregunta y el nuevo tipo de la pregunta
    { type: 'changequestiontype', payload: {index: number, value: string} } |
    //Agregar nueva pregunta. Recibe el indice de la pregunta.
    { type: 'newquestion', index: number } | 
    //Agregar nueva respuesta. Recibe el indice de la pregunta asociada
    { type: 'newanswer', index: number} |
    //Eliminar pregunta. Recibe el question ID.
    { type: 'removequestion', questionId: string } |
    //Eliminar pregunta. Recibe un payload compuesto por el indice de la preguna asociada
    //y el answer ID.
    { type: 'removeanswer', payload: {index: number, answerId: string} } |
    //Cambiar el orden de la pregunta. Recibe un payload compuesto por el viejo nro de 
    //orden y el nuevo numero de orden.
    { type: 'orderquestions', payload: { source: number, destination: number} } |
    { type: 'seterrors', errors: {} } |
    { type: 'resetFormPoll' };