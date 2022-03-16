$(document).ready(function(){
		var $orders = $('#orders');
		var $mssv = $('#mssv');
		var $hoten = $('#hoten');
		var $truong = $('#truong');
		var $mssvd = $('#mssvd');
		$.ajax({
				type: 'GET',
				url: '/info',
				success: function(data){
					let dataItems = JSON.parse(data)
					$.each(dataItems, function(i, order) {
						$orders.append('<li> mssv: ' + order.mssv + ', hoten: ' + order.hoten + ', truong: ' + order.truong + '</li>');
					});
				},
				error: function() {
					alert('error loading data');
				}
		});
		$('#add').click(function(e) {
			e.preventDefault();
			$.ajax({
				type: 'POST',
				url: '/addinfo',
				dataType: 'JSON',
				data: {
					id: $(this).val(),
					mssv: $mssv.val(),
					hoten: $hoten.val(),
					truong: $truong.val()
				},
				success: function(newdata){
				},
				error: function() {
					alert('error saving data');
				}
			});
		});
		$('#del').click(function(e) {
			e.preventDefault();
			$.ajax({
				type: 'POST',
				url: '/deleteinfo',
				dataType: 'JSON',
				data: {
					id: $(this).val(),
					mssvd: $mssvd.val()
				},
				success: function(newdata){
				},
				error: function() {
					alert('error saving data');
				}
			});
		});
		$('#refresh').on('click', function(){
			$orders.load(" #orders");
			$.ajax({
				type: 'GET',
				url: '/info',
				success: function(data){
					let dataItems = JSON.parse(data)
					$.each(dataItems, function(i, order) {
						$orders.append('<li> mssv: ' + order.mssv + ', hoten: ' + order.hoten + ', truong: ' + order.truong + '</li>');
					});
				},
				error: function() {
					alert('error loading data');
				}
			});
		});
	})