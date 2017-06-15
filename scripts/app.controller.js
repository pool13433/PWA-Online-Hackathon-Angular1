app.controller('IndexController', function($scope, $window, FirebaseService) {
    var vm = this;
    vm.profileList = [];
    vm.form = {};


		// Trigger photo take
		//document.getElementById("snap").addEventListener("click", function() {
		//	context.drawImage(video, 0, 0, 120, 120);
		//	var dataURL = canvas.toDataURL('image/png');


    var refProfile = firebase.database().ref().child('/profile');

    refProfile.orderByKey().on("value", function(snapshot) {
        $scope.$safeApply(function() {
            vm.profileList = [];
            snapshot.forEach(function(data) {
                console.log('data ::==', data.key);
                var _data = snapshot.child(data.key).val();
                _data.id = data.key
                vm.profileList.push(_data);
            });
        });
    }, function(error) {
        console.log("Error: " + error.code);
    });


    vm.save = function() {
        if (vm.form.id == undefined || vm.form.id == '') {
			vm.form.image = document.getElementById('canvas').toDataURL('image/png');
            refProfile.push(vm.form);
        } else {
            var updates = {};
			vm.form.image = document.getElementById('canvas').toDataURL('image/png');
            updates['/' + vm.form.id] = {
                name: vm.form.name,
                age: vm.form.age,
                status: vm.form.status,
				image: vm.form.image
            };
            console.log('updates ::==', updates);
            refProfile.update(updates);
        }
        vm.form = {};
    }

    vm.edit = function(profile) {
        vm.form = profile;
    }

    vm.delete = function(id) {
        if ($window.confirm('are you sure?')) {
            refProfile.child(id).remove();
        }
        return false;
    }

	vm.capture = function() {
		document.getElementById('canvas').getContext('2d').drawImage(video, 0, 0, 120, 120);
	}

});