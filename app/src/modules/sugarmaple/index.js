import SugarMaple from './SugarMaple';

$.widget( "custom.sugarmaple", {
  _create: function() {
    new SugarMaple(this, this.options);
  }
});
