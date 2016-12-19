application.initialize.modules.push(function() {
	var row = application.services.vue.getDashboardRow();
	nabu.utils.ajax({
		method: "get",
		url: "${server.root()}api/cluster/history",
		success: function(response) {
			if (response.responseText) {
				var result = JSON.parse(response.responseText);
				if (result.history && result.history.lists) {
					for (var i = 0; i < result.history.lists.length; i++) {
						application.services.vue.dashboards.push({
							alias: "clusterDashboard",
							parameters: {
								overview: result.history.lists[i]
							},
							id: result.history.lists[i].host,
							row: row
						})
					}
				}
			}
		}
	})
});