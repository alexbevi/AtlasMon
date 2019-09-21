function startTour() {
    var tour = new Tour({
        steps: [
            {
            element: "#navgraphs",
            title: "Graphs",
            content: "Pressing this will take you to the graphs page for reporting, powered by MongoDB Charts.",
            backdrop: true
            },
            {
            element: "#navrefresh",
            title: "Refresh",
            content: "This button will cause a manual pull of the Atlas API. This is automatically polled daily around 2am but this is a manual trigger to rerun it.",
            backdrop: true
            },
            {
            element: "td:first",
            title: "Rows",
            content: "Row colors can be: white meaning it will not be reaped, yellow meaning it is in warning state of being reaped soon, red meaning it will be reaped tomorrow, or grey meaning it is reaped or paused.",
            backdrop: true
            },
            {
            element: ".clstrbtn-trash:first",
            title: "Trash Can",
            content: "This button removes the record from the DB only.",
            backdrop: true
            },
            {
            element: ".clstrbtn-toggle:first",
            title: "Clock Button",
            content: "This button toggles the flag of whether it should be reaped.",
            backdrop: true
            },
            {
            element: ".clstrbtn-own:first",
            title: "Ownership Button",
            content: "This button takes ownership of the cluster, making you in charge of it.",
            backdrop: true
            },
            {
            element: ".clstrbtn-pause:first",
            title: "Pause Button",
            content: "This button will pause the cluster now.",
            backdrop: true
            }
        ],
        name:"clusters",
        storage:false,
        template:"<div class='popover tour'>\
        <div class='arrow'></div>\
        <h3 class='popover-header'></h3>\
        <div class='popover-body'></div>\
        <div class='popover-navigation'>\
          Use the left and right arrow keys to continue the help.\
        </div>\
      </div>"
    });
  
    tour.init();
    tour.start(true);
}