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
            element: "#navuser",
            title: "User Settings",
            content: "Expanding this menu includes options to scoll page to your clusters, set text message notifications, and log out. <br><br>If you want text notifications for when clusters are paused, press this button and put in your mobile number. It must be in the format +1 followed by your number without other symbols. Like +16091234567",
            backdrop: true,
            onShown(tour) {
                $('#navbarDropdownMenuLink').click();
            }
            },
            {
            element: "tbody tr:first",
            title: "Rows",
            content: "Rows and their cooresponding icons tell you what is going on. Hover over the Status icon if you are unsure. Colors: white means it will not be reaped (thumbs up icon), yellow means it is in warning state of being reaped soon (exclamation icon), red means it will be reaped tomorrow (exclamation in triangle icon), or grey meaning it is reaped or paused (pause icon), green means it is a protected cluster (lock icon), and light blue means it is paused and unpaused on weekends (calendar with dash icon). Additionally a status icon of three people means it is a tenant cluster and cannot be controlled.",
            backdrop: true,
            placement:"bottom"
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
            backdrop: true,
            autoscroll:true
            },
            {
            element: ".dropdown-toggle:last",
            title: "Admin Menu",
            content: "If you see this menu, it means you are an admin and have extra capabilities you can do on each cluster.",
            autoscroll:true,
            onShown(tour) {
                $('.dropdown-toggle:last').click();
            }
            }
        ],
        name:"clusters",
        storage:false,
        framework: "bootstrap4"
    });
  
    tour.init();
    tour.start(true);
}