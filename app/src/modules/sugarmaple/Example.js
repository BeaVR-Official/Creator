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
          drag:     true,
          checkbox: true
        }
      });

    const totoNode = maple.manage.createNode('Node de Toto', {lol: 'toto', age: 1});
    const tataNode = maple.manage.createNode('Node de Tata', {lol: 'toto', age: 1});
    const titiNode = maple.manage.createNode('Node de Titi', {lol: 'toto', age: 1});
    const teteNode = maple.manage.createNode('Node de Tete', {lol: 'toto', age: 1});
    const tutuNode = maple.manage.createNode('Node de Tutu', {lol: 'toto', age: 1});
    maple.manage.setRootNode(totoNode);
    maple.manage.attachNode(totoNode, tataNode);
    maple.manage.attachNode(totoNode, tataNode);
    maple.manage.attachNode(totoNode, tataNode);
    maple.manage.attachNode(tataNode, titiNode);
    maple.manage.attachNode(totoNode, tataNode);
    maple.manage.attachNode(totoNode, tataNode);
    maple.manage.attachNode(totoNode, tataNode);
    maple.manage.attachNode(totoNode, tataNode);
    maple.manage.attachNode(totoNode, tataNode);
    maple.manage.attachNode(totoNode, tataNode);
    // maple.manage.detachNode(totoNode);
    maple.manage.setRootNode(totoNode);
    maple.manage.attachNode(teteNode, tutuNode);
    maple.manage.attachNode(totoNode, teteNode);
    maple.drag.notDroppable(tutuNode);
    maple.drag.notDraggable(titiNode);

    console.log(maple);
  }
}

export default new Example();