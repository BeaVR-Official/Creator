/**
 * Created by urvoy_p on 04/05/16.
 */

class ScenesPanelUI {
  constructor() {

    var tree = [
      {
        text:       'Parent 1',
        href:       '#parent1',
        tags:       ['4'],
        selectable: false,
        nodes:      [
          {
            text:  'Child 1',
            href:  '#child1',
            tags:  ['2'],
            nodes: [
              {
                text: 'Grandchild 1',
                href: '#grandchild1',
                tags: ['0']
              },
              {
                text: 'Grandchild 2',
                href: '#grandchild2',
                tags: ['0']
              }
            ]
          },
          {
            text: 'Child 2',
            href: '#child2',
            tags: ['0']
          }
        ]
      },
      {
        text: 'Parent 2',
        href: '#parent2',
        tags: ['0']
      },
      {
        text: 'Parent 3',
        href: '#parent3',
        tags: ['0']
      },
      {
        text: 'Parent 4',
        href: '#parent4',
        tags: ['0']
      },
      {
        text: 'Parent 5',
        href: '#parent5',
        tags: ['0']
      }
    ];

    $('#scenesPanel').resizable({
      // minHeight: 200,
      minWidth: 200,
      maxWidth: 1000,
      handles:  "e" // coordonnées géographiques nswe
    });

    $('#sceneTree').treeview({
      data:         tree,
      showCheckbox: true,
      selectable:   false,
      collapseIcon: "glyphicon glyphicon-triangle-bottom",
      expandIcon:   "glyphicon glyphicon-triangle-right",
      onDrop:       function (event, data) {
        //console.log(event);
        //console.log(data);
      }
    });
  }
}

export default new ScenesPanelUI();