class Render {
  constructor(holder, tree) {
    this._holder = $(holder);
    this._tree   = tree._rootNode;
    this._templ  = tree._options.templates;
  }

  update() {
    this._holder.empty();
    this._holder.append(this._templ.list);
  }

  traverse(tree, ) {
  }
}