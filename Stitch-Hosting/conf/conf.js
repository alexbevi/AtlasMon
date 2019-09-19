GLOBALSTITCHAPP = "atlasmon-vlmdi";
GLOBALDBNAME = "atlasmonitor";

function logout() {
    client.auth.isLoggedIn = false;
    client.auth.logout().then(() => {
        // So logout of Google explicitly by going to https://accounts.google.com/logout
        // NOTE: this will log you out of all the Google accounts that you are signed into
        // window.location.replace("https://accounts.google.com/logout");
        window.location = "/index.html";
    });
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeRandomID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 function getHashbang() {
    var url = window.self.location.href;
    var kvp = url.split("#!");
    if(kvp.length > 1) {
        return kvp[1];
    } else {
        return false;
    }
 }

 Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [(mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd,
            this.getFullYear().toString().substr(-2)
            ].join('/');
};

function cleanHTML(instr) {
    // https://stackoverflow.com/questions/784586/convert-special-characters-to-html-in-javascript
    return instr.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}