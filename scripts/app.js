var app = angular.module('pwaApp', []);
app.service('FirebaseService', FirebaseService);

function FirebaseService() {
    return {
        init: function() {
            // Initialize Firebase
            var config = {
                apiKey: "AIzaSyBzbDBZl1Ii0D79Y-Oghqh20GF4tMmwm80",
                authDomain: "dosohard.firebaseapp.com",
                databaseURL: "https://dosohard.firebaseio.com",
                projectId: "dosohard",
                storageBucket: "dosohard.appspot.com",
                messagingSenderId: "1015045318443"
            };
            firebase.initializeApp(config);
        }
    }
}

app.controller('IndexController', function(FirebaseService) {
    var vm = this;
    vm.profileList = [];

    this.name = 'xxxxxx';
    FirebaseService.init();
    var refProfile = firebase.database().ref('profile');

    refProfile.on("value", function(snapshot) {
        console.log('snapshot ::==', snapshot.val());
        vm.profileList = snapshot.val();
    }, function(error) {
        console.log("Error: " + error.code);
    });

    vm.create = function() {
        var data = {
            name: 'textdata',
            age: 44,
            status: 'member'
        }
        refProfile.push(data);
    }

    vm.update = function() {

    }

});