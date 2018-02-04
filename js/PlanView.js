var PlanView = function(roomList) {
  this.roomListModel = roomList;

  this.init();
};

PlanView.prototype = {
  init: function() {
    serverApi.getPlanSvg().done(
      function(svg) {
        $('#main').append(svg.documentElement);

        this.setupHandlers();
      }.bind(this)
    );
  },

  setupHandlers: function() {
    this.roomListModel.forEach(room => {
      //Init
      this.updateLight(room);
      this.updateCurtains(room);
      this.updateTemperature(room);

      /**
       * Event Dispatcher
       */
      room.lightEvent.attach(this.updateLight.bind(this, room));
      room.curtainsEvent.attach(this.updateCurtains.bind(this, room));
      room.temperatureEvent.attach(this.updateTemperature.bind(this, room));
    });

    return this;
  },

  /* -------------------- Handlers From Event Dispatcher ----------------- */

  updateLight: function(roomModel) {
    var $lightImage = $('g#' + roomModel.name + ' .light');
    roomModel.isLightOn ? $lightImage.show() : $lightImage.hide();
  },

  updateCurtains: function(roomModel) {
    var $curtainsPath = $('g#' + roomModel.name + ' .curtains');
    roomModel.isCurtainsOpened ? $curtainsPath.hide() : $curtainsPath.show();
  },

  updateTemperature: function(roomModel) {
    console.log(roomModel.temperature);

    var $temperatureText = $('g#' + roomModel.name + ' .temperature');
    $temperatureText.html(roomModel.temperature + '°');
  }
};