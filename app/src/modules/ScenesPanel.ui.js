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
                text: "Grandchild 1"
              },
              {
                text: "Grandchild 2"
              }
            ]
          },
          {
            text: "Child 2"
          }
        ]
      },
      {
        text: "Parent 2"
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
      data: tree
    });
  }
}

export default new ScenesPanelUI();