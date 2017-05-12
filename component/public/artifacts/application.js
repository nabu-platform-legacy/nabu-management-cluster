application.configuration.modules.push(function($services) {
	var index = $services.manager.index();
	nabu.utils.ajax({
		method: "get",
		url: "${server.root()}api/cluster/history",
		success: function(response) {
			if (response.responseText) {
				var result = JSON.parse(response.responseText);
				if (result.history && result.history.lists) {
					for (var i = 0; i < result.history.lists.length; i++) {
						$services.manager.dashboard({
							alias: "clusterDashboard",
							parameters: {
								overview: result.history.lists[i]
							},
							id: result.history.lists[i].host,
							index: index
						})
					}
				}
			}
		}
	}),
	
	$services.router.register({
		alias: "clusterDashboard",
		enter: function(parameters) {
			return new application.views.ClusterDashboard({ data: parameters });
		}
	});
});