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
          manage:   true,
          sortable: true,
          checkbox: true
        }
      });

    $('#sceneTree').on('sortable.drop', function (event, data) {
      console.log('ooooo');
    });

    const totoNode = maple.manage.createNode('Node de Toto', {lol: 'toto', age: 1});
    const tataNode = maple.manage.createNode('Node de Tata', {lol: 'toto', age: 1});
    const titiNode = maple.manage.createNode('Node de Titi', {lol: 'toto', age: 1});
    const teteNode = maple.manage.createNode('Node de Tete', {lol: 'toto', age: 1});
    const tutuNode = maple.manage.createNode('Node de Tutu', {lol: 'toto', age: 1});

    maple.manage.setRootNode(totoNode);
    maple.manage.attachNode(teteNode, tutuNode);
    maple.manage.attachNode(totoNode, teteNode);
    maple.manage.attachNode(totoNode, titiNode);
    maple.manage.attachNode(totoNode, tataNode);
    maple.sortable.notDroppable(teteNode);
    //maple.sortable.notDraggable(totoNode);
    //maple.checkbox.disabled(totoNode);

  }
}

export default new Example();