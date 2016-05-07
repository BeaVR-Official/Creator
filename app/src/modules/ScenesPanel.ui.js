/**
 * Created by urvoy_p on 04/05/16.
 */

class ScenesPanelUI {
  constructor() {
    var tree = [
      {
        text:  "Parent 1",
        nodes: [
          {
            text:  "Child 1",
            nodes: [
              {
                text: "Grandchild 1",
                state: {
                  checked: true
                }
              },
              {
                text: "Grandchild 2",
                state: {
                  checked: true
                }
              }
            ]
          },
          {
            text: "Child 2"
          }
        ]
      },
      {
        text: "Node 1",
        icon: "glyphicon glyphicon-stop",
        selectedIcon: "glyphicon glyphicon-stop",
        color: "#000000",
        backColor: "#FFFFFF",
        href: "#node-1",
        selectable: true,
        state: {
          checked: true,
          disabled: false,
          expanded: true,
          selected: true
        },
        tags: ['available']
      },
      {
        text: "Parent 3"
      },
      {
        text: "Parent 4"
      },
      {
        text: "Parent 5"
      }
    ];

    $('#scenesPanel').resizable({
      // minHeight: 200,
      minWidth: 200,
      maxWidth: 1000,
      handles:  "e" // coordonnées géographiques nswe
    });

    $('#tree').treeview({
      data: tree,
      onNodeSelected: function (event, data) {
        //alert('lol');
      }
    });
  }
}

export default new ScenesPanelUI();