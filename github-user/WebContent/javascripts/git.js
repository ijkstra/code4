$(function() {
	
	$.ajax({
		type: 'GET',
		url: 'https://api.github.com/users',
		success: function(items) {
			var $table = $('#table');
			var $contents = "";
			var $photos = [];
			$.each(items, function(i, item) {
				$contents += "<tr id=" + item.id + ">";
				$contents += "<td>" + item.login + "</td>";
				$contents += "<td id=" + "photos" + item.id + "> # </td>";
				$contents += "</tr>";
				
				$.ajax({
					type: 'GET',
					url: item.url,
					success: function(info) {
						var $p = ""
						$.ajax({
							type: 'GET',
							url: info.followers_url,
							success: function(followers) {
								$.each(followers, function(i, follower) {
									$p += "<img src='" + follower.avatar_url + "' width=30 height=30 />";
								})
								
							}
						})
						$photos.push($p);
					}
				})
				
			})
			
			$table.append($contents);
			
			$.each(items, function(i, item) {
				var $row = $('#'+item.id);
				
				$row.click(function() {
					$row.find('#photos'+item.id).text($photos[i]);
				})
			})
			
		}
	});
	
})