import SugarMaple from './SugarMaple';

class Example {
  constructor() {
    const maple = new SugarMaple(
      '#sceneTree',
      {
        events:  {
          onImport: (node) => {
            return node;
          },
          onExport: (node) => {
            return node;
          }
        },
        plugins: {
          manage:    true,
          sortable:  true,
          checkable: true
        }
      });

    $('#sceneTree').on('sortable.drop', function (event, data) {
      console.log('ooooo');
    });

    const totoNode = maple.manage.create('Node de Toto', {lol: 'toto', age: 1});
    const tataNode = maple.manage.create('Node de Tata', {lol: 'toto', age: 1});
    const titiNode = maple.manage.create('Node de Titi', {lol: 'toto', age: 1});
    const teteNode = maple.manage.create('Node de Tete', {lol: 'toto', age: 1});
    const tutuNode = maple.manage.create('Node de Tutu', {lol: 'toto', age: 1});

    //maple.manage.setRoot(totoNode);
    maple.manage.attach(teteNode, tutuNode);
    maple.manage.attach(totoNode, teteNode);
    maple.manage.attach(totoNode, titiNode);
    maple.manage.attach(totoNode, tataNode);
    maple.sortable.notDroppable(teteNode);
    //maple.sortable.notDraggable(totoNode);
    //maple.checkbox.disabled(totoNode);

  }
}

export default new Example();