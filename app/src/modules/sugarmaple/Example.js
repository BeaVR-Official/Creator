import SugarMaple from './SugarMaple';

class Example {
  constructor() {
    this.maple = new SugarMaple(
      '#sceneTree',
      {
        // events:  {
        //   onImport: (node) => {
        //     return node;
        //   },
        //   onExport: (node) => {
        //     return node;
        //   }
        // },
        plugins: {
          manage:   true,
          drag:     true,
          checkbox: true
        }
      });

    // const totoNode = maple.manage.createNode('Node de Toto', {lol: 'toto', age: 1});
    // const tataNode = maple.manage.createNode('Node de Tata', {lol: 'toto', age: 1});
    // maple.manage.attachNodeToRoot(totoNode);
    // maple.manage.attachNode(totoNode, tataNode);
    // maple.checkbox.disable(totoNode);
    // console.log(maple);
  }
}

export default new Example();