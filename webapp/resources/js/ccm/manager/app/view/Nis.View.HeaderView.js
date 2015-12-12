
(function () {
    'use strict';

     Nis.View.HeaderView = NisMVC.HeaderView.extend({
        initialize: function (param) {
            NisMVC.HeaderView.prototype.initialize.call(this, param);
            this.setCurrentUser();
        },
        setCurrentUser:function(){
            var id = localStorage.getItem("id");
            var header = $(this.el);
            var currentUserLabel = $(header).find('#currentUser');
            currentUserLabel.text(id);
        },
    }); // end of NisMVC.HeaderView

})();