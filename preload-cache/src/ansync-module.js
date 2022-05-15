function getComponent(){
  return import('lodash').then( ({ default: _ }) => {
    const element = document.createElement('div');
    element.innerHTML = _.join(['async', 'webpack' , 'module'], ' ')
    return element;
  }).catch(err => {
    console.error(err)
  })
}

getComponent().then(component => {
  console.log('async module');
  document.body.appendChild(component)
})