if ('text' in conflictingData && 'dynamicTemplateData' in conflictingData) {
  console.log('text and dynamicTemplateData cannot both have values');
} else if ('html' in conflictingData && 'dynamicTemplate' in conflictingData) {
  console.log('html and dynamicTemplateData cannot both have values');
} else {
  console.log('The email can be sent without issue.');
}
