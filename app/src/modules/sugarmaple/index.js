import SugarMaple from './SugarMaple';

$.widget( "custom.sugarmaple", {
  _create: function() {
    new SugarMaple(this, this.options);
  }
});

// => a titre d'exemple, ne pas garder la partie ci-dessous

const sm = $('#sceneTree').sugarmaple({
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

/**
 *  sm.sugarmaple('ClasseDuPlugin.Methode', parametres...);
 *  Plugins prêts: checkable pour les checkbox
 *  manage pour gerer les nodes
 *  sortable pour organiser les nodes
 */
const titi = sm.sugarmaple('manage.create', '1', 'tete');
const tita = sm.sugarmaple('manage.create', '2', 'tete');
const tito = sm.sugarmaple('manage.create', '3', 'tete');
sm.sugarmaple('manage.attach', titi, tita);
sm.sugarmaple('manage.attach', titi, tito);
sm.sugarmaple('manage.setRoot', titi);

sm.sugarmaple('checkable.disable', titi);

/**
 * Evenements, voir dans la classe Options de chque plugin
 */
sm.on('checkable.checked', function (e, node) {
  console.log('checked');
});

sm.on('checkable.unchecked', function (e, node) {
  console.log('unchecked');
});

sm.on('sortable.dragged', function (e, node) {
  console.log('dragged');
});

sm.on('sortable.dropped', function (e, newParent, node) {
  console.log('dropped');
});

console.log(titi);
